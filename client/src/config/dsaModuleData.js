export const dsaModules = [
  {
    key: 'graph',
    title: 'Graphs',
    description: 'Explore graph theory, traversal, shortest paths, and spanning tree algorithms.',
    icon: '🌐',
    level: 'Advanced',
    total: 10,
    duration: '7h',
    modulePath: '/GraphLesson',
    prefix: 'graph',
    lessons: [
      {
        lessonNumber: 1,
        lessonId: 'graph-lesson-1',
        title: 'Introduction to Graphs',
        description: 'Learn what graphs are, how they model relationships, and common graph terminology.',
        difficulty: 'Beginner',
        estimatedTime: '25 mins',
        theory: 'A graph is a collection of nodes (vertices) and edges connecting pairs of nodes. Graphs can be directed or undirected, weighted or unweighted, and represent networks like road maps, social graphs, or dependency chains.',
        codeExamples: [
          {
            language: 'JavaScript',
            code: `// Basic adjacency list representation
const graph = {
  A: ['B', 'C'],
  B: ['A', 'D'],
  C: ['A'],
  D: ['B'],
};

console.log(graph.A); // ['B', 'C']`,
          },
          {
            language: 'C++',
            code: `#include <bits/stdc++.h>
using namespace std;
int main() {
  vector<vector<int>> adj(4);
  adj[0] = {1, 2};
  adj[1] = {0, 3};
  adj[2] = {0};
  adj[3] = {1};
  return 0;
}`,
          },
          {
            language: 'Java',
            code: `import java.util.*;
class Graph {
  Map<String, List<String>> adj = new HashMap<>();
  void addEdge(String a, String b) {
    adj.computeIfAbsent(a, k -> new ArrayList<>()).add(b);
  }
}`,
          },
        ],
        keyConcepts: ['Vertices', 'Edges', 'Directed vs Undirected', 'Weighted graphs', 'Graph modeling'],
        complexity: 'Traversal is O(V + E) for adjacency list, O(V^2) for adjacency matrix.',
        practiceQuestions: ['Draw a graph for a social network with five people.', 'Explain when directed edges are required.', 'Design a graph structure for a map of roads.'],
        quiz: [
          {
            question: 'Which structure is most efficient for sparse graph traversal?',
            options: ['Adjacency matrix', 'Adjacency list', 'Edge list', 'Boolean matrix'],
            answer: 'Adjacency list',
          },
          {
            question: 'A graph with no directed edges is called?',
            options: ['Weighted graph', 'Directed graph', 'Undirected graph', 'Complete graph'],
            answer: 'Undirected graph',
          },
        ],
      },
      {
        lessonNumber: 2,
        lessonId: 'graph-lesson-2',
        title: 'Graph Representation',
        description: 'Compare adjacency lists, adjacency matrices, and edge lists for graph representation.',
        difficulty: 'Beginner',
        estimatedTime: '30 mins',
        theory: 'Graph representation determines how easy it is to query neighbors and add edges. Adjacency lists are memory-efficient for sparse graphs, while adjacency matrices are easier for dense graphs and quick edge checks.',
        codeExamples: [
          {
            language: 'JavaScript',
            code: `const adjList = new Map();
adjList.set('A', ['B', 'C']);
adjList.set('B', ['A']);`,
          },
          {
            language: 'C++',
            code: `vector<vector<int>> adj(5, vector<int>());
adj[0].push_back(1);
adj[1].push_back(0);`,
          },
          {
            language: 'Java',
            code: `int[][] matrix = new int[4][4];
matrix[0][1] = 1; // edge from 0 to 1`,
          },
        ],
        keyConcepts: ['Adjacency list', 'Adjacency matrix', 'Edge list', 'Memory usage', 'Neighbor iteration'],
        complexity: 'Adjacency list: O(V + E) space. Matrix: O(V^2) space. Edge lookups are O(1) in matrix and O(deg(v)) in list.',
        practiceQuestions: ['Convert a small undirected graph to an adjacency matrix.', 'Explain why adjacency lists are better for sparse graphs.', 'Describe how to add a new edge to an edge list.'],
        quiz: [
          {
            question: 'Which representation gives constant-time edge existence checks?',
            options: ['Adjacency list', 'Adjacency matrix', 'Edge list', 'Incidence list'],
            answer: 'Adjacency matrix',
          },
          {
            question: 'Which representation is best for sparse graphs?',
            options: ['Adjacency matrix', 'Adjacency list', 'Complete graph', 'Edge matrix'],
            answer: 'Adjacency list',
          },
        ],
      },
      {
        lessonNumber: 3,
        lessonId: 'graph-lesson-3',
        title: 'BFS Traversal',
        description: 'Learn breadth-first search to explore graph levels and shortest unweighted paths.',
        difficulty: 'Intermediate',
        estimatedTime: '35 mins',
        theory: 'Breadth-first search explores all nodes at the current depth before moving deeper. It is ideal for shortest path in unweighted graphs and is implemented using a queue.',
        codeExamples: [
          {
            language: 'JavaScript',
            code: `function bfs(start, graph) {
  const visited = new Set([start]);
  const queue = [start];
  while (queue.length) {
    const node = queue.shift();
    console.log(node);
    for (const neighbor of graph[node] || []) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);
      }
    }
  }
}`,
          },
          {
            language: 'C++',
            code: `void bfs(int start, vector<vector<int>>& adj) {
  vector<bool> visited(adj.size());
  queue<int> q;
  visited[start] = true;
  q.push(start);
  while (!q.empty()) {
    int u = q.front(); q.pop();
    for (int v : adj[u]) {
      if (!visited[v]) {
        visited[v] = true;
        q.push(v);
      }
    }
  }
}`,
          },
          {
            language: 'Java',
            code: `void bfs(int start, List<List<Integer>> adj) {
  boolean[] visited = new boolean[adj.size()];
  Queue<Integer> queue = new LinkedList<>();
  visited[start] = true;
  queue.add(start);
  while (!queue.isEmpty()) {
    int u = queue.poll();
    for (int v : adj.get(u)) {
      if (!visited[v]) {
        visited[v] = true;
        queue.add(v);
      }
    }
  }
}`,
          },
        ],
        keyConcepts: ['Queue data structure', 'Level order traversal', 'Visited set', 'Shortest unweighted path'],
        complexity: 'O(V + E) time and O(V) additional space for the queue and visited data.',
        practiceQuestions: ['Use BFS to find the shortest path in an unweighted maze.', 'Explain the visited array role in BFS.', 'Compare BFS and DFS traversal order.'],
        quiz: [
          {
            question: 'Which data structure does BFS rely on?',
            options: ['Stack', 'Queue', 'Heap', 'Priority queue'],
            answer: 'Queue',
          },
          {
            question: 'In which graph does BFS find the shortest path?',
            options: ['Weighted graphs', 'Unweighted graphs', 'Directed acyclic graphs only', 'Complete graphs only'],
            answer: 'Unweighted graphs',
          },
        ],
      },
      {
        lessonNumber: 4,
        lessonId: 'graph-lesson-4',
        title: 'DFS Traversal',
        description: 'Explore depth-first search to visit deep branches of graphs with recursion and stacks.',
        difficulty: 'Intermediate',
        estimatedTime: '30 mins',
        theory: 'Depth-first search dives deep into a graph by exploring one branch fully before backtracking. It is useful for path finding, cycle detection and topological sorting.',
        codeExamples: [
          {
            language: 'JavaScript',
            code: `function dfs(node, graph, visited = new Set()) {
  visited.add(node);
  console.log(node);
  for (const neighbor of graph[node] || []) {
    if (!visited.has(neighbor)) {
      dfs(neighbor, graph, visited);
    }
  }
}`,
          },
          {
            language: 'C++',
            code: `void dfs(int u, vector<vector<int>>& adj, vector<bool>& visited) {
  visited[u] = true;
  for (int v : adj[u]) {
    if (!visited[v]) dfs(v, adj, visited);
  }
}`,
          },
          {
            language: 'Java',
            code: `void dfs(int u, List<List<Integer>> adj, boolean[] visited) {
  visited[u] = true;
  for (int v : adj.get(u)) {
    if (!visited[v]) dfs(v, adj, visited);
  }
}`,
          },
        ],
        keyConcepts: ['Recursion', 'Backtracking', 'Stack frame', 'Discovery and finish time'],
        complexity: 'O(V + E) time and O(V) space if recursion stack is counted.',
        practiceQuestions: ['Use DFS to detect a cycle in a directed graph.', 'Why does DFS use a stack?','Explain the difference between pre-order and post-order in DFS.'],
        quiz: [
          {
            question: 'Which traversal is DFS most like?',
            options: ['Preorder tree traversal', 'Level order traversal', 'Breadth-first search', 'Dijkstra algorithm'],
            answer: 'Preorder tree traversal',
          },
          {
            question: 'Which structure models the call stack in DFS?',
            options: ['Queue', 'Stack', 'Heap', 'Array'],
            answer: 'Stack',
          },
        ],
      },
      {
        lessonNumber: 5,
        lessonId: 'graph-lesson-5',
        title: 'Topological Sorting',
        description: 'Learn how to order tasks in a directed acyclic graph using topological sort.',
        difficulty: 'Intermediate',
        estimatedTime: '30 mins',
        theory: 'Topological sort orders vertices so that for every directed edge u -> v, u comes before v. It applies only to DAGs and is useful for scheduling tasks with dependencies.',
        codeExamples: [
          {
            language: 'JavaScript',
            code: `function topologicalSort(nodes, adj) {
  const inDegree = new Map(nodes.map((node) => [node, 0]));
  for (const u of nodes) {
    for (const v of adj[u] || []) inDegree.set(v, inDegree.get(v) + 1);
  }
  const queue = nodes.filter((node) => inDegree.get(node) === 0);
  const order = [];
  while (queue.length) {
    const u = queue.shift();
    order.push(u);
    for (const v of adj[u] || []) {
      inDegree.set(v, inDegree.get(v) - 1);
      if (inDegree.get(v) === 0) queue.push(v);
    }
  }
  return order;
}`,
          },
          {
            language: 'C++',
            code: `vector<int> topoSort(int n, vector<vector<int>>& adj) {
  vector<int> indeg(n), order;
  queue<int> q;
  for (int u = 0; u < n; u++) {
    for (int v : adj[u]) indeg[v]++;
  }
  for (int i = 0; i < n; i++) if (!indeg[i]) q.push(i);
  while (!q.empty()) {
    int u = q.front(); q.pop();
    order.push_back(u);
    for (int v : adj[u]) if (--indeg[v] == 0) q.push(v);
  }
  return order;
}`,
          },
          {
            language: 'Java',
            code: `List<Integer> topoSort(int n, List<List<Integer>> adj) {
  int[] indeg = new int[n];
  for (int u = 0; u < n; u++) for (int v : adj.get(u)) indeg[v]++;
  Queue<Integer> q = new LinkedList<>();
  for (int i = 0; i < n; i++) if (indeg[i] == 0) q.add(i);
  List<Integer> order = new ArrayList<>();
  while (!q.isEmpty()) {
    int u = q.poll();
    order.add(u);
    for (int v : adj.get(u)) if (--indeg[v] == 0) q.add(v);
  }
  return order;
}`,
          },
        ],
        keyConcepts: ['Directed acyclic graph', 'In-degree', 'Kahn’s algorithm', 'Dependency resolution'],
        complexity: 'O(V + E) time and O(V) extra space for in-degree counts and queue.',
        practiceQuestions: ['Schedule course prerequisites using topological sort.', 'How does topological order detect cycles?', 'Give an example of a DAG from task scheduling.'],
        quiz: [
          {
            question: 'Topological sort applies to which graph type?',
            options: ['Cyclic graph', 'Tree', 'DAG', 'Complete graph'],
            answer: 'DAG',
          },
          {
            question: 'In Kahn’s algorithm, nodes are added to the queue when?',
            options: ['Out-degree becomes 0', 'In-degree becomes 0', 'Visited', 'When discovered'],
            answer: 'In-degree becomes 0',
          },
        ],
      },
      {
        lessonNumber: 6,
        lessonId: 'graph-lesson-6',
        title: 'Shortest Path Algorithms',
        description: 'Understand shortest path concepts and compare BFS, Dijkstra, and Bellman-Ford.',
        difficulty: 'Advanced',
        estimatedTime: '35 mins',
        theory: 'Shortest path algorithms compute minimum distance between nodes. BFS works for unweighted graphs, Dijkstra for non-negative weights, and Bellman-Ford for graphs with negative edges.',
        codeExamples: [
          {
            language: 'JavaScript',
            code: `function dijkstra(start, adj) {
  const dist = new Map();
  const pq = new MinPriorityQueue({ priority: (item) => item.dist });
  dist.set(start, 0);
  pq.enqueue({ node: start, dist: 0 });
  while (!pq.isEmpty()) {
    const { node, dist: d } = pq.dequeue().element;
    if (d > dist.get(node)) continue;
    for (const { target, weight } of adj[node] || []) {
      const alt = d + weight;
      if (alt < (dist.get(target) ?? Infinity)) {
        dist.set(target, alt);
        pq.enqueue({ node: target, dist: alt });
      }
    }
  }
  return dist;
}`,
          },
          {
            language: 'C++',
            code: `vector<int> dijkstra(int n, vector<vector<pair<int,int>>>& adj, int start) {
  const int INF = 1e9;
  vector<int> dist(n, INF);
  dist[start] = 0;
  priority_queue<pair<int,int>, vector<pair<int,int>>, greater<>> pq;
  pq.push({0, start});
  while (!pq.empty()) {
    auto [d, u] = pq.top(); pq.pop();
    if (d > dist[u]) continue;
    for (auto [v, w] : adj[u]) {
      if (dist[v] > dist[u] + w) {
        dist[v] = dist[u] + w;
        pq.push({dist[v], v});
      }
    }
  }
  return dist;
}`,
          },
          {
            language: 'Java',
            code: `int[] dijkstra(int n, List<List<int[]>> adj, int start) {
  int[] dist = new int[n];
  Arrays.fill(dist, Integer.MAX_VALUE);
  dist[start] = 0;
  PriorityQueue<int[]> pq = new PriorityQueue<>(Comparator.comparingInt(a -> a[0]));
  pq.add(new int[]{0, start});
  while (!pq.isEmpty()) {
    int[] curr = pq.poll();
    int d = curr[0], u = curr[1];
    if (d > dist[u]) continue;
    for (int[] edge : adj.get(u)) {
      int v = edge[0], w = edge[1];
      int alt = d + w;
      if (alt < dist[v]) {
        dist[v] = alt;
        pq.add(new int[]{alt, v});
      }
    }
  }
  return dist;
}`,
          },
        ],
        keyConcepts: ['Dijkstra', 'Bellman-Ford', 'Weighted graphs', 'Priority queue'],
        complexity: 'Dijkstra with heap: O((V + E) log V). Bellman-Ford: O(V * E).',
        practiceQuestions: ['Describe when to use Dijkstra vs Bellman-Ford.', 'What happens with negative weights in Dijkstra?', 'Compute shortest paths on a small weighted graph.'],
        quiz: [
          {
            question: 'Dijkstra requires which edge weight property?',
            options: ['Negative weights allowed', 'Non-negative weights', 'Only zero weights', 'Only integer weights'],
            answer: 'Non-negative weights',
          },
          {
            question: 'Which algorithm handles negative edge weights safely?',
            options: ['Dijkstra', 'Bellman-Ford', 'BFS', 'Floyd-Warshall'],
            answer: 'Bellman-Ford',
          },
        ],
      },
      {
        lessonNumber: 7,
        lessonId: 'graph-lesson-7',
        title: 'Dijkstra Algorithm',
        description: 'Study Dijkstra’s algorithm in detail and learn how to implement it efficiently.',
        difficulty: 'Advanced',
        estimatedTime: '40 mins',
        theory: 'Dijkstra finds shortest paths from a source node to all other nodes using a priority queue. It relaxes neighbors and always processes the next closest vertex.',
        codeExamples: [
          {
            language: 'JavaScript',
            code: `// Use a min-heap library or a custom priority queue for best performance
function dijkstra(start, adj) {
  const dist = new Map();
  const pq = new PriorityQueue((a, b) => a.dist - b.dist);
  dist.set(start, 0);
  pq.push({ node: start, dist: 0 });
  while (!pq.isEmpty()) {
    const { node, dist: current } = pq.pop();
    if (current > dist.get(node)) continue;
    for (const edge of adj[node]) {
      const alt = current + edge.weight;
      if (alt < (dist.get(edge.to) ?? Infinity)) {
        dist.set(edge.to, alt);
        pq.push({ node: edge.to, dist: alt });
      }
    }
  }
  return dist;
}`,
          },
          {
            language: 'C++',
            code: `// Using priority_queue and pair<distance, node>
vector<int> dijkstra(int n, vector<vector<pair<int,int>>>& adj, int source) {
  const int INF = 1e9;
  vector<int> dist(n, INF);
  dist[source] = 0;
  priority_queue<pair<int,int>, vector<pair<int,int>>, greater<>> pq;
  pq.push({0, source});
  while (!pq.empty()) {
    auto [d, u] = pq.top(); pq.pop();
    if (d > dist[u]) continue;
    for (auto [v, w] : adj[u]) {
      if (dist[v] > d + w) {
        dist[v] = d + w;
        pq.push({dist[v], v});
      }
    }
  }
  return dist;
}`,
          },
          {
            language: 'Java',
            code: `PriorityQueue<int[]> pq = new PriorityQueue<>(Comparator.comparingInt(a -> a[0]));
int[] dist = new int[n];
Arrays.fill(dist, Integer.MAX_VALUE);
dist[source] = 0;
pq.add(new int[]{0, source});
while (!pq.isEmpty()) {
  int[] cur = pq.poll();
  int d = cur[0], u = cur[1];
  if (d > dist[u]) continue;
  for (int[] edge : adj.get(u)) {
    int v = edge[0], w = edge[1];
    if (dist[v] > d + w) {
      dist[v] = d + w;
      dist[v] = d + w;
      pq.add(new int[]{dist[v], v});
    }
  }
}`,
          },
        ],
        keyConcepts: ['Priority queue', 'Relaxation', 'Greedy algorithm', 'Distance array'],
        complexity: 'O((V + E) log V) when using a binary heap.',
        practiceQuestions: ['Implement Dijkstra on a weighted directed graph.', 'Explain why Dijkstra cannot handle negative edges.', 'What is the role of the visited check?'],
        quiz: [
          {
            question: 'What does Dijkstra use to choose the next node?',
            options: ['Largest node id', 'Smallest tentative distance', 'Random neighbor', 'Highest degree'],
            answer: 'Smallest tentative distance',
          },
          {
            question: 'What happens if you use Dijkstra on a negative-weight graph?',
            options: ['It always works', 'It may produce wrong paths', 'It becomes O(V^3)', 'It detects cycles'],
            answer: 'It may produce wrong paths',
          },
        ],
      },
      {
        lessonNumber: 8,
        lessonId: 'graph-lesson-8',
        title: 'Union Find (DSU)',
        description: 'Learn Disjoint Set Union for connectivity, cycle detection, and Kruskal’s algorithm.',
        difficulty: 'Advanced',
        estimatedTime: '30 mins',
        theory: 'Union Find maintains connected components through union and find operations. Path compression and union by rank make the operations nearly constant time.',
        codeExamples: [
          {
            language: 'JavaScript',
            code: `class DSU {
  constructor(n) {
    this.parent = Array.from({ length: n }, (_, i) => i);
    this.rank = Array(n).fill(0);
  }
  find(x) {
    if (this.parent[x] !== x) this.parent[x] = this.find(this.parent[x]);
    return this.parent[x];
  }
  union(a, b) {
    a = this.find(a); b = this.find(b);
    if (a === b) return false;
    if (this.rank[a] < this.rank[b]) [a, b] = [b, a];
    this.parent[b] = a;
    if (this.rank[a] === this.rank[b]) this.rank[a]++;
    return true;
  }
}`,
          },
          {
            language: 'C++',
            code: `struct DSU {
  vector<int> parent, rank;
  DSU(int n): parent(n), rank(n, 0) { iota(parent.begin(), parent.end(), 0); }
  int find(int x) {
    return parent[x] == x ? x : parent[x] = find(parent[x]);
  }
  bool unite(int a, int b) {
    a = find(a); b = find(b);
    if (a == b) return false;
    if (rank[a] < rank[b]) swap(a,b);
    parent[b] = a;
    if (rank[a] == rank[b]) rank[a]++;
    return true;
  }
};`,
          },
          {
            language: 'Java',
            code: `class DSU {
  int[] parent, rank;
  DSU(int n) {
    parent = new int[n]; rank = new int[n];
    for (int i = 0; i < n; i++) parent[i] = i;
  }
  int find(int x) {
    if (parent[x] != x) parent[x] = find(parent[x]);
    return parent[x];
  }
  boolean union(int a, int b) {
    a = find(a); b = find(b);
    if (a == b) return false;
    if (rank[a] < rank[b]) { parent[a] = b; }
    else if (rank[a] > rank[b]) { parent[b] = a; }
    else { parent[b] = a; rank[a]++; }
    return true;
  }
}`,
          },
        ],
        keyConcepts: ['Find', 'Union', 'Path compression', 'Union by rank', 'Components'],
        complexity: 'Nearly O(1) amortized per operation when using union by rank and path compression.',
        practiceQuestions: ['Use DSU to detect a cycle in an undirected graph.', 'Explain how path compression speeds up DSU.', 'Describe DSU usage in Kruskal’s MST algorithm.'],
        quiz: [
          {
            question: 'What is the purpose of path compression?',
            options: ['Merge components', 'Shorten find path', 'Balance the tree', 'Sort the nodes'],
            answer: 'Shorten find path',
          },
          {
            question: 'Union by rank helps with?',
            options: ['Faster finds', 'Reduce tree height', 'Edge weight sorting', 'Cycle creation'],
            answer: 'Reduce tree height',
          },
        ],
      },
      {
        lessonNumber: 9,
        lessonId: 'graph-lesson-9',
        title: 'Minimum Spanning Tree',
        description: 'Study MST algorithms to build the minimum cost spanning tree of a graph.',
        difficulty: 'Advanced',
        estimatedTime: '35 mins',
        theory: 'A minimum spanning tree connects all vertices with the smallest possible total edge weight. Kruskal and Prim are two common MST algorithms.',
        codeExamples: [
          {
            language: 'JavaScript',
            code: `function kruskal(edges, n) {
  edges.sort((a, b) => a.weight - b.weight);
  const dsu = new DSU(n);
  const mst = [];
  for (const edge of edges) {
    if (dsu.union(edge.u, edge.v)) mst.push(edge);
  }
  return mst;
}`,
          },
          {
            language: 'C++',
            code: `struct Edge { int u, v, w; };
vector<Edge> kruskal(vector<Edge>& edges, int n) {
  sort(edges.begin(), edges.end(), [](auto &a, auto &b){ return a.w < b.w; });
  DSU dsu(n);
  vector<Edge> mst;
  for (auto &edge : edges) if (dsu.unite(edge.u, edge.v)) mst.push_back(edge);
  return mst;
}`,
          },
          {
            language: 'Java',
            code: `class Edge { int u, v, w; }
List<Edge> kruskal(List<Edge> edges, int n) {
  edges.sort(Comparator.comparingInt(e -> e.w));
  DSU dsu = new DSU(n);
  List<Edge> mst = new ArrayList<>();
  for (Edge edge : edges) if (dsu.union(edge.u, edge.v)) mst.add(edge);
  return mst;
}`,
          },
        ],
        keyConcepts: ['Spanning tree', 'Kruskal', 'Prim', 'Edge sorting', 'Cycle detection'],
        complexity: 'Kruskal: O(E log E). Prim: O((V + E) log V) with a heap.',
        practiceQuestions: ['Compare Kruskal and Prim algorithms.', 'Why does MST require a connected graph?', 'Build an MST for a simple weighted graph.'],
        quiz: [
          {
            question: 'Which algorithm sorts edges by weight?',
            options: ['Prim', 'Kruskal', 'Dijkstra', 'BFS'],
            answer: 'Kruskal',
          },
          {
            question: 'MST is defined for graphs that are?',
            options: ['Directed only', 'Undirected and connected', 'Weighted and cyclic', 'Unweighted only'],
            answer: 'Undirected and connected',
          },
        ],
      },
      {
        lessonNumber: 10,
        lessonId: 'graph-lesson-10',
        title: 'Graph Problem Solving',
        description: 'Apply graph techniques to real interview problems and real-world use cases.',
        difficulty: 'Advanced',
        estimatedTime: '45 mins',
        theory: 'Graph problems often combine traversal, shortest paths, connectivity, and cycles. Practice by mapping real-world scenarios to graph models and applying the correct algorithm.',
        codeExamples: [
          {
            language: 'JavaScript',
            code: `// Example: build graph from city routes
const routes = [['A','B'], ['B','C'], ['A','C']];
const adj = {};
for (const [u,v] of routes) {
  adj[u] = adj[u] || [];
  adj[v] = adj[v] || [];
  adj[u].push(v);
  adj[v].push(u);
}`,
          },
          {
            language: 'C++',
            code: `vector<vector<int>> buildGraph(int n, vector<pair<int,int>>& edges) {
  vector<vector<int>> adj(n);
  for (auto& [u,v] : edges) {
    adj[u].push_back(v);
    adj[v].push_back(u);
  }
  return adj;
}`,
          },
          {
            language: 'Java',
            code: `Map<String, List<String>> graph = new HashMap<>();
for (String[] edge : routes) {
  graph.computeIfAbsent(edge[0], k -> new ArrayList<>()).add(edge[1]);
  graph.computeIfAbsent(edge[1], k -> new ArrayList<>()).add(edge[0]);
}`,
          },
        ],
        keyConcepts: ['Graph modeling', 'Problem decomposition', 'Traversal patterns', 'Optimization'],
        complexity: 'Depends on chosen algorithm; most graph problems are O(V + E) or O(E log V).',
        practiceQuestions: ['Convert a maze into a graph and find the shortest path.', 'Solve a friend recommendation system using graph traversal.', 'Design a dependency graph for project builds.'],
        quiz: [
          {
            question: 'Which graph approach is best for a shortest unweighted path?',
            options: ['DFS', 'BFS', 'Dijkstra', 'Kruskal'],
            answer: 'BFS',
          },
          {
            question: 'What does an edge represent in a graph model?',
            options: ['A data value', 'A relationship', 'A variable', 'A function call'],
            answer: 'A relationship',
          },
        ],
      },
    ],
  },
  {
    key: 'tree',
    title: 'Trees',
    description: 'Learn tree structures, traversals, balanced trees, and advanced tree-based algorithms.',
    icon: '🌲',
    level: 'Advanced',
    total: 10,
    duration: '6h 30m',
    modulePath: '/TreeLesson',
    prefix: 'tree',
    lessons: [
      {
        lessonNumber: 1,
        lessonId: 'tree-lesson-1',
        title: 'Introduction to Trees',
        description: 'Learn tree terminology, properties, and differences from general graphs.',
        difficulty: 'Beginner',
        estimatedTime: '25 mins',
        theory: 'A tree is a connected acyclic graph. It has a root, children, parents, leaves, and a hierarchical structure used in many computing problems.',
        codeExamples: [
          {
            language: 'JavaScript',
            code: `class TreeNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}`,
          },
          {
            language: 'C++',
            code: `struct TreeNode {
  int val;
  TreeNode* left;
  TreeNode* right;
  TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
};`,
          },
          {
            language: 'Java',
            code: `class TreeNode {
  int val;
  TreeNode left, right;
  TreeNode(int x) { val = x; }
}`,
          },
        ],
        keyConcepts: ['Root', 'Leaf', 'Child', 'Parent', 'Subtree'],
        complexity: 'Basic tree operations are O(height) in balanced trees and can be O(n) in skewed trees.',
        practiceQuestions: ['List real-world systems that use trees.', 'Explain why a tree has exactly n-1 edges.', 'Draw a binary tree with 7 nodes.'],
        quiz: [
          {
            question: 'A tree with n nodes always has how many edges?',
            options: ['n', 'n-1', 'n+1', '2n'],
            answer: 'n-1',
          },
          {
            question: 'Which node has no parent?',
            options: ['Leaf', 'Root', 'Child', 'Sibling'],
            answer: 'Root',
          },
        ],
      },
      {
        lessonNumber: 2,
        lessonId: 'tree-lesson-2',
        title: 'Binary Trees',
        description: 'Understand binary tree structure, properties, and how to represent it in code.',
        difficulty: 'Beginner',
        estimatedTime: '30 mins',
        theory: 'Binary trees are trees where each node has at most two children. They are used for efficient search, expression parsing, and hierarchical data representation.',
        codeExamples: [
          {
            language: 'JavaScript',
            code: `function buildSampleTree() {
  const root = new TreeNode(1);
  root.left = new TreeNode(2);
  root.right = new TreeNode(3);
  return root;
}`,
          },
          {
            language: 'C++',
            code: `TreeNode* root = new TreeNode(1);
root->left = new TreeNode(2);
root->right = new TreeNode(3);`,
          },
          {
            language: 'Java',
            code: `TreeNode root = new TreeNode(1);
root.left = new TreeNode(2);
root.right = new TreeNode(3);`,
          },
        ],
        keyConcepts: ['Binary node', 'Left subtree', 'Right subtree', 'Complete tree', 'Full tree'],
        complexity: 'Traversal and insert operations are O(n) for generic binary tree traversal.',
        practiceQuestions: ['Draw a complete binary tree with 4 levels.', 'Explain the difference between full and perfect binary trees.', 'Show how to store a binary tree in an array.'],
        quiz: [
          {
            question: 'A full binary tree has each node with?',
            options: ['0 or 1 children', 'Exactly 2 children or none', 'One child only', 'Three children'],
            answer: 'Exactly 2 children or none',
          },
          {
            question: 'Binary tree traversal where root is processed before children is?',
            options: ['Inorder', 'Preorder', 'Postorder', 'Level order'],
            answer: 'Preorder',
          },
        ],
      },
      {
        lessonNumber: 3,
        lessonId: 'tree-lesson-3',
        title: 'Tree Traversals',
        description: 'Learn preorder, inorder, postorder, and level-order traversals for trees.',
        difficulty: 'Intermediate',
        estimatedTime: '35 mins',
        theory: 'Traversals visit every node in a tree in a specific order. Inorder is useful for BSTs, preorder and postorder are useful for serialization and expression trees, and level-order uses a queue.',
        codeExamples: [
          {
            language: 'JavaScript',
            code: `function inorder(node) {
  if (!node) return;
  inorder(node.left);
  console.log(node.value);
  inorder(node.right);
}`,
          },
          {
            language: 'C++',
            code: `void inorder(TreeNode* root) {
  if (!root) return;
  inorder(root->left);
  cout << root->val << ' ';
  inorder(root->right);
}`,
          },
          {
            language: 'Java',
            code: `void inorder(TreeNode root) {
  if (root == null) return;
  inorder(root.left);
  System.out.println(root.val);
  inorder(root.right);
}`,
          },
        ],
        keyConcepts: ['Preorder', 'Inorder', 'Postorder', 'Level-order', 'Traversal order'],
        complexity: 'O(n) time for all traversal methods, where n is the number of nodes.',
        practiceQuestions: ['List traversal output for a sample binary tree.', 'Why does inorder traversal produce sorted output in BSTs?', 'Implement level-order traversal using a queue.'],
        quiz: [
          {
            question: 'Which traversal lists BST nodes in sorted order?',
            options: ['Preorder', 'Inorder', 'Postorder', 'Level-order'],
            answer: 'Inorder',
          },
          {
            question: 'Which traversal uses a queue?',
            options: ['DFS', 'Preorder', 'Level-order', 'Postorder'],
            answer: 'Level-order',
          },
        ],
      },
      {
        lessonNumber: 4,
        lessonId: 'tree-lesson-4',
        title: 'Binary Search Trees',
        description: 'Study BSTs and learn how ordered tree structure enables fast search and insert operations.',
        difficulty: 'Intermediate',
        estimatedTime: '35 mins',
        theory: 'Binary search trees store keys so that left subtree contains smaller values and right subtree contains larger values. Search, insert, and delete take O(height) time.',
        codeExamples: [
          {
            language: 'JavaScript',
            code: `function insert(root, value) {
  if (!root) return new TreeNode(value);
  if (value < root.value) root.left = insert(root.left, value);
  else root.right = insert(root.right, value);
  return root;
}`,
          },
          {
            language: 'C++',
            code: `TreeNode* insert(TreeNode* root, int val) {
  if (!root) return new TreeNode(val);
  if (val < root->val) root->left = insert(root->left, val);
  else root->right = insert(root->right, val);
  return root;
}`,
          },
          {
            language: 'Java',
            code: `TreeNode insert(TreeNode root, int val) {
  if (root == null) return new TreeNode(val);
  if (val < root.val) root.left = insert(root.left, val);
  else root.right = insert(root.right, val);
  return root;
}`,
          },
        ],
        keyConcepts: ['BST property', 'Search', 'Insert', 'Delete', 'Traversal'],
        complexity: 'Average O(log n) for balanced BSTs, worst-case O(n) for skewed trees.',
        practiceQuestions: ['Remove a value from a BST and show the result.', 'Explain why inorder traversal of BST is sorted.', 'What is the worst-case height of a BST?'],
        quiz: [
          {
            question: 'In a BST, values in the right subtree are?',
            options: ['Smaller than root', 'Equal to root', 'Greater than root', 'Unordered'],
            answer: 'Greater than root',
          },
          {
            question: 'BST search complexity is best described as?',
            options: ['O(n)', 'O(n log n)', 'O(log n)', 'O(1)'],
            answer: 'O(log n)',
          },
        ],
      },
      {
        lessonNumber: 5,
        lessonId: 'tree-lesson-5',
        title: 'Balanced Trees',
        description: 'Understand how balanced trees maintain depth guarantees and support fast operations.',
        difficulty: 'Advanced',
        estimatedTime: '35 mins',
        theory: 'Balanced trees such as AVL and Red-Black trees ensure height is logarithmic by rebalancing after insertions and deletions. This preserves efficient search and update operations.',
        codeExamples: [
          {
            language: 'JavaScript',
            code: `// Conceptual rotations in an AVL tree
function rotateRight(y) {
  const x = y.left;
  y.left = x.right;
  x.right = y;
  return x;
}`,
          },
          {
            language: 'C++',
            code: `TreeNode* rotateLeft(TreeNode* x) {
  TreeNode* y = x->right;
  x->right = y->left;
  y->left = x;
  return y;
}`,
          },
          {
            language: 'Java',
            code: `TreeNode rotateRight(TreeNode y) {
  TreeNode x = y.left;
  y.left = x.right;
  x.right = y;
  return x;
}`,
          },
        ],
        keyConcepts: ['AVL trees', 'Red-Black Trees', 'Rotations', 'Height balance', 'Logarithmic depth'],
        complexity: 'Balanced tree operations remain O(log n) for search, insert, and delete.',
        practiceQuestions: ['Explain tree rotations in AVL trees.', 'Why are balanced trees important?', 'Compare AVL and Red-Black tree balancing rules.'],
        quiz: [
          {
            question: 'Balanced trees keep height close to?',
            options: ['O(n)', 'O(log n)', 'O(1)', 'O(n^2)'],
            answer: 'O(log n)',
          },
          {
            question: 'Which operation enforces tree balance?',
            options: ['Traversal', 'Rotation', 'Insertion', 'Deletion'],
            answer: 'Rotation',
          },
        ],
      },
      {
        lessonNumber: 6,
        lessonId: 'tree-lesson-6',
        title: 'Heap Data Structure',
        description: 'Learn heap properties, heap operations, and how heaps power priority queues.',
        difficulty: 'Intermediate',
        estimatedTime: '30 mins',
        theory: 'A heap is a tree-based structure where parent nodes satisfy a priority ordering with children. Heaps are commonly implemented with arrays and used for priority queues and heap sort.',
        codeExamples: [
          {
            language: 'JavaScript',
            code: `class MinHeap {
  constructor() { this.data = []; }
  insert(value) { /* bubble up */ }
}`,
          },
          {
            language: 'C++',
            code: `priority_queue<int, vector<int>, greater<int>> minHeap;`,
          },
          {
            language: 'Java',
            code: `PriorityQueue<Integer> minHeap = new PriorityQueue<>();`,
          },
        ],
        keyConcepts: ['Heap property', 'Binary heap', 'Insert', 'Extract-min', 'Heapify'],
        complexity: 'Insert and remove operations are O(log n); building a heap is O(n).',
        practiceQuestions: ['Convert an array into a min-heap.', 'Explain how heap sort uses heap operations.', 'Show array indices for tree children in a heap.'],
        quiz: [
          {
            question: 'A min-heap stores the smallest value at?',
            options: ['A leaf', 'The root', 'A child node', 'Anywhere'],
            answer: 'The root',
          },
          {
            question: 'Heap insert complexity is?',
            options: ['O(1)', 'O(n)', 'O(log n)', 'O(n log n)'],
            answer: 'O(log n)',
          },
        ],
      },
      {
        lessonNumber: 7,
        lessonId: 'tree-lesson-7',
        title: 'Lowest Common Ancestor',
        description: 'Discover methods to compute the lowest common ancestor in trees and binary search trees.',
        difficulty: 'Advanced',
        estimatedTime: '40 mins',
        theory: 'The lowest common ancestor of two nodes in a tree is the deepest node that is an ancestor of both. LCA can be solved with parent tracking, recursion, or binary lifting for fast queries.',
        codeExamples: [
          {
            language: 'JavaScript',
            code: `function findLCA(root, a, b) {
  if (!root || root === a || root === b) return root;
  const left = findLCA(root.left, a, b);
  const right = findLCA(root.right, a, b);
  return left && right ? root : left || right;
}`,
          },
          {
            language: 'C++',
            code: `TreeNode* lca(TreeNode* root, TreeNode* p, TreeNode* q) {
  if (!root || root == p || root == q) return root;
  TreeNode* left = lca(root->left, p, q);
  TreeNode* right = lca(root->right, p, q);
  return left && right ? root : left ? left : right;
}`,
          },
          {
            language: 'Java',
            code: `TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {
  if (root == null || root == p || root == q) return root;
  TreeNode left = lowestCommonAncestor(root.left, p, q);
  TreeNode right = lowestCommonAncestor(root.right, p, q);
  return left != null && right != null ? root : left != null ? left : right;
}`,
          },
        ],
        keyConcepts: ['Ancestor', 'Binary lifting', 'Recursion', 'Pair search'],
        complexity: 'Naive recursion is O(n). Preprocessing with binary lifting can answer queries in O(log n).',
        practiceQuestions: ['Find LCA in a sample binary tree.', 'Explain why LCA appears once in the recursion.', 'Describe an optimization for many LCA queries.'],
        quiz: [
          {
            question: 'LCA is the deepest node that is ancestor to?',
            options: ['One node', 'Both nodes', 'Neither node', 'Only the root'],
            answer: 'Both nodes',
          },
          {
            question: 'Binary lifting optimizes LCA query time to?',
            options: ['O(n)', 'O(log n)', 'O(1)', 'O(n log n)'],
            answer: 'O(log n)',
          },
        ],
      },
      {
        lessonNumber: 8,
        lessonId: 'tree-lesson-8',
        title: 'Segment Trees',
        description: 'Explore segment trees for range queries and updates with efficient performance.',
        difficulty: 'Advanced',
        estimatedTime: '40 mins',
        theory: 'Segment trees store aggregate values over intervals. They answer range queries and support updates in O(log n) time, making them essential for range sum, min, or max queries.',
        codeExamples: [
          {
            language: 'JavaScript',
            code: `function buildSegTree(arr) {
  const n = arr.length;
  const tree = Array(4 * n).fill(0);
  function build(node, start, end) {
    if (start === end) tree[node] = arr[start];
    else {
      const mid = Math.floor((start + end) / 2);
      build(node*2, start, mid);
      build(node*2+1, mid+1, end);
      tree[node] = tree[node*2] + tree[node*2+1];
    }
  }
  build(1, 0, n-1);
  return tree;
}`,
          },
          {
            language: 'C++',
            code: `void build(int node, int start, int end) {
  if (start == end) tree[node] = arr[start];
  else {
    int mid = (start + end) / 2;
    build(node*2, start, mid);
    build(node*2+1, mid+1, end);
    tree[node] = tree[node*2] + tree[node*2+1];
  }
}`,
          },
          {
            language: 'Java',
            code: `void build(int node, int start, int end) {
  if (start == end) tree[node] = arr[start];
  else {
    int mid = (start + end) / 2;
    build(node*2, start, mid);
    build(node*2+1, mid+1, end);
    tree[node] = tree[node*2] + tree[node*2+1];
  }
}`,
          },
        ],
        keyConcepts: ['Range queries', 'Segment tree', 'Lazy propagation', 'O(log n) updates'],
        complexity: 'Build O(n), query and update O(log n).',
        practiceQuestions: ['Build a segment tree for range sum.', 'Explain how to update a single element.', 'Describe lazy propagation briefly.'],
        quiz: [
          {
            question: 'Segment tree query and update complexity is?',
            options: ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'],
            answer: 'O(log n)',
          },
          {
            question: 'Segment trees are most useful for?',
            options: ['Point queries only', 'Range queries and updates', 'Sorting values', 'Graph traversal'],
            answer: 'Range queries and updates',
          },
        ],
      },
      {
        lessonNumber: 9,
        lessonId: 'tree-lesson-9',
        title: 'Fenwick Trees',
        description: 'Learn Fenwick Trees / Binary Indexed Trees for prefix sums with compact updates.',
        difficulty: 'Advanced',
        estimatedTime: '40 mins',
        theory: 'Fenwick trees provide prefix sums and updates in O(log n) time with a very compact array-based structure. They are often easier to implement than segment trees.',
        codeExamples: [
          {
            language: 'JavaScript',
            code: `class FenwickTree {
  constructor(size) {
    this.tree = Array(size + 1).fill(0);
  }
  update(index, delta) {
    while (index < this.tree.length) {
      this.tree[index] += delta;
      index += index & -index;
    }
  }
  query(index) {
    let sum = 0;
    while (index > 0) {
      sum += this.tree[index];
      index -= index & -index;
    }
    return sum;
  }
}`,
          },
          {
            language: 'C++',
            code: `void update(int idx, int delta, int n) {
  while (idx <= n) {
    bit[idx] += delta;
    idx += idx & -idx;
  }
}
int query(int idx) {
  int sum = 0;
  while (idx > 0) {
    sum += bit[idx];
    idx -= idx & -idx;
  }
  return sum;
}`,
          },
          {
            language: 'Java',
            code: `void update(int idx, int delta) {
  while (idx <= n) {
    bit[idx] += delta;
    idx += idx & -idx;
  }
}
int query(int idx) {
  int sum = 0;
  while (idx > 0) {
    sum += bit[idx];
    idx -= idx & -idx;
  }
  return sum;
}`,
          },
        ],
        keyConcepts: ['Binary indexed tree', 'Prefix sum', 'Bit manipulation', 'Compact updates'],
        complexity: 'O(log n) for updates and prefix queries.',
        practiceQuestions: ['Implement a Fenwick tree for prefix sums.', 'Compare Fenwick tree to segment tree.', 'Why does Fenwick tree use idx & -idx?'],
        quiz: [
          {
            question: 'Fenwick tree is also known as?',
            options: ['Segment tree', 'Binary indexed tree', 'Heap', 'AVL tree'],
            answer: 'Binary indexed tree',
          },
          {
            question: 'Fenwick tree query complexity is?',
            options: ['O(n)', 'O(log n)', 'O(1)', 'O(n log n)'],
            answer: 'O(log n)',
          },
        ],
      },
      {
        lessonNumber: 10,
        lessonId: 'tree-lesson-10',
        title: 'Tree Problem Solving',
        description: 'Practice tree-based challenges and learn patterns for solving tree interview questions.',
        difficulty: 'Advanced',
        estimatedTime: '45 mins',
        theory: 'Tree problem solving combines traversal, recursion, balanced tree logic, and query structures. Master common patterns like root-to-leaf paths, subtree aggregation, and tree dynamic programming.',
        codeExamples: [
          {
            language: 'JavaScript',
            code: `function sumRootToLeaf(root, current = 0) {
  if (!root) return 0;
  const value = current * 2 + root.value;
  if (!root.left && !root.right) return value;
  return sumRootToLeaf(root.left, value) + sumRootToLeaf(root.right, value);
}`,
          },
          {
            language: 'C++',
            code: `int maxDepth(TreeNode* root) {
  if (!root) return 0;
  return 1 + max(maxDepth(root->left), maxDepth(root->right));
}`,
          },
          {
            language: 'Java',
            code: `int countNodes(TreeNode root) {
  if (root == null) return 0;
  return 1 + countNodes(root.left) + countNodes(root.right);
}`,
          },
        ],
        keyConcepts: ['Tree patterns', 'Path sums', 'Subtree aggregation', 'Recursion'],
        complexity: 'Most problems are O(n) with careful recursion and memoization.',
        practiceQuestions: ['Find the diameter of a binary tree.', 'Count nodes with subtree sum equal to k.', 'Compute maximum root-to-leaf path sum.'],
        quiz: [
          {
            question: 'Root-to-leaf path problems typically use?',
            options: ['BFS only', 'DFS recursion', 'Heap', 'Hash map only'],
            answer: 'DFS recursion',
          },
          {
            question: 'Tree problems that require subtree values often use?',
            options: ['Prefix sums', 'Recursion and memoization', 'Sorting', 'Greedy optimization'],
            answer: 'Recursion and memoization',
          },
        ],
      },
    ],
  },
  {
    key: 'dp',
    title: 'Dynamic Programming',
    description: 'Master DP patterns from memoization to bitmask DP and advanced problem solving.',
    icon: '🧠',
    level: 'Advanced',
    total: 10,
    duration: '8h',
    modulePath: '/DPLesson',
    prefix: 'dp',
    lessons: [
      {
        lessonNumber: 1,
        lessonId: 'dp-lesson-1',
        title: 'Introduction to DP',
        description: 'Learn the DP mindset of overlapping subproblems and optimal substructure.',
        difficulty: 'Beginner',
        estimatedTime: '30 mins',
        theory: 'Dynamic programming solves problems by breaking them into overlapping subproblems and storing results. It is ideal when recursion repeats work and optimal solutions build from smaller solutions.',
        codeExamples: [
          {
            language: 'JavaScript',
            code: `function fib(n, memo = {}) {
  if (n <= 1) return n;
  if (memo[n] != null) return memo[n];
  memo[n] = fib(n-1, memo) + fib(n-2, memo);
  return memo[n];
}`,
          },
          {
            language: 'C++',
            code: `int fib(int n, vector<int>& memo) {
  if (n <= 1) return n;
  if (memo[n] != -1) return memo[n];
  return memo[n] = fib(n-1, memo) + fib(n-2, memo);
}`,
          },
          {
            language: 'Java',
            code: `int fib(int n, int[] memo) {
  if (n <= 1) return n;
  if (memo[n] != 0) return memo[n];
  return memo[n] = fib(n-1, memo) + fib(n-2, memo);
}`,
          },
        ],
        keyConcepts: ['Memoization', 'Optimal substructure', 'Overlapping subproblems', 'State definition'],
        complexity: 'DP solutions typically run in polynomial time depending on state size.',
        practiceQuestions: ['Explain how DP differs from plain recursion.', 'Name one problem that benefits from DP.', 'What is the memo table used for?'],
        quiz: [
          {
            question: 'Dynamic programming is useful when subproblems are?',
            options: ['Independent', 'Overlapping', 'Unique', 'Random'],
            answer: 'Overlapping',
          },
          {
            question: 'DP stores results to avoid?',
            options: ['Greedy choices', 'Repeated computation', 'Sorting', 'Hashing'],
            answer: 'Repeated computation',
          },
        ],
      },
      {
        lessonNumber: 2,
        lessonId: 'dp-lesson-2',
        title: 'Memoization',
        description: 'Learn top-down DP with memoization to cache recursive results.',
        difficulty: 'Intermediate',
        estimatedTime: '35 mins',
        theory: 'Memoization is a top-down technique where recursive calls store results in a cache. It avoids duplicate work by returning cached values when the same subproblem occurs again.',
        codeExamples: [
          {
            language: 'JavaScript',
            code: `const memo = {};
function climbStairs(n) {
  if (n <= 1) return 1;
  if (memo[n]) return memo[n];
  return memo[n] = climbStairs(n-1) + climbStairs(n-2);
}`,
          },
          {
            language: 'C++',
            code: `int climbStairs(int n, vector<int>& memo) {
  if (n <= 1) return 1;
  if (memo[n] != -1) return memo[n];
  return memo[n] = climbStairs(n-1, memo) + climbStairs(n-2, memo);
}`,
          },
          {
            language: 'Java',
            code: `int climbStairs(int n, int[] memo) {
  if (n <= 1) return 1;
  if (memo[n] != 0) return memo[n];
  return memo[n] = climbStairs(n-1, memo) + climbStairs(n-2, memo);
}`,
          },
        ],
        keyConcepts: ['Top-down DP', 'Cache', 'Recursive state', 'Memo table'],
        complexity: 'Memoized recursion often reduces exponential recursion to polynomial time.',
        practiceQuestions: ['Memoize Fibonacci computation.', 'Explain why memoization reduces time complexity.', 'What is stored in the memo table?'],
        quiz: [
          {
            question: 'Memoization is also called?',
            options: ['Bottom-up DP', 'Top-down DP', 'Greedy DP', 'Backtracking'],
            answer: 'Top-down DP',
          },
          {
            question: 'Memoization avoids?',
            options: ['Stack overflow', 'Duplicate recursion', 'Sorting', 'Pointer arithmetic'],
            answer: 'Duplicate recursion',
          },
        ],
      },
      {
        lessonNumber: 3,
        lessonId: 'dp-lesson-3',
        title: 'Tabulation',
        description: 'Learn bottom-up DP by filling a table iteratively from base cases.',
        difficulty: 'Intermediate',
        estimatedTime: '35 mins',
        theory: 'Tabulation builds a table from the smallest subproblems upward. It often uses loops and array indexing rather than recursion and can be more memory efficient in some cases.',
        codeExamples: [
          {
            language: 'JavaScript',
            code: `function fib(n) {
  const dp = [1, 1];
  for (let i = 2; i <= n; i++) {
    dp[i] = dp[i-1] + dp[i-2];
  }
  return dp[n];
}`,
          },
          {
            language: 'C++',
            code: `int fib(int n) {
  vector<int> dp(n+1);
  dp[0] = 0; dp[1] = 1;
  for (int i = 2; i <= n; i++) dp[i] = dp[i-1] + dp[i-2];
  return dp[n];
}`,
          },
          {
            language: 'Java',
            code: `int fib(int n) {
  int[] dp = new int[n+1];
  dp[0] = 0; dp[1] = 1;
  for (int i = 2; i <= n; i++) dp[i] = dp[i-1] + dp[i-2];
  return dp[n];
}`,
          },
        ],
        keyConcepts: ['Bottom-up DP', 'DP table', 'Iterative solution', 'State transition'],
        complexity: 'O(n) time for classic tabulation examples.',
        practiceQuestions: ['Tabulate Fibonacci numbers.', 'Convert a memoized solution to tabulation.', 'What is the base case in a DP table?'],
        quiz: [
          {
            question: 'Tabulation uses which order?',
            options: ['Bottom-up', 'Top-down', 'Random order', 'Greedy order'],
            answer: 'Bottom-up',
          },
          {
            question: 'Tabulation typically avoids what?',
            options: ['Loops', 'Recursion', 'Arrays', 'Tables'],
            answer: 'Recursion',
          },
        ],
      },
      {
        lessonNumber: 4,
        lessonId: 'dp-lesson-4',
        title: '0/1 Knapsack',
        description: 'Master the classic 0/1 Knapsack problem and its DP formulation.',
        difficulty: 'Advanced',
        estimatedTime: '40 mins',
        theory: '0/1 Knapsack selects items with weight and value to maximize total value without exceeding capacity. It is solved with DP by building a table on item index and remaining capacity.',
        codeExamples: [
          {
            language: 'JavaScript',
            code: `function knapsack(weights, values, capacity) {
  const n = weights.length;
  const dp = Array.from({ length: n+1 }, () => Array(capacity+1).fill(0));
  for (let i = 1; i <= n; i++) {
    for (let w = 0; w <= capacity; w++) {
      dp[i][w] = dp[i-1][w];
      if (weights[i-1] <= w) {
        dp[i][w] = Math.max(dp[i][w], values[i-1] + dp[i-1][w-weights[i-1]]);
      }
    }
  }
  return dp[n][capacity];
}`,
          },
          {
            language: 'C++',
            code: `int knapsack(vector<int>& wt, vector<int>& val, int W) {
  int n = wt.size();
  vector<vector<int>> dp(n+1, vector<int>(W+1));
  for (int i = 1; i <= n; i++) {
    for (int w = 0; w <= W; w++) {
      dp[i][w] = dp[i-1][w];
      if (wt[i-1] <= w) dp[i][w] = max(dp[i][w], val[i-1] + dp[i-1][w-wt[i-1]]);
    }
  }
  return dp[n][W];
}`,
          },
          {
            language: 'Java',
            code: `int knapsack(int[] wt, int[] val, int W) {
  int n = wt.length;
  int[][] dp = new int[n+1][W+1];
  for (int i = 1; i <= n; i++) {
    for (int w = 0; w <= W; w++) {
      dp[i][w] = dp[i-1][w];
      if (wt[i-1] <= w) dp[i][w] = Math.max(dp[i][w], val[i-1] + dp[i-1][w-wt[i-1]]);
    }
  }
  return dp[n][W];
}`,
          },
        ],
        keyConcepts: ['Capacity', 'Value', 'State table', '0/1 selection'],
        complexity: 'O(n * W) time and space, where n is item count and W is capacity.',
        practiceQuestions: ['Solve knapsack for given weights and values.', 'Explain the state transition formula.', 'How is this different from fractional knapsack?'],
        quiz: [
          {
            question: '0/1 Knapsack allows?',
            options: ['Fractional items', 'One copy of each item', 'Unlimited copies', 'Only one item total'],
            answer: 'One copy of each item',
          },
          {
            question: 'Knapsack DP complexity depends on?',
            options: ['Number of items', 'Capacity', 'Both n and W', 'Only W'],
            answer: 'Both n and W',
          },
        ],
      },
      {
        lessonNumber: 5,
        lessonId: 'dp-lesson-5',
        title: 'Longest Common Subsequence',
        description: 'Learn how to compute the LCS between two strings using DP.',
        difficulty: 'Advanced',
        estimatedTime: '40 mins',
        theory: 'The longest common subsequence problem finds the longest sequence present in both strings. The DP table is built by comparing prefixes and choosing optimal carries.',
        codeExamples: [
          {
            language: 'JavaScript',
            code: `function lcs(a, b) {
  const dp = Array.from({ length: a.length+1 }, () => Array(b.length+1).fill(0));
  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      dp[i][j] = a[i-1] === b[j-1]
        ? dp[i-1][j-1] + 1
        : Math.max(dp[i-1][j], dp[i][j-1]);
    }
  }
  return dp[a.length][b.length];
}`,
          },
          {
            language: 'C++',
            code: `int lcs(string a, string b) {
  int n = a.size(), m = b.size();
  vector<vector<int>> dp(n+1, vector<int>(m+1));
  for (int i = 1; i <= n; i++) {
    for (int j = 1; j <= m; j++) {
      if (a[i-1] == b[j-1]) dp[i][j] = dp[i-1][j-1] + 1;
      else dp[i][j] = max(dp[i-1][j], dp[i][j-1]);
    }
  }
  return dp[n][m];
}`,
          },
          {
            language: 'Java',
            code: `int lcs(String a, String b) {
  int n = a.length(), m = b.length();
  int[][] dp = new int[n+1][m+1];
  for (int i = 1; i <= n; i++) {
    for (int j = 1; j <= m; j++) {
      if (a.charAt(i-1) == b.charAt(j-1)) dp[i][j] = dp[i-1][j-1] + 1;
      else dp[i][j] = Math.max(dp[i-1][j], dp[i][j-1]);
    }
  }
  return dp[n][m];
}`,
          },
        ],
        keyConcepts: ['Subsequence', 'DP grid', 'Prefix comparison', 'Table reconstruction'],
        complexity: 'O(n * m) time and space, where n and m are string lengths.',
        practiceQuestions: ['Compute LCS for two short strings.', 'Explain how the DP table is filled.', 'How to reconstruct the subsequence?'],
        quiz: [
          {
            question: 'LCS stands for?',
            options: ['Longest common substring', 'Lowest common subsequence', 'Longest common subsequence', 'Largest common substring'],
            answer: 'Longest common subsequence',
          },
          {
            question: 'DP table dimensions depend on?',
            options: ['String lengths', 'Alphabet size', 'Number of queries', 'Memory size'],
            answer: 'String lengths',
          },
        ],
      },
      {
        lessonNumber: 6,
        lessonId: 'dp-lesson-6',
        title: 'Longest Increasing Subsequence',
        description: 'Solve LIS using DP and learn how to compute increasing subsequences efficiently.',
        difficulty: 'Advanced',
        estimatedTime: '40 mins',
        theory: 'LIS finds the longest strictly increasing subsequence in an array. A simple DP solution runs in O(n^2), while patience sorting and binary search improve it to O(n log n).',
        codeExamples: [
          {
            language: 'JavaScript',
            code: `function lis(nums) {
  const dp = Array(nums.length).fill(1);
  let best = 0;
  for (let i = 0; i < nums.length; i++) {
    for (let j = 0; j < i; j++) {
      if (nums[j] < nums[i]) dp[i] = Math.max(dp[i], dp[j] + 1);
    }
    best = Math.max(best, dp[i]);
  }
  return best;
}`,
          },
          {
            language: 'C++',
            code: `int lis(vector<int>& nums) {
  int n = nums.size(), best = 0;
  vector<int> dp(n, 1);
  for (int i = 0; i < n; i++) {
    for (int j = 0; j < i; j++) {
      if (nums[j] < nums[i]) dp[i] = max(dp[i], dp[j] + 1);
    }
    best = max(best, dp[i]);
  }
  return best;
}`,
          },
          {
            language: 'Java',
            code: `int lis(int[] nums) {
  int n = nums.length, best = 0;
  int[] dp = new int[n];
  Arrays.fill(dp, 1);
  for (int i = 0; i < n; i++) {
    for (int j = 0; j < i; j++) {
      if (nums[j] < nums[i]) dp[i] = Math.max(dp[i], dp[j] + 1);
    }
    best = Math.max(best, dp[i]);
  }
  return best;
}`,
          },
        ],
        keyConcepts: ['Patience sorting', 'Binary search optimization', 'State DP', 'Sequence length'],
        complexity: 'Naive DP is O(n^2); optimized solutions are O(n log n).',
        practiceQuestions: ['Compute LIS for a sample array.', 'Why is binary search used in optimized LIS?', 'How do you reconstruct the actual sequence?'],
        quiz: [
          {
            question: 'A faster LIS solution runs in?',
            options: ['O(n)', 'O(n log n)', 'O(n^2)', 'O(log n)'],
            answer: 'O(n log n)',
          },
          {
            question: 'LIS finds what type of subsequence?',
            options: ['Non-decreasing', 'Strictly increasing', 'Decreasing', 'Constant'],
            answer: 'Strictly increasing',
          },
        ],
      },
      {
        lessonNumber: 7,
        lessonId: 'dp-lesson-7',
        title: 'DP on Grids',
        description: 'Learn how to solve path and counting problems on grids using DP.',
        difficulty: 'Advanced',
        estimatedTime: '35 mins',
        theory: 'Grid DP uses a table to compute answers based on neighbors, such as path counts, minimum costs, or maximum values while moving across a grid.',
        codeExamples: [
          {
            language: 'JavaScript',
            code: `function uniquePaths(m, n) {
  const dp = Array.from({ length: m }, () => Array(n).fill(1));
  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      dp[i][j] = dp[i-1][j] + dp[i][j-1];
    }
  }
  return dp[m-1][n-1];
}`,
          },
          {
            language: 'C++',
            code: `int uniquePaths(int m, int n) {
  vector<vector<int>> dp(m, vector<int>(n, 1));
  for (int i = 1; i < m; i++) {
    for (int j = 1; j < n; j++) dp[i][j] = dp[i-1][j] + dp[i][j-1];
  }
  return dp[m-1][n-1];
}`,
          },
          {
            language: 'Java',
            code: `int uniquePaths(int m, int n) {
  int[][] dp = new int[m][n];
  for (int i = 0; i < m; i++) Arrays.fill(dp[i], 1);
  for (int i = 1; i < m; i++) {
    for (int j = 1; j < n; j++) dp[i][j] = dp[i-1][j] + dp[i][j-1];
  }
  return dp[m-1][n-1];
}`,
          },
        ],
        keyConcepts: ['Grid DP', 'Neighbor transitions', 'Path counting', 'Boundary conditions'],
        complexity: 'O(m * n) time and space for an m by n grid.',
        practiceQuestions: ['Compute unique paths in a 3x3 grid.', 'Add obstacles to the paths problem.', 'Explain how boundary cells are initialized.'],
        quiz: [
          {
            question: 'Grid DP path counts typically use which recurrence?',
            options: ['dp[i][j] = dp[i-1][j] * dp[i][j-1]', 'dp[i][j] = dp[i-1][j] + dp[i][j-1]', 'dp[i][j] = dp[i][j-1] - dp[i-1][j]', 'dp[i][j] = max(dp[i-1][j], dp[i][j-1])'],
            answer: 'dp[i][j] = dp[i-1][j] + dp[i][j-1]',
          },
          {
            question: 'Grid DP base cases are usually on?',
            options: ['Corners only', 'First row and first column', 'Last row only', 'Middle cells'],
            answer: 'First row and first column',
          },
        ],
      },
      {
        lessonNumber: 8,
        lessonId: 'dp-lesson-8',
        title: 'DP on Trees',
        description: 'Study dynamic programming techniques on tree structures using recursive state propagation.',
        difficulty: 'Advanced',
        estimatedTime: '45 mins',
        theory: 'Tree DP uses recursion and memoization over tree nodes. Each node computes values based on children, enabling algorithms like tree diameter, independent set, or path sums.',
        codeExamples: [
          {
            language: 'JavaScript',
            code: `function treeDP(node) {
  if (!node) return 0;
  const left = treeDP(node.left);
  const right = treeDP(node.right);
  return node.value + Math.max(left, right);
}`,
          },
          {
            language: 'C++',
            code: `int treeDP(TreeNode* node) {
  if (!node) return 0;
  int left = treeDP(node->left);
  int right = treeDP(node->right);
  return node->val + max(left, right);
}`,
          },
          {
            language: 'Java',
            code: `int treeDP(TreeNode node) {
  if (node == null) return 0;
  int left = treeDP(node.left);
  int right = treeDP(node.right);
  return node.val + Math.max(left, right);
}`,
          },
        ],
        keyConcepts: ['Tree recursion', 'State transition', 'Memoization on nodes', 'Subtree values'],
        complexity: 'O(n) time for one pass through the tree.',
        practiceQuestions: ['Compute the maximum path sum in a tree.', 'Describe a DP state for tree independent set.', 'How do you memoize tree recursion?'],
        quiz: [
          {
            question: 'Tree DP typically uses which traversal?',
            options: ['Level-order', 'Post-order', 'Pre-order', 'In-order'],
            answer: 'Post-order',
          },
          {
            question: 'Tree DP state often aggregates values from?',
            options: ['Parents only', 'Children nodes', 'Sibling nodes', 'Root only'],
            answer: 'Children nodes',
          },
        ],
      },
      {
        lessonNumber: 9,
        lessonId: 'dp-lesson-9',
        title: 'Bitmask DP',
        description: 'Learn how to use bitmasks to represent subsets efficiently in DP.',
        difficulty: 'Advanced',
        estimatedTime: '45 mins',
        theory: 'Bitmask DP uses bits to represent subsets and stores DP values for each mask. It is ideal for problems with small n where subsets can be encoded in a single integer.',
        codeExamples: [
          {
            language: 'JavaScript',
            code: `const n = 4;
const dp = Array(1 << n).fill(0);
for (let mask = 1; mask < (1 << n); mask++) {
  for (let bit = 0; bit < n; bit++) {
    if (mask & (1 << bit)) {
      dp[mask] = Math.max(dp[mask], dp[mask ^ (1 << bit)] + values[bit]);
    }
  }
}`,
          },
          {
            language: 'C++',
            code: `int N = 4;
vector<int> dp(1<<N);
for (int mask = 1; mask < (1<<N); mask++) {
  for (int bit = 0; bit < N; bit++) {
    if (mask & (1<<bit)) {
      dp[mask] = max(dp[mask], dp[mask ^ (1<<bit)] + value[bit]);
    }
  }
}`,
          },
          {
            language: 'Java',
            code: `int N = 4;
int[] dp = new int[1<<N];
for (int mask = 1; mask < (1<<N); mask++) {
  for (int bit = 0; bit < N; bit++) {
    if ((mask & (1<<bit)) != 0) {
      dp[mask] = Math.max(dp[mask], dp[mask ^ (1<<bit)] + value[bit]);
    }
  }
}`,
          },
        ],
        keyConcepts: ['Bitmask', 'Subset DP', 'State compression', 'Mask iteration'],
        complexity: 'O(2^n * n) time, suitable for n ≤ 20 in practice.',
        practiceQuestions: ['Use bitmask DP for TSP on 4 nodes.', 'Explain how to iterate all subsets of a mask.', 'Why is bitmask DP memory heavy?'],
        quiz: [
          {
            question: 'Bitmask DP encodes subsets using?',
            options: ['Characters', 'Integers and bits', 'Strings', 'Lists'],
            answer: 'Integers and bits',
          },
          {
            question: 'Typical bitmask DP complexity is?',
            options: ['O(n)', 'O(2^n)', 'O(2^n * n)', 'O(n^2)'],
            answer: 'O(2^n * n)',
          },
        ],
      },
      {
        lessonNumber: 10,
        lessonId: 'dp-lesson-10',
        title: 'Advanced DP Patterns',
        description: 'Explore advanced DP patterns like knapsack, matrix chain, and state compression.',
        difficulty: 'Advanced',
        estimatedTime: '50 mins',
        theory: 'Advanced DP problems require defining the right states and transitions. Patterns include knapsack, sequence DP, tree DP, and bitmask DP, and they often appear in coding interviews.',
        codeExamples: [
          {
            language: 'JavaScript',
            code: `// Example: matrix chain multiplication state
function matrixChain(p) {
  const n = p.length - 1;
  const dp = Array.from({ length: n }, () => Array(n).fill(Infinity));
  for (let i = 0; i < n; i++) dp[i][i] = 0;
  for (let len = 2; len <= n; len++) {
    for (let i = 0; i <= n - len; i++) {
      const j = i + len - 1;
      for (let k = i; k < j; k++) {
        dp[i][j] = Math.min(dp[i][j], dp[i][k] + dp[k+1][j] + p[i]*p[k+1]*p[j+1]);
      }
    }
  }
  return dp[0][n-1];
}`,
          },
          {
            language: 'C++',
            code: `// Matrix Chain Multiplication
int matrixChain(vector<int>& p) {
  int n = p.size() - 1;
  vector<vector<int>> dp(n, vector<int>(n, 0));
  for (int len = 2; len <= n; len++) {
    for (int i = 0; i <= n-len; i++) {
      int j = i + len - 1;
      dp[i][j] = INT_MAX;
      for (int k = i; k < j; k++) {
        dp[i][j] = min(dp[i][j], dp[i][k] + dp[k+1][j] + p[i]*p[k+1]*p[j+1]);
      }
    }
  }
  return dp[0][n-1];
}`,
          },
          {
            language: 'Java',
            code: `int matrixChain(int[] p) {
  int n = p.length - 1;
  int[][] dp = new int[n][n];
  for (int len = 2; len <= n; len++) {
    for (int i = 0; i <= n-len; i++) {
      int j = i + len - 1;
      dp[i][j] = Integer.MAX_VALUE;
      for (int k = i; k < j; k++) {
        dp[i][j] = Math.min(dp[i][j], dp[i][k] + dp[k+1][j] + p[i]*p[k+1]*p[j+1]);
      }
    }
  }
  return dp[0][n-1];
}`,
          },
        ],
        keyConcepts: ['State selection', 'Transition formulation', 'Pattern recognition', 'Optimization'],
        complexity: 'Advanced DP problems often range from O(n^2) to O(2^n * n) depending on state definition.',
        practiceQuestions: ['Solve matrix chain multiplication for three matrices.', 'Identify DP state for a sequence optimization problem.', 'What makes DP pattern recognition hard?'],
        quiz: [
          {
            question: 'Advanced DP often begins with choosing the correct?',
            options: ['Data structure', 'State definition', 'Sorting order', 'Hash function'],
            answer: 'State definition',
          },
          {
            question: 'DP patterns are most useful in?',
            options: ['Greedy problems', 'Recursive with overlapping subproblems', 'Pure sorting', 'Matrix multiplication only'],
            answer: 'Recursive with overlapping subproblems',
          },
        ],
      },
    ],
  },
];

export const getModuleByKey = (key) => dsaModules.find((module) => module.key === key);
