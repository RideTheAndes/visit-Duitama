"""Simplifica los GPX oficiales del GFBM 2026 a un GeoJSON liviano para el mapa.

Fuente: repo RideTheAndes/gfbm, public/files/rutas2026/*.gpx (los mismos que
publica www.gfboyacamundial.com). Uso:
    python3 scripts/rutas-geojson.py <carpeta con los GPX> sitio/gfbm/rutas.json
"""
import json, math, re, sys

def leer(path):
    s = open(path, encoding='utf-8').read()
    pts = []
    for m in re.finditer(r'<trkpt([^>]*)>(.*?)</trkpt>', s, re.S):
        a = m.group(1)
        lat = float(re.search(r'lat="([-\d.]+)"', a).group(1))
        lon = float(re.search(r'lon="([-\d.]+)"', a).group(1))
        e = re.search(r'<ele>([-\d.]+)</ele>', m.group(2))
        pts.append((lat, lon, float(e.group(1)) if e else None))
    return pts

def dist(p, q):
    la1, lo1, la2, lo2 = map(math.radians, (p[0], p[1], q[0], q[1]))
    h = math.sin((la2 - la1) / 2) ** 2 + math.cos(la1) * math.cos(la2) * math.sin((lo2 - lo1) / 2) ** 2
    return 2 * 6371000 * math.asin(math.sqrt(h))

def rdp(pts, eps):
    # Douglas-Peucker iterativo en grados (suficiente a esta escala).
    keep = [False] * len(pts); keep[0] = keep[-1] = True
    pila = [(0, len(pts) - 1)]
    while pila:
        i, j = pila.pop()
        (y1, x1), (y2, x2) = pts[i][:2], pts[j][:2]
        dmax, idx = 0, None
        for k in range(i + 1, j):
            y0, x0 = pts[k][:2]
            num = abs((y2 - y1) * x0 - (x2 - x1) * y0 + x2 * y1 - y2 * x1)
            den = math.hypot(y2 - y1, x2 - x1) or 1e-12
            d = num / den
            if d > dmax: dmax, idx = d, k
        if idx is not None and dmax > eps:
            keep[idx] = True
            pila += [(i, idx), (idx, j)]
    return [p for p, k in zip(pts, keep) if k]

carpeta, salida = sys.argv[1], sys.argv[2]
feats = []
for id_, archivo in (('gran-fondo', 'GranFondo2026.gpx'), ('medio-fondo', 'MedioFondo2026.gpx')):
    pts = leer(f'{carpeta}/{archivo}')
    km = sum(dist(pts[i], pts[i + 1]) for i in range(len(pts) - 1)) / 1000
    simp = rdp(pts, 0.00015)
    feats.append({
        'type': 'Feature',
        'properties': {'id': id_, 'km_gpx': round(km, 1), 'puntos_originales': len(pts),
                       'ele_salida_m': round(pts[0][2]) if pts[0][2] else None},
        'geometry': {'type': 'LineString',
                     'coordinates': [[round(p[1], 5), round(p[0], 5)] for p in simp]},
    })
    print(id_, len(pts), '->', len(simp), 'puntos;', round(km, 1), 'km; salida a', feats[-1]['properties']['ele_salida_m'], 'm')
json.dump({'type': 'FeatureCollection', 'features': feats}, open(salida, 'w'), separators=(',', ':'))
