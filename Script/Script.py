# Install required libraries
!pip install osmnx networkx

# Upload the map.osm file
from google.colab import files
uploaded = files.upload()
osm_file = list(uploaded.keys())[0]

# Parse OSM file and convert to JSON
import osmnx as ox
import networkx as nx
import json

# Load OSM data from file
G = ox.graph_from_xml('jaipur.osm')

# Convert the graph to a JSON-serializable format
nodes = [{'id': n, 'lat': data['y'], 'lon': data['x']} for n, data in G.nodes(data=True)]
edges = [{'source': u, 'target': v} for u, v in G.edges()]

# Save nodes and edges to JSON files
with open('nodes.json', 'w') as f:
    json.dump(nodes, f)

with open('edges.json', 'w') as f:
    json.dump(edges, f)

# Download JSON files
files.download('nodes.json')
files.download('edges.json')
