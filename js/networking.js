// ============================================================
// PILLAR 1: NETWORKING – FLASHCARDS & QUIZ (only pillar-specific)
// ============================================================
document.addEventListener('DOMContentLoaded', () => {

  //----- FLASHCARD DATA & RENDERING -----
  const FLASHCARDS = [
    // ============================================================
    // OSI MODEL & LAYERS (6 cards)
    // ============================================================
    {
      term: "OSI Model mnemonic",
      answer: "All People Seem To Need Data Processing — layers 7 to 1: Application, Presentation, Session, Transport, Network, Data Link, Physical"
    },
    {
      term: "PDU at Layer 4 (Transport)",
      answer: "Segment — TCP/UDP segment with port numbers. TCP adds sequence numbers for reliability."
    },
    {
      term: "PDU at Layer 3 (Network)",
      answer: "Packet — IP packet with source/destination IP addresses. Routers forward at this layer."
    },
    {
      term: "PDU at Layer 2 (Data Link)",
      answer: "Frame — Ethernet frame with MAC addresses and FCS trailer. Switches operate here."
    },
    {
      term: "OSI Layer 7 protocols",
      answer: "HTTP, HTTPS, FTP, SMTP, SSH, DNS — Application layer protocols for user services."
    },
    {
      term: "OSI Layer 4 protocols",
      answer: "TCP (reliable, connection-oriented) and UDP (fast, connectionless)."
    },

    // ============================================================
    // IP ADDRESSING & SUBNETTING (8 cards)
    // ============================================================
    {
      term: "RFC 1918 private ranges",
      answer: "10.0.0.0/8 (enterprise) · 172.16.0.0/12 (mid-size) · 192.168.0.0/16 (home/office)"
    },
    {
      term: "APIPA range",
      answer: "169.254.0.0/16 — self-assigned when DHCP fails. Seeing 169.254.x.x = DHCP unreachable."
    },
    {
      term: "Loopback address",
      answer: "127.0.0.1 — traffic never leaves the host. Also accessible as 'localhost'."
    },
    {
      term: "Subnet formula: usable hosts",
      answer: "2^(host bits) − 2. Subtract 2 for network address and broadcast address."
    },
    {
      term: "CIDR /26 — key facts",
      answer: "Mask: 255.255.255.192 · Block size: 64 · Usable hosts: 62 · Subnets from /24: 4"
    },
    {
      term: "What is a subnet mask?",
      answer: "32-bit number separating network and host portions. 1s = network bits, 0s = host bits. 255.255.255.0 = /24."
    },
    {
      term: "CIDR notation explained",
      answer: "IP address followed by slash and prefix length. /24 means 24 network bits, 8 host bits."
    },
    {
      term: "IPv6 address shortening rules",
      answer: "Rule 1: drop leading zeros in each group (0db8 → db8). Rule 2: replace one consecutive run of zero groups with :: (can appear only once)."
    },

    // ============================================================
    // TCP & UDP (5 cards)
    // ============================================================
    {
      term: "TCP three-way handshake",
      answer: "SYN (client) → SYN-ACK (server) → ACK (client). Connection established."
    },
    {
      term: "TCP flags — SYN, ACK, FIN, RST",
      answer: "SYN: establish connection. ACK: acknowledge data. FIN: graceful close. RST: reset/abort connection."
    },
    {
      term: "TCP vs UDP — key differences",
      answer: "TCP: reliable, ordered, connection-oriented, slower. UDP: unreliable, unordered, connectionless, faster."
    },
    {
      term: "UDP use cases",
      answer: "DNS queries, VoIP, video streaming, DHCP — where speed matters more than reliability."
    },
    {
      term: "TCP congestion control algorithms",
      answer: "Slow start (exponential) → Congestion avoidance (linear) → Fast retransmit/fast recovery (on loss)."
    },

    // ============================================================
    // DNS & PORTS (3 cards)
    // ============================================================
    {
      term: "DNS port and protocol",
      answer: "Port 53. UDP for standard queries. TCP for large responses (zone transfers, 512+ byte replies)."
    },
    {
      term: "DNS record types — A, AAAA, CNAME",
      answer: "A: IPv4 address. AAAA: IPv6 address. CNAME: alias/canonical name (maps one hostname to another)."
    },
    {
      term: "Common ports — SSH, HTTP, HTTPS, DNS",
      answer: "SSH: 22, HTTP: 80, HTTPS: 443, DNS: 53."
    },

    // ============================================================
    // NETWORK DEVICES & TOPOLOGIES (4 cards)
    // ============================================================
    {
      term: "Hub vs switch vs router",
      answer: "Hub: broadcasts to all ports (obsolete). Switch: forwards based on MAC address. Router: forwards based on IP address between networks."
    },
    {
      term: "Default gateway",
      answer: "Router's private-side IP configured on every device. Traffic to other networks is forwarded here."
    },
    {
      term: "What is a VLAN?",
      answer: "Virtual LAN — logically segments a physical network into separate broadcast domains for security and traffic reduction."
    },
    {
      term: "Broadcast vs multicast address",
      answer: "Broadcast: sent to ALL devices (255.255.255.255). Multicast: sent to specific group (224.0.0.0–239.255.255.255)."
    },

    // ============================================================
    // NAT & FIREWALLS (3 cards)
    // ============================================================
    {
      term: "NAT vs PAT",
      answer: "NAT = IP translation only (one private per public). PAT = IP + port translation (many private per public IP)."
    },
    {
      term: "What is NAT overloading (PAT)?",
      answer: "Port Address Translation — maps multiple private IPs to one public IP using unique source ports. Most common NAT in home routers."
    },
    {
      term: "Stateful vs stateless firewall",
      answer: "Stateless: examines each packet in isolation. Stateful: tracks connection state table — only allows responses to established outbound connections."
    },

    // ============================================================
    // ARP & LAYER 2 (4 cards)
    // ============================================================
    {
      term: "ARP purpose",
      answer: "Address Resolution Protocol — resolves IP addresses to MAC addresses within a subnet. Broadcasts 'Who has x.x.x.x?' and caches the reply."
    },
    {
      term: "ARP poisoning/spoofing",
      answer: "Attacker sends fake ARP replies, associating their MAC with another device's IP. Traffic goes to attacker instead."
    },
    {
      term: "FCS (Frame Check Sequence)",
      answer: "Checksum trailer at Layer 2. Receiver recalculates; mismatch = frame corrupted and discarded. Only footer in the stack."
    },
    {
      term: "MAC address structure",
      answer: "48-bit address: first 24 bits = OUI (vendor), last 24 bits = NIC-specific. Example: 00:1A:2B:3C:4D:5E."
    },

    // ============================================================
    // ROUTING PROTOCOLS (3 cards)
    // ============================================================
    {
      term: "BGP (Border Gateway Protocol)",
      answer: "Holds the public internet together. ISPs use it to advertise address blocks and determine global routing paths."
    },
    {
      term: "OSPF (Open Shortest Path First)",
      answer: "Interior Gateway Protocol (IGP) using link-state routing. Calculates shortest path using Dijkstra's algorithm. Common in enterprise networks."
    },
    {
      term: "VLSM golden rule",
      answer: "Always allocate subnets from largest host requirement to smallest. Prevents large subnets wasting space needed by smaller ones."
    },

    // ============================================================
    // NETWORK SECURITY (3 cards)
    // ============================================================
    {
      term: "SYN flood attack",
      answer: "Attacker sends many SYN packets but never completes the handshake. Target's connection table fills with half-open connections, refusing legitimate traffic."
    },
    {
      term: "IDS vs IPS",
      answer: "IDS (Intrusion Detection System): monitors and alerts. IPS (Intrusion Prevention System): monitors and actively blocks/threatens traffic."
    },
    {
      term: "DMZ (Demilitarized Zone)",
      answer: "Network segment between internet and internal network. Hosts public-facing servers (web, email). If compromised, internal network remains protected."
    },

    // ============================================================
    // CABLING & PHYSICAL LAYER (4 cards)
    // ============================================================
    {
      term: "T568B mnemonic",
      answer: "O · G · B · G · B (2-1-2-1-2): Orange×2 → White/Green → Blue×2 → Green → Brown×2. Dominant standard for commercial and home cabling."
    },
    {
      term: "RJ45 T568A vs T568B difference",
      answer: "Only the orange and green pairs swap. Pins 4,5 (blue) and 7,8 (brown) are identical in both. T568B: Orange leads. T568A: Green leads."
    },
    {
      term: "Straight-through vs crossover cable",
      answer: "Straight-through: both ends T568B — connects different device types (PC→switch). Crossover: T568A one end, T568B other — connects same device types (PC→PC)."
    },
    {
      term: "OSI Layer 1 (Physical) responsibilities",
      answer: "Transmits raw bits over a medium. Defines cabling, connectors, signaling, voltage levels, and data rates."
    },

    // ============================================================
    // IPv6 & ICMP (3 cards)
    // ============================================================
    {
      term: "IPv6 address types — link-local, unique local, global",
      answer: "Link-local: FE80::/10 (communication on same subnet). Unique local: FC00::/7 (private internal). Global: 2000::/3 (public internet)."
    },
    {
      term: "ICMP protocol",
      answer: "Internet Control Message Protocol — used for error reporting and diagnostics. Ping uses ICMP Echo Request/Reply."
    },
    {
      term: "Common ICMP types",
      answer: "Type 0: Echo Reply (ping response). Type 3: Destination Unreachable. Type 8: Echo Request (ping). Type 11: Time Exceeded (traceroute)."
    },

    // ============================================================
    // DHCP & TROUBLESHOOTING (3 cards)
    // ============================================================
    {
      term: "DHCP process — DORA",
      answer: "Discover (client broadcast) → Offer (server) → Request (client) → Acknowledge (server). Client gets IP, mask, gateway, DNS."
    },
    {
      term: "ping command",
      answer: "Tests reachability using ICMP Echo Request/Reply. Common flags: -c (count), -i (interval), -s (packet size)."
    },
    {
      term: "traceroute command",
      answer: "Shows each hop (router) a packet takes to reach a destination. Uses ICMP Time Exceeded or UDP packets with increasing TTL."
    }
  ];

  function renderFlashcards() {
    const track = document.getElementById('flashcardTrack');
    if (!track) return;
    
    track.innerHTML = FLASHCARDS.map((card, index) => `
      <div class="flashcard" tabindex="0" role="button" aria-label="Flashcard: ${card.term}" 
          data-index="${index}"
          onclick="this.classList.toggle('flipped')" 
          onkeydown="if(event.key===' '||event.key==='Enter'){event.preventDefault();this.classList.toggle('flipped');}">
        <div class="flashcard-inner">
          <div class="flashcard-front">
            <div class="card-label">Term</div>
            <div class="card-term">${card.term}</div>
            <div class="card-hint">click or press enter to reveal</div>
          </div>
          <div class="flashcard-back">
            <div class="card-answer">${card.answer}</div>
          </div>
        </div>
      </div>
    `).join('');
    
        // Update flashcard counter
    const countSpan = document.getElementById('flashcardCount');
    if (countSpan) {
      countSpan.textContent = `${FLASHCARDS.length} cards`;
    }

    initFlashcardScroller();
  }

  // ============================================================
  // NETWORKING PAGE — Overview Content
  // ============================================================

  const NETWORKING_OVERVIEW = {
    purpose: {
      title: '📌 Purpose',
      description: [
        'This pillar builds genuine networking foundations from first principles before touching any cloud infrastructure or AWS services. Networking underpins every system you will design, operate, and troubleshoot as a Solutions Architect and DevOps engineer — understanding it deeply, not superficially, is the goal.',
        'Every concept here was studied independently of cloud tooling. The knowledge transfers directly to AWS (VPCs, subnets, route tables, security groups, DNS, load balancers) and to the full DevOps roadmap (service discovery, container networking, Kubernetes networking, infrastructure as code).'
      ]
    },
    objectives: [
      'Explain the OSI and TCP/IP models from memory and identify which protocols and devices operate at each layer',
      'Read and write IPv4 addresses in both decimal and binary, and identify address classes, private ranges, and special addresses',
      'Perform subnetting calculations by hand — network address, broadcast address, usable host range, and host count — for any given CIDR block',
      'Design a VLSM addressing scheme for a network with mixed host requirements',
      'Explain how routers forward packets using routing tables and longest prefix match, and how switches use MAC address tables for local delivery',
      'Describe how NAT and PAT allow private networks to share a public IP address',
      'Trace a DNS query from browser cache through recursive resolver, root server, TLD server, and authoritative name server to final answer',
      'Differentiate TCP and UDP, explain the three-way handshake, and identify appropriate use cases for each protocol',
      'Define stateless and stateful firewalls, explain ACL rule evaluation, and describe network zone design including the DMZ',
      'Identify common network attacks (SYN flood, ARP spoofing, MITM, DDoS) and explain the mechanism behind each'
    ],
    keyConcepts: [
      { term: 'OSI layers 3, 4, 7', definition: 'Know the protocols at each layer cold' },
      { term: 'Subnetting by hand', definition: 'Given any CIDR block, calculate network address, broadcast address, usable range, and host count without assistance' },
      { term: 'VLSM', definition: 'Allocate subnets of different sizes from a single address space' },
      { term: 'TCP three-way handshake', definition: 'SYN, SYN-ACK, ACK and what each step achieves' },
      { term: 'DNS resolution', definition: 'The full path from browser cache to authoritative server' },
      { term: 'NAT/PAT', definition: 'How private addresses share a single public IP using port numbers' },
      { term: 'Stateful vs stateless firewall', definition: 'The difference and why it matters' },
      { term: 'RFC 1918 ranges', definition: '<code>10.0.0.0/8</code>, <code>172.16.0.0/12</code>, <code>192.168.0.0/16</code>' },
      { term: 'TCP flow control (sliding window)', definition: 'How it prevents overwhelming the receiver' },
      { term: 'Longest prefix match', definition: 'Router\'s algorithm for choosing the most specific route' }
    ],
    stats: [
      { label: 'Sections', value: '7/7 (100%)' },
      { label: 'Topics covered', value: '47+' },
      { label: 'Estimated time', value: '~14-15 hours' },
      { label: 'Difficulty range', value: '🟢 Beginner → 🟡 Intermediate' },
      { label: 'Status', value: '🎉 PILLAR COMPLETE' }
    ],
    readmeLink: 'https://github.com/K-Mash24/Great_Cheatsheets/tree/Master/saa-foundation/01-networking',
    readmeDetailLink: 'https://github.com/K-Mash24/Great_Cheatsheets/blob/Master/saa-foundation/01-networking/README.md'
  };

  function renderNetworkingOverview() {
    const container = document.getElementById('js-overview-container');
    if (!container) {
      console.warn('⚠️ Overview container not found');
      return;
    }
    
    const objectives = NETWORKING_OVERVIEW.objectives.map(obj => `<li>${obj}</li>`).join('');
    
    const keyConcepts = NETWORKING_OVERVIEW.keyConcepts.map(item => `
      <dt>${item.term}</dt>
      <dd>${item.definition}</dd>
    `).join('');
    
    const stats = NETWORKING_OVERVIEW.stats.map(stat => `
      <tr><td><strong>${stat.label}</strong></td><td>${stat.value}</td></tr>
    `).join('');
    
    container.innerHTML = `
      <div class="overview-content" style="margin-bottom: 2rem;">
        
        <!-- Purpose -->
        <div class="info-box note" style="margin-bottom: 1.5rem;">
          <strong>${NETWORKING_OVERVIEW.purpose.title}</strong>
          <p>${NETWORKING_OVERVIEW.purpose.description[0]}</p>
          <p style="margin-top: 0.5rem;">${NETWORKING_OVERVIEW.purpose.description[1]}</p>
        </div>

        <!-- Learning Objectives -->
        <div class="info-box tip" style="margin-bottom: 1.5rem;">
          <strong>🎯 Learning objectives</strong>
          <ul style="margin-top: 0.5rem; padding-left: 1.2rem;">
            ${objectives}
          </ul>
        </div>

        <!-- Key Concepts -->
        <div class="info-box warning" style="margin-bottom: 2rem;">
          <strong>🔁 Key concepts to revise</strong>
          <dl class="key-concepts-list">
            ${keyConcepts}
          </dl>
        </div>

        <!-- Summary Statistics -->
        <div class="table-wrapper" style="margin-bottom: 1rem;">
          <table class="data-table">
            <thead>
              <tr><th>Metric</th><th>Value</th></tr>
            </thead>
            <tbody>
              ${stats}
            </tbody>
          </table>
        </div>

        <!-- Link to detailed README -->
        <div class="info-box note">
          <strong>📖 Detailed notes</strong>
          <p style="margin-top: 0.25rem;">All markdown notes are committed to <a href="${NETWORKING_OVERVIEW.readmeLink}" target="_blank" style="color: var(--accent-secondary);">Great_Cheatsheets/saa-foundation/01-networking/</a>. The <a href="${NETWORKING_OVERVIEW.readmeDetailLink}" target="_blank" style="color: var(--accent-secondary);">README.md</a> in that folder contains the complete pillar summary, learning objectives, and revision checklist.</p>
        </div>

      </div>
    `;
  }

  // ============================================================
  // SECTION 1 CONTENT — ALL accordions from "How the Internet Is Structured"
  // ============================================================

  const SECTION_1_ACCORDIONS = [
    {
      id: 'osi-model',
      title: 'OSI Model — Seven Layers',
      priority: true,
      icon: '⬡',
      bodyHTML: `
        <p>The OSI (Open Systems Interconnection) model breaks down how data travels between two computers into seven discrete layers. Each layer has one job and hands its output to the layer above or below it.</p>
        <p><strong>Mnemonic (layer 7 → Layer 1) :</strong> <code>All People Seem To Need Data Processing</code></p>
        <div class="osi-stack">
            <div class="osi-row priority-row" style="background:#eeedfe; border-color:#534ab7;">
              <div class="osi-num" style="background:#EEEDFE;color:#3C3489;">7</div>
              <div class="osi-name" style="background:#EEEDFE;color:#3C3489;">Application</div>
              <div class="osi-pdu" style="background:#EEEDFE;color:#534ab7;">Data</div>
              <div class="osi-protocols">HTTP, HTTPS, FTP, SMTP, SSH, DNS <span class="tag priority" style="margin-left:4px;">priority</span></div>
            </div>
            <div class="osi-row" style="background:#f1efe8;">
              <div class="osi-num" style="background:#f1efe8;color:#444441;">6</div>
              <div class="osi-name" style="background:#f1efe8;color:#444441;">Presentation</div>
              <div class="osi-pdu" style="background:#f1efe8;color:#5f5e5a;">Data</div>
              <div class="osi-protocols">TLS/SSL, GZIP, UTF-8</div>
            </div>
            <div class="osi-row" style="background:#f1efe8;">
              <div class="osi-num" style="background:#f1efe8;color:#444441;">5</div>
              <div class="osi-name" style="background:#f1efe8;color:#444441;">Session</div>
              <div class="osi-pdu" style="background:#f1efe8;color:#5f5e5a;">Data</div>
              <div class="osi-protocols">TLS handshake, RPC</div>
            </div>
            <div class="osi-row priority-row" style="background:#e6f1fb; border-color:#185fa5;">
              <div class="osi-num" style="background:#E6F1FB;color:#0C447C;">4</div>
              <div class="osi-name" style="background:#E6F1FB;color:#0C447C;">Transport</div>
              <div class="osi-pdu" style="background:#E6F1FB;color:#185fa5;">Segment</div>
              <div class="osi-protocols">TCP, UDP <span class="tag priority" style="margin-left:4px;">priority</span></div>
            </div>
            <div class="osi-row priority-row" style="background:#e1f5ee; border-color:#0f6e56;">
              <div class="osi-num" style="background:#E1F5EE;color:#085041;">3</div>
              <div class="osi-name" style="background:#E1F5EE;color:#085041;">Network</div>
              <div class="osi-pdu" style="background:#E1F5EE;color:#0f6e56;">Packet</div>
              <div class="osi-protocols">IP, ICMP, OSPF, BGP <span class="tag priority" style="margin-left:4px;">priority</span></div>
            </div>
            <div class="osi-row" style="background:#faece7;">
              <div class="osi-num" style="background:#FAECE7;color:#712B13;">2</div>
              <div class="osi-name" style="background:#FAECE7;color:#712B13;">Data Link</div>
              <div class="osi-pdu" style="background:#FAECE7;color:#993c1d;">Frame</div>
              <div class="osi-protocols">Ethernet, Wi-Fi (802.11), ARP</div>
            </div>
            <div class="osi-row" style="background:#f1efe8;">
              <div class="osi-num" style="background:#f1efe8;color:#444441;">1</div>
              <div class="osi-name" style="background:#f1efe8;color:#444441;">Physical</div>
              <div class="osi-pdu" style="background:#f1efe8;color:#5f5e5a;">Bit</div>
              <div class="osi-protocols">Cables, NICs, Wi-Fi radio, fibre optic</div>
            </div>
          </div>
        <div class="info-box note" style="margin-top:1rem;">
          <strong>Layer definitions</strong>
          <ul style="padding-left:1.1rem;margin-top:0.4rem;">
            <li><strong>Layer 7 — Application:</strong> Enables communication between applications and the network, handling protocols for web browsing (HTTP/HTTPS), file transfer (FTP), email (SMTP), and remote access (SSH).</li>
            <li><strong>Layer 6 — Presentation:</strong> Translates data by handling encryption (TLS/SSL), compression (GZIP), and character encoding (UTF-8), ensuring both sides agree on format. TLS/SSL encrypts HTTPS requests so intercepted traffic cannot be read.</li>
            <li><strong>Layer 5 — Session:</strong> Establishes, maintains, and terminates communication sessions. The TLS handshake occurs here, verifying the server's identity and negotiating an encryption key before data is exchanged.</li>
            <li><strong>Layer 4 — Transport:</strong> Provides reliable end-to-end delivery using TCP (segments, ports, ordered delivery) or fast connectionless delivery using UDP. Port 443 = HTTPS, port 80 = HTTP.</li>
            <li><strong>Layer 3 — Network:</strong> Handles logical addressing and routing using IP addresses. IP wraps TCP segments in packets. ICMP (used by <code>ping</code>) lives here.</li>
            <li><strong>Layer 2 — Data Link:</strong> Transfers data between directly connected devices using MAC addresses. ARP resolves IP addresses to MAC addresses. Switches operate here.</li>
            <li><strong>Layer 1 — Physical:</strong> Transmits raw bits as electrical signals, light pulses, or radio waves. No protocols — just hardware (NICs, cables, antennas).</li>
          </ul>
        </div>
      `
    },
    {
      id: 'tcpip-model',
      title: 'TCP/IP Model & OSI Mapping',
      priority: false,
      icon: '⬡',
      bodyHTML: `
        <p>The TCP/IP model is the practical framework that actually runs the internet. OSI is the theory; TCP/IP is the real-world implementation — four layers instead of seven, collapsing those rarely treated separately.</p>
        <div class="code-block"><pre>OSI model (7 layers)              TCP/IP model (4 layers)
  ─────────────────────             ──────────────────────────────────────
  7 — Application   ─┐
  6 — Presentation  ─┼──────────►  Layer 4 — Application
  5 — Session       ─┘             (HTTP, HTTPS, DNS, SMTP, SSH, TLS/SSL)

  4 — Transport     ───────────►   Layer 3 — Transport
                                  (TCP, UDP)

  3 — Network       ───────────►   Layer 2 — Internet
                                  (IP, ICMP)

  2 — Data link     ─┬──────────►  Layer 1 — Network access
  1 — Physical      ─┘             (Ethernet, Wi-Fi, ARP, NICs, cables)</pre></div>
        <div class="info-box tip">
          <strong>Key distinction</strong>
          OSI is a <em>reference model</em> used for teaching and troubleshooting. TCP/IP is the <em>working model</em> — the actual protocol suite the internet runs on. Transport and Internet layers map exactly 1:1 between both models.
        </div>
      `
    },
    {
      id: 'encapsulation',
      title: 'Packets & Encapsulation',
      priority: false,
      icon: '⬡',
      bodyHTML: `
        <p><strong>Encapsulation</strong> is the process by which each layer wraps the data from the layer above in its own header, adding only the information that layer needs. <strong>Decapsulation</strong> is the reverse — each layer strips its header on the receiving side.</p>
        <div class="code-block"><pre>SENDER — encapsulation (down the stack)
  ────────────────────────────────────────────
  Layer 7  Data     → HTTP request (browser)
  Layer 4  Segment  → [TCP header: ports, seq] + Data
  Layer 3  Packet   → [IP header: src IP, dst IP] + Segment
  Layer 2  Frame    → [MAC header] + Packet + [FCS trailer]
  Layer 1  Bits     → 101101000110... (electrical/radio/light)

  RECEIVER — decapsulation (up the stack)
  ────────────────────────────────────────────
  Layer 1  Bits     → frame reconstructed
  Layer 2  Frame    → MAC header checked + stripped → Packet
  Layer 3  Packet   → IP header checked + stripped → Segment
  Layer 4  Segment  → TCP header checked + stripped → Data
  Layer 7  Data     → original HTTP request delivered</pre></div>
        <div class="info-box note">
          <strong>The gift analogy</strong>
          Think of encapsulation as a gift (your data) wrapped in multiple nested boxes. Each handler reads only their label and passes it on. The depot does not open the shipping box. Decapsulation is the receiver opening each box in reverse order until the original gift is revealed.
        </div>
        <p style="margin-top:0.75rem;"><strong>FCS (Frame Check Sequence)</strong> — a checksum added as a <em>trailer</em> (not a header) at layer 2. The receiver recalculates on arrival — mismatch means the frame was corrupted and is discarded. The only footer in the stack.</p>
      `
    },
    {
      id: 'protocols-ports',
      title: 'Protocols & Common Port Numbers',
      priority: false,
      icon: '⬡',
      bodyHTML: `
        <p>A <strong>protocol</strong> is an agreed set of rules two machines follow to understand each other. A <strong>port number</strong> gets data to the right application on a machine — the IP address is the building, the port is the flat number inside.</p>
        <p>Port ranges: <code>0–1023</code> well-known · <code>1024–49151</code> registered · <code>49152–65535</code> ephemeral</p>
        <div class="table-wrapper">
          <table class="data-table">
            <thead><tr><th>Port</th><th>Protocol</th><th>Transport</th><th>Category</th><th>Purpose</th></tr></thead>
            <tbody>
              <tr><td><code>20</code></td><td>FTP data</td><td><span class="tag tcp">TCP</span></td><td>File Transfer</td><td>Transfers actual file data</td></tr>
              <tr><td><code>21</code></td><td>FTP</td><td><span class="tag tcp">TCP</span></td><td>File Transfer</td><td>Control channel — commands and authentication</td></tr>
              <tr><td><code>22</code></td><td>SSH</td><td><span class="tag tcp">TCP</span></td><td>Security</td><td>Encrypted remote login and command execution</td></tr>
              <tr><td><code>23</code></td><td>Telnet</td><td><span class="tag tcp">TCP</span></td><td>Security</td><td>Unencrypted remote login — insecure, replaced by SSH</td></tr>
              <tr><td><code>25</code></td><td>SMTP</td><td><span class="tag tcp">TCP</span></td><td>Email</td><td>Sends email between mail servers</td></tr>
              <tr><td><code>53</code></td><td>DNS</td><td><span class="tag both">TCP+UDP</span></td><td>Infrastructure</td><td>Resolves hostnames to IPs. UDP for queries, TCP for large responses</td></tr>
              <tr><td><code>67/68</code></td><td>DHCP</td><td><span class="tag udp">UDP</span></td><td>Infrastructure</td><td>Assigns IP addresses. 67=server, 68=client</td></tr>
              <tr><td><code>80</code></td><td>HTTP</td><td><span class="tag tcp">TCP</span></td><td>Web</td><td>Unencrypted web traffic</td></tr>
              <tr><td><code>110</code></td><td>POP3</td><td><span class="tag tcp">TCP</span></td><td>Email</td><td>Downloads email to client, deletes from server</td></tr>
              <tr><td><code>143</code></td><td>IMAP</td><td><span class="tag tcp">TCP</span></td><td>Email</td><td>Reads email while keeping it on server</td></tr>
              <tr><td><code>443</code></td><td>HTTPS</td><td><span class="tag tcp">TCP</span></td><td>Web</td><td>HTTP encrypted with TLS — default modern browsing</td></tr>
              <tr><td><code>3306</code></td><td>MySQL</td><td><span class="tag tcp">TCP</span></td><td>Infrastructure</td><td>MySQL / MariaDB database connections</td></tr>
              <tr><td><code>3389</code></td><td>RDP</td><td><span class="tag tcp">TCP</span></td><td>Security</td><td>Graphical remote access to Windows machines</td></tr>
              <tr><td><code>5432</code></td><td>PostgreSQL</td><td><span class="tag tcp">TCP</span></td><td>Infrastructure</td><td>PostgreSQL database connections</td></tr>
            </tbody>
          </table>
        </div>
      `
    },
    {
      id: 'rj45-cabling',
      title: 'RJ45 Cabling — T568A, T568B, Straight‑Through vs Crossover',
      priority: false,
      icon: '⬡',
      bodyHTML: `
        <p>RJ45 is the standard 8‑pin connector used for Ethernet cables. Two wiring standards exist: <strong>T568A</strong> and <strong>T568B</strong>. The only difference is that the orange and green pairs swap positions. Pins 4,5,7,8 (blue and brown) are identical in both standards.</p>

        <div class="table-wrapper">
          <table class="data-table">
            <thead><tr><th>Pin</th><th>T568A</th><th>T568B</th><th>Pair</th></tr></thead>
            <tbody>
              <tr><td>1</td><td style="color:green;">White/Green</td><td style="color:orange;">White/Orange</td><td>Pair 3 / Pair 2</td></tr>
              <tr><td>2</td><td style="color:green;">Green</td><td style="color:orange;">Orange</td><td>Pair 3 / Pair 2</td></tr>
              <tr><td>3</td><td style="color:orange;">White/Orange</td><td style="color:green;">White/Green</td><td>Pair 2 / Pair 3</td></tr>
              <tr><td>4</td><td style="color:blue;">Blue</td><td style="color:blue;">Blue</td><td>Pair 1</td></tr>
              <tr><td>5</td><td style="color:blue;">White/Blue</td><td style="color:blue;">White/Blue</td><td>Pair 1</td></tr>
              <tr><td>6</td><td style="color:orange;">Orange</td><td style="color:green;">Green</td><td>Pair 2 / Pair 3</td></tr>
              <tr><td>7</td><td style="color:brown;">White/Brown</td><td style="color:brown;">White/Brown</td><td>Pair 4</td></tr>
              <tr><td>8</td><td style="color:brown;">Brown</td><td style="color:brown;">Brown</td><td>Pair 4</td></tr>
            </tbody>
          </table>
        </div>

        <p><strong>Your mnemonic — O G B G B (2-1-2-1-2 format) for T568B:</strong></p>
        <div class="code-block"><pre>Orange  → 2 wires  → White/Orange (pin1), Orange (pin2)
  Green   → 1 wire   → White/Green  (pin3)
  Blue    → 2 wires  → Blue (pin4), White/Blue (pin5)
  Green   → 1 wire   → Green (pin6)
  Brown   → 2 wires  → White/Brown (pin7), Brown (pin8)</pre></div>

        <p>For T568A, swap the leading colors: <strong>G O B O B</strong> (Green then Orange).</p>

        <div class="table-wrapper" style="margin-top:1rem;">
          <table class="data-table">
            <thead><tr><th>Cable Type</th><th>Both ends</th><th>Use case</th></tr></thead>
            <tbody>
              <tr><td><strong>Straight‑through</strong></td><td>Same standard (A‑A or B‑B)</td><td>Different device types: computer → switch, switch → router</td></tr>
              <tr><td><strong>Crossover</strong></td><td>One end A, other end B</td><td>Same device types: computer → computer, switch → switch</td></tr>
            </tbody>
          </table>
        </div>

        <div class="info-box note">
          <strong>Colour‑by‑colour straight‑through vs crossover (T568B on both ends vs A‑B)</strong>
          <ul style="margin-top:0.5rem;">
            <li><strong>Straight‑through (B‑B):</strong> pin1→pin1 (W‑O), pin2→pin2 (O), pin3→pin3 (W‑G), pin6→pin6 (G), blue/brown pins stay matched.</li>
            <li><strong>Crossover (A‑B):</strong> pin1 (W‑G) ↔ pin3 (W‑O), pin2 (G) ↔ pin6 (O), the orange and green pairs cross; blue and brown pairs stay straight.</li>
          </ul>
        </div>

        <div style="display: flex; gap: 1rem; margin-top: 1rem; flex-wrap: wrap;">
          <div style="background:var(--bg-tertiary); border-radius: var(--radius-md); padding: 0.75rem; text-align: center; flex:1;">
            <img src="https://www.showmecables.com/media/wysiwyg/RJ45-Pinout-T568A.jpg" alt="T568A wiring diagram" style="width:100%; border-radius: var(--radius-sm); object-fit: contain; max-height: 120px;">
            <small style="display: block; margin-top: 0.5rem;">T568A — Green pair leads (pins 1-2)</small>
          </div>
          <div style="background:var(--bg-tertiary); border-radius: var(--radius-md); padding: 0.75rem; text-align: center; flex:1;">
            <img src="https://www.showmecables.com/media/wysiwyg/RJ45-Pinout-T568B.jpg" alt="T568B wiring diagram" style="width:100%; border-radius: var(--radius-sm); object-fit: contain; max-height: 120px;">
            <small style="display: block; margin-top: 0.5rem;">T568B — Orange pair leads (pins 1-2) — most common</small>
          </div>
          <div style="background:var(--bg-tertiary); border-radius: var(--radius-md); padding: 0.75rem; text-align: center; flex:1;">
            <img src="https://www.showmecables.com/media/wysiwyg/Crossover-Pinout-1024x512.png" alt="Crossover cable wiring" style="width:100%; border-radius: var(--radius-sm); object-fit: contain; max-height: 120px;">
            <small style="display: block; margin-top: 0.5rem;">Crossover — pins 1↔3, 2↔6 swap orange/green pairs</small>
          </div>
        </div>

        <div class="rj45-practice" id="rj45binPractice">
          <div class="rj45-practice-header">
            <h4>🧩 Practice: Arrange the Standard</h4>
            <p>Pick a standard, then place all 8 shuffled wires into the correct pin order from memory.</p>
          </div>
          <div class="rj45-mode-buttons">
            <button type="button" class="btn btn-secondary btn-sm" id="rj45binBtnA" onclick="rj45bSetStandard('A')">T568A</button>
            <button type="button" class="btn btn-secondary btn-sm" id="rj45binBtnB" onclick="rj45bSetStandard('B')">T568B</button>
          </div>
          <div id="rj45binWorkspace">
            <p style="color:var(--text-muted); font-size:0.85rem;">Choose a standard above to begin.</p>
          </div>
        </div>

        <div class="rj45-practice" id="rj45Practice">
          <div class="rj45-practice-header">
            <h4>🔧 Practice: Wire the second end</h4>
            <p>End A is already crimped and shown below. Pick a cable type, then click each pin on End B and choose the correct color to complete it.</p>
          </div>
          <div class="rj45-mode-buttons">
            <button type="button" class="btn btn-secondary btn-sm" id="rj45BtnStraight" onclick="rj45SetMode('straight')">Straight-Through</button>
            <button type="button" class="btn btn-secondary btn-sm" id="rj45BtnCross" onclick="rj45SetMode('cross')">Crossover</button>
          </div>
          <div id="rj45Workspace">
            <p style="color:var(--text-muted); font-size:0.85rem;">Choose a cable type above to begin.</p>
          </div>
        </div>
      `
    }
  ];

  // ============================================================
  // SECTION 2 CONTENT — IP Addressing
  // ============================================================

  const SECTION_2_ACCORDIONS = [
    {
      id: 'ipv4-structure',
      title: 'IPv4 Structure & Binary Conversion',
      priority: false,
      icon: '◈',
      bodyHTML: `
        <p>A 32-bit numerical label written as four decimal octets separated by dots. Each octet = 8 bits, value always 0–255. The 0–255 range is a hard mathematical limit: 2⁸ = 256 values.</p>
        <div class="code-block"><pre>192      .    168      .    1        .    1
  11000000      10101000      00000001      00000001
  octet 1       octet 2       octet 3       octet 4
  (8 bits)      (8 bits)      (8 bits)      (8 bits)
                      total = 32 bits</pre></div>
        <p><strong>Network ID</strong> — the portion identifying which network a device belongs to. <strong>Host ID</strong> — the portion identifying the specific device. In <code>192.168.1.5</code>, network ID = <code>192.168.1</code>, host ID = <code>5</code> (with a /24 mask).</p>
        <p><strong>Network address</strong> — first address in the block, host bits all zeros. Cannot be assigned to a device. <strong>Broadcast address</strong> — last address in the block, host bits all ones (255). Delivered to every device on the subnet.</p>
        <p><strong>Powers of 2 method for binary conversion:</strong></p>
        <div class="code-block"><pre>Bit position:   7      6      5      4      3      2      1      0
  Power of 2:   128     64     32     16      8      4      2      1

  Converting 192: 128 fits (rem 64) → 64 fits (rem 0) → all others: 0
  Result: 11000000

  Converting 168: 128 fits (rem 40) → 32 fits (rem 8) → 8 fits (rem 0)
  Result: 10101000

  Converting 1:   only the 1-position fits
  Result: 00000001

  Full address 192.168.1.1 → 11000000.10101000.00000001.00000001</pre></div>
      `
    },
    {
      id: 'public-private-ip',
      title: 'Public vs Private IP Ranges (RFC 1918) & Special Addresses',
      priority: false,
      icon: '◈',
      bodyHTML: `
        <p>IPv4 has only ~4.3 billion addresses (2³²). RFC 1918 designates three ranges as <strong>private</strong> — never routable on the public internet, reusable across any private network.</p>
        <div class="table-wrapper">
          <table class="data-table">
            <thead><tr><th>Range</th><th>CIDR</th><th>Addresses</th><th>Common use</th></tr></thead>
            <tbody>
              <tr><td><code>10.0.0.0 – 10.255.255.255</code></td><td><code>10.0.0.0/8</code></td><td>16,777,216</td><td>Large enterprise</td></tr>
              <tr><td><code>172.16.0.0 – 172.31.255.255</code></td><td><code>172.16.0.0/12</code></td><td>1,048,576</td><td>Mid-size networks</td></tr>
              <tr><td><code>192.168.0.0 – 192.168.255.255</code></td><td><code>192.168.0.0/16</code></td><td>65,536</td><td>Home &amp; small office</td></tr>
            </tbody>
          </table>
        </div>
        <p style="margin-top:0.75rem;">Special addresses:</p>
        <div class="table-wrapper">
          <table class="data-table">
            <thead><tr><th>Address / Range</th><th>Name</th><th>Meaning</th></tr></thead>
            <tbody>
              <tr><td><code>127.0.0.1</code></td><td>Loopback</td><td>This machine itself — traffic never leaves the host. Also: <code>localhost</code></td></tr>
              <tr><td><code>255.255.255.255</code></td><td>Limited broadcast</td><td>All devices on the local segment. Does not cross routers</td></tr>
              <tr><td><code>169.254.0.0/16</code></td><td>APIPA</td><td>Self-assigned fallback when DHCP is unreachable. Seeing this = DHCP failed</td></tr>
              <tr><td><code>0.0.0.0</code></td><td>Zero address</td><td>Unknown source address (pre-DHCP) or default route in routing tables</td></tr>
            </tbody>
          </table>
        </div>
      `
    },
    {
      id: 'ipv6-basics',
      title: 'IPv6 Basics',
      priority: false,
      icon: '◈',
      bodyHTML: `
        <p>IPv6 uses 128 bits, providing 2¹²⁸ ≈ 340 undecillion addresses. Written as eight groups of four hexadecimal digits separated by colons.</p>
        <div class="code-block"><pre>IPv4:   32 bits  → 4 groups of  8 bits → decimal   (0–255)
  IPv6:  128 bits  → 8 groups of 16 bits → hex       (0000–ffff)

  Full:   2001:0db8:0000:0000:0000:0000:0000:0001
  Rule 1 (drop leading zeros): 2001:db8:0:0:0:0:0:1
  Rule 2 (collapse zero run):  2001:db8::1

  Expanding 2001:db8::1 → 3 groups shown → 8-3=5 zeros hidden
  → 2001:0db8:0000:0000:0000:0000:0000:0001</pre></div>
        <div class="table-wrapper">
          <table class="data-table">
            <thead><tr><th>Type</th><th>Prefix</th><th>IPv4 equivalent</th><th>Purpose</th></tr></thead>
            <tbody>
              <tr><td>Global unicast</td><td><code>2000::/3</code></td><td>Public IPv4</td><td>Globally routable</td></tr>
              <tr><td>Link-local</td><td><code>fe80::/10</code></td><td>APIPA <code>169.254.x.x</code></td><td>Auto-assigned, local segment only</td></tr>
              <tr><td>Loopback</td><td><code>::1</code></td><td><code>127.0.0.1</code></td><td>This machine itself</td></tr>
              <tr><td>Multicast</td><td><code>ff00::/8</code></td><td><code>255.255.255.255</code></td><td>One-to-many (replaces broadcast)</td></tr>
            </tbody>
          </table>
        </div>
      `
    }
  ];

  // ============================================================
  // SECTION 3 CONTENT — Subnetting & CIDR
  // ============================================================

  const SECTION_3_ACCORDIONS = [
    {
      id: 'subnet-masks',
      title: 'Subnet Masks & CIDR Notation',
      priority: false,
      icon: '◆',
      bodyHTML: `
        <p>A <strong>subnet mask</strong> is a 32-bit number that defines the boundary between network ID and host ID. 1-bits = network, 0-bits = host. All 1s always appear before all 0s.</p>
        <p><strong>CIDR notation</strong> expresses an address and its mask together. The prefix length is the count of consecutive 1-bits.</p>
        <div class="code-block"><pre>192.168.1.0 + 255.255.255.0  →  192.168.1.0/24

  255.255.255.0 in binary:
  11111111.11111111.11111111.00000000  (24 ones)</pre></div>
        <div class="table-wrapper">
          <table class="data-table">
            <thead><tr><th>Prefix</th><th>Subnet mask</th><th>Host bits</th><th>Block size</th><th>Usable hosts</th></tr></thead>
            <tbody>
              <tr><td><code>/8</code></td><td>255.0.0.0</td><td>24</td><td>16,777,216</td><td>16,777,214</td></tr>
              <tr><td><code>/16</code></td><td>255.255.0.0</td><td>16</td><td>65,536</td><td>65,534</td></tr>
              <tr><td><code>/24</code></td><td>255.255.255.0</td><td>8</td><td>256</td><td>254</td></tr>
              <tr><td><code>/26</code></td><td>255.255.255.192</td><td>6</td><td>64</td><td>62</td></tr>
              <tr><td><code>/28</code></td><td>255.255.255.240</td><td>4</td><td>16</td><td>14</td></tr>
              <tr><td><code>/30</code></td><td>255.255.255.252</td><td>2</td><td>4</td><td>2 (point-to-point links)</td></tr>
              <tr><td><code>/32</code></td><td>255.255.255.255</td><td>0</td><td>1</td><td>0 (single host route)</td></tr>
            </tbody>
          </table>
        </div>
      `
    },
    {
      id: 'subnetting-by-hand',
      title: 'Subnetting by Hand & VLSM',
      priority: false,
      icon: '◆',
      bodyHTML: `
        <p><strong>The four-step method:</strong> (1) Determine bits to borrow · (2) Calculate new mask · (3) Calculate block size · (4) List subnet boundaries</p>
        <div class="code-block"><pre>Example: Divide 192.168.1.0/24 into 4 equal subnets
  4 subnets → 2² → borrow 2 bits → new prefix /26
  Block size: 2⁶ = 64

  Subnet 1:  192.168.1.0    → 192.168.1.63    (hosts: .1–.62)
  Subnet 2:  192.168.1.64   → 192.168.1.127   (hosts: .65–.126)
  Subnet 3:  192.168.1.128  → 192.168.1.191   (hosts: .129–.190)
  Subnet 4:  192.168.1.192  → 192.168.1.255   (hosts: .193–.254)</pre></div>
        <div class="info-box tip">
          <strong>Subnets must be powers of 2</strong>
          You cannot create exactly 3 equal subnets. Round up to the next power of 2 (4 subnets) and leave the unused one reserved for future growth.
        </div>
        <p><strong>VLSM (Variable Length Subnet Masking)</strong> — allows different subnets to have different prefix lengths. Golden rule: always allocate largest requirement first.</p>
        <div class="code-block"><pre>192.168.1.0/24 — VLSM example
  Finance (50 hosts) → /26 → 192.168.1.0    – 192.168.1.63   (62 usable)
  HR (25 hosts)      → /27 → 192.168.1.64   – 192.168.1.95   (30 usable)
  IT (10 hosts)      → /28 → 192.168.1.96   – 192.168.1.111  (14 usable)
  Router link (2)    → /30 → 192.168.1.112  – 192.168.1.115  (2 usable)
  Unused:                     192.168.1.116  – 192.168.1.255</pre></div>
      `
    },
    {
      id: 'supernetting',
      title: 'Supernetting & Route Summarisation',
      priority: false,
      icon: '◆',
      bodyHTML: `
        <p>Supernetting combines multiple contiguous networks into one summary route — the opposite of subnetting. The prefix gets <em>shorter</em>. Used to reduce routing table size.</p>
        <div class="code-block"><pre>Summarise: 192.168.0.0/24, 192.168.1.0/24, 192.168.2.0/24, 192.168.3.0/24

  In binary (third octet):
  192.168.0.0 → 000000|00  ─┐
  192.168.1.0 → 000000|01   │  common bits = 22
  192.168.2.0 → 000000|10   │  diverge at bit 23
  192.168.3.0 → 000000|11  ─┘

  Summary route: 192.168.0.0/22  (covers all four)

  Subnetting:    /24 → /26 /26 /26 /26  (prefix gets longer)
  Supernetting:  /24 /24 /24 /24 → /22  (prefix gets shorter)</pre></div>
        <div class="info-box note">
          <strong>Requirements for valid summarisation</strong>
          Networks must be contiguous · Number summarised must be a power of 2 · Summary address must fall on correct block boundary
        </div>

        <div class="rj45-practice" id="subnetRefCalc">
          <div class="rj45-practice-header">
            <h4>📊 Reference: Subnet Calculator</h4>
            <p>Type any IPv4 address and CIDR prefix — every value below updates instantly. No grading, just a lookup tool.</p>
          </div>
          <div class="subnet-fields subnet-ref-inputs">
            <div class="subnet-field">
              <label for="subnetRefIp">IP address</label>
              <input type="text" id="subnetRefIp" value="192.168.1.10" oninput="subnetRefCalculate()">
            </div>
            <div class="subnet-field subnet-field-prefix">
              <label for="subnetRefPrefix">CIDR prefix</label>
              <div class="subnet-prefix-wrap">
                <span>/</span>
                <input type="number" id="subnetRefPrefix" min="0" max="32" value="24" oninput="subnetRefCalculate()">
              </div>
            </div>
          </div>
          <div id="subnetRefOutput"></div>
        </div>

        <div class="rj45-practice" id="subnetCalcPractice">
          <div class="rj45-practice-header">
            <h4>🧮 Practice: Break Down a Subnet</h4>
            <p>You're given a host IP and a CIDR prefix. Work out the network address, broadcast address, usable host range, and usable host count.</p>
          </div>
          <div class="rj45-mode-buttons">
            <button type="button" class="btn btn-secondary btn-sm" id="subnetBtnEasy" onclick="subnetSetDifficulty('easy')">Easy (/25–/26)</button>
            <button type="button" class="btn btn-secondary btn-sm" id="subnetBtnHard" onclick="subnetSetDifficulty('hard')">Hard (/27–/30)</button>
          </div>
          <div id="subnetWorkspace">
            <p style="color:var(--text-muted); font-size:0.85rem;">Choose a difficulty above to begin.</p>
          </div>
        </div>
      `
    }
  ];

  // ============================================================
  // SECTION 4 CONTENT — Routing & Switching
  // ============================================================

  const SECTION_4_ACCORDIONS = [
    {
      id: 'routers-vs-switches',
      title: 'Routers vs Switches & ARP',
      priority: false,
      icon: '▣',
      bodyHTML: `
        <div class="table-wrapper">
          <table class="data-table">
            <thead><tr><th>Feature</th><th>Switch</th><th>Router</th></tr></thead>
            <tbody>
              <tr><td>OSI Layer</td><td>Layer 2 — Data link</td><td>Layer 3 — Network</td></tr>
              <tr><td>Address used</td><td>MAC address</td><td>IP address</td></tr>
              <tr><td>Scope</td><td>Within one subnet</td><td>Between different networks</td></tr>
              <tr><td>Primary function</td><td>Frame delivery to correct port</td><td>Packet forwarding to next hop</td></tr>
            </tbody>
          </table>
        </div>
        <p style="margin-top:0.75rem;"><strong>ARP (Address Resolution Protocol)</strong> — resolves IP addresses to MAC addresses within the same subnet. Device broadcasts: "Who has IP x.x.x.x?" Owner replies with MAC. Result stored in ARP cache.</p>
        <div class="code-block"><pre>At each router hop along the path:
    IP header:  UNCHANGED (src/dst IP stay the same end-to-end)
    MAC header: REPLACED   (new src/dst MAC for each hop)

  Your laptop → [MAC:laptop→R1] [IP:laptop→server]
  Router 1    → [MAC:R1→R2]     [IP:laptop→server]
  Router 2    → [MAC:R2→server] [IP:laptop→server]</pre></div>
      `
    },
    {
      id: 'routing-tables-nat',
      title: 'Routing Tables, Default Gateway & NAT/PAT',
      priority: false,
      icon: '▣',
      bodyHTML: `
        <p>A <strong>routing table</strong> maps destination networks to next hops. The router uses <strong>longest prefix match</strong> — the most specific matching entry always wins. <code>0.0.0.0/0</code> is the default route — catches all unmatched traffic.</p>
        <p>The <strong>default gateway</strong> is your machine's exit point — the router's private-side IP (typically <code>192.168.1.1</code> at home).</p>
        <p><strong>NAT (Network Address Translation)</strong> — translates private source IPs to the router's public IP as traffic leaves. Reverses on return. <strong>PAT (Port Address Translation)</strong> extends this by using unique port numbers to track multiple simultaneous connections — many private devices sharing one public IP.</p>
        <div class="code-block"><pre>PAT translation table:
  192.168.1.5:51234 → 41.90.64.22:51234  (laptop)
  192.168.1.7:51235 → 41.90.64.22:51235  (phone)
  192.168.1.9:51236 → 41.90.64.22:51236  (TV)
  All three share one public IP — differentiated by port number</pre></div>
        <p><strong>Dynamic routing protocols:</strong> RIP (small networks) · OSPF (enterprise) · BGP (internet backbone — holds the public internet together) · EIGRP (Cisco)</p>
      `
    }
  ];

  // ============================================================
  // SECTION 5 CONTENT — DNS
  // ============================================================

  const SECTION_5_ACCORDIONS = [
    {
      id: 'dns-hierarchy',
      title: 'DNS Hierarchy & Resolution',
      priority: false,
      icon: '◉',
      bodyHTML: `
        <p>DNS translates hostnames to IP addresses. Operates at layer 7 on port 53 (UDP for standard queries, TCP for large responses).</p>
        <p><strong>Hierarchy:</strong> Root servers (13 sets, labeled a–m) → TLD servers (.com, .org, .ke) → Authoritative name servers (hold actual records)</p>
        <div class="code-block"><pre>Full resolution for www.google.com:
  1. Browser cache      → cached? done
  2. OS cache/hosts     → cached? done (/etc/hosts or C:\\Windows\\...)
  3. Recursive resolver → cached? done (else queries on your behalf)
  4. Root server        → "Ask .com TLD at x.x.x.x"
  5. .com TLD server    → "Ask Google's nameserver at y.y.y.y"
  6. Authoritative NS   → "www.google.com = 142.250.185.68"
  7. Answer cached (TTL) and returned to your browser
  8. Browser connects to 142.250.185.68
  Typical completion: under 100 milliseconds</pre></div>
        <p><strong>TTL (Time To Live)</strong> — seconds a record can be cached. Low TTL = faster propagation but more queries. High TTL = less traffic but slower changes.</p>
      `
    },
    {
      id: 'dns-record-types',
      title: 'DNS Record Types & Tools',
      priority: false,
      icon: '◉',
      bodyHTML: `
        <div class="table-wrapper">
          <table class="data-table">
            <thead><tr><th>Record</th><th>Full name</th><th>Purpose</th></tr></thead>
            <tbody>
              <tr><td><code>A</code></td><td>Address</td><td>Maps hostname → IPv4 address</td></tr>
              <tr><td><code>AAAA</code></td><td>IPv6 Address</td><td>Maps hostname → IPv6 address</td></tr>
              <tr><td><code>CNAME</code></td><td>Canonical Name</td><td>Alias — maps one hostname to another hostname</td></tr>
              <tr><td><code>MX</code></td><td>Mail Exchange</td><td>Mail server for a domain. Contains hostname, not IP</td></tr>
              <tr><td><code>NS</code></td><td>Name Server</td><td>Identifies authoritative name servers for a domain</td></tr>
              <tr><td><code>TXT</code></td><td>Text</td><td>Arbitrary text — domain verification, SPF, security records</td></tr>
              <tr><td><code>PTR</code></td><td>Pointer</td><td>Reverse DNS — IP address → hostname</td></tr>
              <tr><td><code>SOA</code></td><td>Start of Authority</td><td>Admin info about a DNS zone</td></tr>
            </tbody>
          </table>
        </div>
        <div class="code-block" style="margin-top:0.75rem;"><pre class="code-comment"># dig — standard DNS query tool (Linux/macOS)</pre><pre><span class="code-keyword">dig</span> google.com              <span class="code-comment"># A record</span>
  <span class="code-keyword">dig</span> google.com MX           <span class="code-comment"># MX records</span>
  <span class="code-keyword">dig</span> @8.8.8.8 google.com     <span class="code-comment"># query Google's DNS server</span>
  <span class="code-keyword">dig</span> +short google.com       <span class="code-comment"># IP only</span>
  <span class="code-keyword">dig</span> +trace google.com       <span class="code-comment"># full resolution path</span>

  <span class="code-comment"># nslookup — works on Linux, macOS, Windows</span>
  <span class="code-keyword">nslookup</span> google.com
  <span class="code-keyword">nslookup</span> -type=MX google.com</pre></div>
      `
    }
  ];

  // ============================================================
  // SECTION 6 CONTENT — TCP & UDP
  // ============================================================

  const SECTION_6_ACCORDIONS = [
    {
      id: 'tcp-handshake',
      title: 'TCP — Three-Way Handshake & Flow Control',
      priority: false,
      icon: '⊞',
      bodyHTML: `
        <p>TCP is registered post — tracked, signed for, re-sent if lost. UDP is dropping a flyer through a letterbox — fast, no confirmation.</p>
        <div class="code-block"><pre>Three-way handshake (connection establishment):
  Client ──── SYN ──────────────► Server   "I want to connect"
  Client ◄─── SYN-ACK ─────────── Server   "Acknowledged — I am ready"
  Client ──── ACK ──────────────► Server   "Confirmed — connected"

  Four-way termination:
  Client ──── FIN ──────────────► Server
  Client ◄─── ACK ─────────────── Server
  Client ◄─── FIN ─────────────── Server
  Client ──── ACK ──────────────► Server</pre></div>
        <p><strong>Sliding window (flow control)</strong> — the receiver advertises a window size (max unacknowledged data it can buffer). Sender cannot exceed it. Window grows as receiver frees buffer space.</p>
        <p><strong>Congestion control</strong> — slow start (window doubles each round trip) → congestion avoidance (linear growth) → packet loss detected (window shrinks sharply).</p>
        <p><strong>Socket</strong> = IP address + port number. A connection is uniquely identified by the four-tuple: (src IP, src port, dst IP, dst port). Ephemeral ports: 49152–65535.</p>
      `
    },
    {
      id: 'tcp-vs-udp',
      title: 'TCP vs UDP — When to Use Which',
      priority: false,
      icon: '⊞',
      bodyHTML: `
        <div class="table-wrapper">
          <table class="data-table">
            <thead><tr><th>Feature</th><th>TCP</th><th>UDP</th></tr></thead>
            <tbody>
              <tr><td>Connection</td><td>Connection-oriented</td><td>Connectionless</td></tr>
              <tr><td>Reliability</td><td>Guaranteed delivery</td><td>No guarantees</td></tr>
              <tr><td>Ordering</td><td>In-order delivery</td><td>Not guaranteed</td></tr>
              <tr><td>Speed</td><td>Slower (overhead)</td><td>Faster (minimal overhead)</td></tr>
              <tr><td>Header size</td><td>20 bytes minimum</td><td>8 bytes</td></tr>
              <tr><td>Use cases</td><td>HTTP, FTP, SSH, email</td><td>DNS, VoIP, streaming, gaming, DHCP</td></tr>
            </tbody>
          </table>
        </div>
        <p style="margin-top:0.75rem;">DHCP uses UDP because the client has no IP address yet — it cannot establish a TCP connection.</p>
      `
    }
  ];

  // ============================================================
  // SECTION 7 CONTENT — Network Security
  // ============================================================

  const SECTION_7_ACCORDIONS = [
    {
      id: 'firewalls-acls',
      title: 'Firewalls, ACLs & Network Zones',
      priority: false,
      icon: '◐',
      bodyHTML: `
        <p><strong>Stateless firewall</strong> — examines each packet in isolation. Matches source IP, destination IP, protocol, port. Cannot understand connection context. Fast but limited.</p>
        <p><strong>Stateful firewall</strong> — tracks every active connection in a state table. Only allows inbound packets that correspond to established outbound connections. Standard in modern networks.</p>
        <p><strong>ACL (Access Control List)</strong> — ordered list of permit/deny rules on a router interface. Rules evaluated top-to-bottom. First match wins. Every ACL has an implicit deny all at the end — if no rule matches, traffic is silently dropped.</p>
        <div class="code-block"><pre>Internet (untrusted)
        │
        ▼ firewall
  ┌─────────────┐
  │     DMZ     │  ← web servers, mail servers, public DNS
  │(semi-trusted)│   publicly accessible, isolated from internal
  └─────────────┘
        │
        ▼ firewall
  ┌─────────────┐
  │  Internal   │  ← workstations, databases
  │  (trusted)  │   never directly accessible from internet
  └─────────────┘</pre></div>
      `
    },
    {
      id: 'network-attacks',
      title: 'Common Network Attacks & Wireshark',
      priority: false,
      icon: '◐',
      bodyHTML: `
        <div class="table-wrapper">
          <table class="data-table">
            <thead><tr><th>Attack</th><th>Layer</th><th>Mechanism</th><th>Effect</th></tr></thead>
            <tbody>
              <tr><td>DoS</td><td>Any</td><td>Traffic flood from one source</td><td>Service unavailable</td></tr>
              <tr><td>DDoS</td><td>Any</td><td>Flood from botnet</td><td>Service unavailable, hard to block</td></tr>
              <tr><td>SYN flood</td><td>L4</td><td>Incomplete TCP handshakes</td><td>Connection table exhausted</td></tr>
              <tr><td>IP spoofing</td><td>L3</td><td>Forged source IP</td><td>Origin disguised, access control bypass</td></tr>
              <tr><td>MITM</td><td>Any</td><td>Intercepts traffic between two parties</td><td>Data exposed or altered</td></tr>
              <tr><td>ARP spoofing</td><td>L2</td><td>Forged ARP replies poison caches</td><td>Traffic redirected to attacker</td></tr>
              <tr><td>Port scanning</td><td>L4</td><td>Probe port range for open services</td><td>Reconnaissance for further attack</td></tr>
            </tbody>
          </table>
        </div>
        <p style="margin-top:0.75rem;"><strong>Wireshark</strong> — packet analyser. Captures live traffic and displays each packet at every layer. Capture filters (before capture) and display filters (after capture).</p>
        <div class="code-block"><pre><span class="code-comment"># Common Wireshark display filters</span>
  http                         <span class="code-comment"># HTTP packets only</span>
  ip.addr == 192.168.1.5       <span class="code-comment"># traffic involving this IP</span>
  tcp.flags.syn == 1           <span class="code-comment"># SYN packets (detect SYN floods)</span>
  dns                          <span class="code-comment"># DNS queries and responses</span>
  arp                          <span class="code-comment"># ARP packets (detect spoofing)</span></pre></div>
      `
    }
  ];

  function renderAccordion(containerId, accordionData) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const html = accordionData.map(acc => `
      <div class="accordion open" data-searchable>
        <button type="button" class="accordion-header" onclick="toggleAccordion(this)" aria-expanded="true">
          <div class="accordion-title">
            <span class="acc-icon" aria-hidden="true">${acc.icon}</span>
            ${acc.title}
            ${acc.priority ? '<span class="tag priority">priority</span>' : ''}
          </div>
          <svg class="accordion-chevron" width="16" height="16" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"/>
          </svg>
        </button>
        <div class="accordion-body">
          ${acc.bodyHTML}
        </div>
      </div>
    `).join('');

    container.innerHTML = html;
  }

  // After rendering all sections, update nav badges
  function updateBadges() {
    if (typeof updateNavBadges === 'function') {
      updateNavBadges();
    }
  }

  // ============================================================
  // RJ45 CABLE PRACTICE WIDGET (Section 1 — RJ45 Cabling)
  // ============================================================
  const RJ45_COLORS = [
    { id: 'wo',  label: 'White/Orange', c1: '#ffffff', c2: '#e67e22' },
    { id: 'o',   label: 'Orange',       c1: '#e67e22', c2: '#e67e22' },
    { id: 'wg',  label: 'White/Green',  c1: '#ffffff', c2: '#27ae60' },
    { id: 'bl',  label: 'Blue',         c1: '#2980b9', c2: '#2980b9' },
    { id: 'wb',  label: 'White/Blue',   c1: '#ffffff', c2: '#2980b9' },
    { id: 'g',   label: 'Green',        c1: '#27ae60', c2: '#27ae60' },
    { id: 'wbr', label: 'White/Brown',  c1: '#ffffff', c2: '#8b5e3c' },
    { id: 'br',  label: 'Brown',        c1: '#8b5e3c', c2: '#8b5e3c' }
  ];
  const RJ45_COLOR_MAP = Object.fromEntries(RJ45_COLORS.map(c => [c.id, c]));
  const T568A_ORDER = ['wg', 'g', 'wo', 'bl', 'wb', 'o', 'wbr', 'br'];
  const T568B_ORDER = ['wo', 'o', 'wg', 'bl', 'wb', 'g', 'wbr', 'br'];

  const rj45State = {
    mode: null,          // 'straight' | 'cross'
    endA: [],            // array of 8 color ids (fixed, read-only)
    endB: [null, null, null, null, null, null, null, null], // user answers
    selectedPin: null,
    checked: false,
    results: null        // array of true/false per pin after check
  };

  function rj45CorrectEndB() {
    if (rj45State.mode === 'straight') {
      return [...rj45State.endA];
    }
    // crossover: pins 1<->3 and 2<->6 swap relative to End A, 4/5/7/8 unchanged
    const b = [...rj45State.endA];
    [b[0], b[2]] = [b[2], b[0]];
    [b[1], b[5]] = [b[5], b[1]];
    return b;
  }

  function rj45SwatchStyle(colorId) {
    const c = RJ45_COLOR_MAP[colorId];
    if (!c) return 'background: var(--bg-primary);';
    if (c.c1 === c.c2) return `background:${c.c1};`;
    return `background: linear-gradient(135deg, ${c.c1} 0%, ${c.c1} 49%, ${c.c2} 51%, ${c.c2} 100%);`;
  }

  window.rj45SetMode = function (mode) {
    rj45State.mode = mode;
    document.getElementById('rj45BtnStraight')?.classList.toggle('active-mode', mode === 'straight');
    document.getElementById('rj45BtnCross')?.classList.toggle('active-mode', mode === 'cross');
    rj45NewCable();
  };

  window.rj45NewCable = function () {
    if (!rj45State.mode) return;
    rj45State.endA = Math.random() < 0.5 ? [...T568A_ORDER] : [...T568B_ORDER];
    rj45State.endB = [null, null, null, null, null, null, null, null];
    rj45State.selectedPin = 0;
    rj45State.checked = false;
    rj45State.results = null;
    rj45RenderWorkspace();
  };

  window.rj45SelectPin = function (idx) {
    if (rj45State.checked) return;
    rj45State.selectedPin = idx;
    rj45RenderWorkspace();
  };

  window.rj45PickColor = function (colorId) {
    if (rj45State.selectedPin === null || rj45State.checked) return;
    rj45State.endB[rj45State.selectedPin] = colorId;
    // auto-advance to next empty pin
    const nextEmpty = rj45State.endB.findIndex(v => v === null);
    rj45State.selectedPin = nextEmpty === -1 ? null : nextEmpty;
    rj45RenderWorkspace();
  };

  window.rj45Check = function () {
    if (rj45State.endB.some(v => v === null)) {
      rj45State.checked = false;
      rj45State.results = 'incomplete';
      rj45RenderWorkspace();
      return;
    }
    const correct = rj45CorrectEndB();
    rj45State.results = rj45State.endB.map((v, i) => v === correct[i]);
    rj45State.checked = true;
    rj45RenderWorkspace();
  };

  function rj45RenderWorkspace() {
    const container = document.getElementById('rj45Workspace');
    if (!container) return;

    if (!rj45State.mode) {
      container.innerHTML = `<p style="color:var(--text-muted); font-size:0.85rem;">Choose a cable type above to begin.</p>`;
      return;
    }

    const correct = rj45State.checked ? rj45CorrectEndB() : null;

    const endARow = rj45State.endA.map((colorId, i) => `
      <div class="rj45-pin">
        <div class="rj45-pin-num">Pin ${i + 1}</div>
        <div class="rj45-swatch" style="${rj45SwatchStyle(colorId)}" title="${RJ45_COLOR_MAP[colorId].label}"></div>
      </div>
    `).join('');

    const endBRow = rj45State.endB.map((colorId, i) => {
      let stateClass = '';
      let hint = '';
      if (rj45State.checked && Array.isArray(rj45State.results)) {
        stateClass = rj45State.results[i] ? 'correct' : 'incorrect';
        if (!rj45State.results[i]) {
          hint = `<div class="rj45-hint">${RJ45_COLOR_MAP[correct[i]].label}</div>`;
        }
      } else if (rj45State.selectedPin === i) {
        stateClass = 'selected';
      }
      return `
        <div class="rj45-pin">
          <div class="rj45-pin-num">Pin ${i + 1}</div>
          <div class="rj45-swatch editable ${stateClass}"
               style="${colorId ? rj45SwatchStyle(colorId) : ''}"
               title="${colorId ? RJ45_COLOR_MAP[colorId].label : 'Empty'}"
               onclick="rj45SelectPin(${i})"></div>
          ${hint}
        </div>
      `;
    }).join('');

    const palette = RJ45_COLORS.map(c => `
      <button type="button" class="rj45-swatch-btn" style="${rj45SwatchStyle(c.id)}" title="${c.label}" aria-label="${c.label}" onclick="rj45PickColor('${c.id}')"></button>
    `).join('');

    let resultMsg = '';
    if (rj45State.results === 'incomplete') {
      resultMsg = `<div class="rj45-result fail">Fill in all 8 pins before checking.</div>`;
    } else if (Array.isArray(rj45State.results)) {
      const numCorrect = rj45State.results.filter(Boolean).length;
      if (numCorrect === 8) {
        resultMsg = `<div class="rj45-result pass">✓ 8/8 correct — that's a valid ${rj45State.mode === 'straight' ? 'straight-through' : 'crossover'} cable.</div>`;
      } else {
        resultMsg = `<div class="rj45-result fail">${numCorrect}/8 correct — check the pins outlined in red above (correct color shown underneath).</div>`;
      }
    }

    container.innerHTML = `
      <div class="rj45-end-label">End A (already crimped)</div>
      <div class="rj45-end-row">${endARow}</div>
      <div class="rj45-end-label">End B (your job)</div>
      <div class="rj45-end-row">${endBRow}</div>
      <div class="rj45-palette">${palette}</div>
      <div class="rj45-actions">
        <button type="button" class="btn btn-primary btn-sm" onclick="rj45Check()">Check</button>
        <button type="button" class="btn btn-secondary btn-sm" onclick="rj45NewCable()">New Cable</button>
      </div>
      ${resultMsg}
    `;
  }

  // ============================================================
  // RJ45 "ARRANGE THE STANDARD" WIDGET (bin → pins, from scratch)
  // ============================================================
  const rj45bState = {
    standard: null,       // 'A' | 'B'
    bin: [],              // remaining color ids not yet placed
    pins: [null, null, null, null, null, null, null, null],
    selectedPin: null,
    checked: false,
    results: null
  };

  function rj45bShuffledColors() {
    const ids = RJ45_COLORS.map(c => c.id);
    for (let i = ids.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [ids[i], ids[j]] = [ids[j], ids[i]];
    }
    return ids;
  }

  window.rj45bSetStandard = function (std) {
    rj45bState.standard = std;
    document.getElementById('rj45binBtnA')?.classList.toggle('active-mode', std === 'A');
    document.getElementById('rj45binBtnB')?.classList.toggle('active-mode', std === 'B');
    rj45bShuffle();
  };

  window.rj45bShuffle = function () {
    if (!rj45bState.standard) return;
    rj45bState.bin = rj45bShuffledColors();
    rj45bState.pins = [null, null, null, null, null, null, null, null];
    rj45bState.selectedPin = null;
    rj45bState.checked = false;
    rj45bState.results = null;
    rj45bRenderWorkspace();
  };

  window.rj45bSelectPin = function (idx) {
    if (rj45bState.checked) return;
    if (rj45bState.pins[idx] !== null) {
      // filled pin clicked -> return its wire to the bin
      rj45bState.bin.push(rj45bState.pins[idx]);
      rj45bState.pins[idx] = null;
      rj45bState.selectedPin = idx;
    } else {
      rj45bState.selectedPin = idx;
    }
    rj45bRenderWorkspace();
  };

  window.rj45bPickFromBin = function (colorId) {
    if (rj45bState.selectedPin === null || rj45bState.checked) return;
    const binIdx = rj45bState.bin.indexOf(colorId);
    if (binIdx === -1) return;
    rj45bState.bin.splice(binIdx, 1);
    rj45bState.pins[rj45bState.selectedPin] = colorId;
    const nextEmpty = rj45bState.pins.findIndex(v => v === null);
    rj45bState.selectedPin = nextEmpty === -1 ? null : nextEmpty;
    rj45bRenderWorkspace();
  };

  window.rj45bCheck = function () {
    if (rj45bState.pins.some(v => v === null)) {
      rj45bState.checked = false;
      rj45bState.results = 'incomplete';
      rj45bRenderWorkspace();
      return;
    }
    const correctOrder = rj45bState.standard === 'A' ? T568A_ORDER : T568B_ORDER;
    rj45bState.results = rj45bState.pins.map((v, i) => v === correctOrder[i]);
    rj45bState.checked = true;
    rj45bRenderWorkspace();
  };

  function rj45bRenderWorkspace() {
    const container = document.getElementById('rj45binWorkspace');
    if (!container) return;

    if (!rj45bState.standard) {
      container.innerHTML = `<p style="color:var(--text-muted); font-size:0.85rem;">Choose a standard above to begin.</p>`;
      return;
    }

    const correctOrder = rj45bState.checked ? (rj45bState.standard === 'A' ? T568A_ORDER : T568B_ORDER) : null;

    const pinsRow = rj45bState.pins.map((colorId, i) => {
      let stateClass = '';
      let hint = '';
      if (rj45bState.checked && Array.isArray(rj45bState.results)) {
        stateClass = rj45bState.results[i] ? 'correct' : 'incorrect';
        if (!rj45bState.results[i]) {
          hint = `<div class="rj45-hint">${RJ45_COLOR_MAP[correctOrder[i]].label}</div>`;
        }
      } else if (rj45bState.selectedPin === i) {
        stateClass = 'selected';
      }
      return `
        <div class="rj45-pin">
          <div class="rj45-pin-num">Pin ${i + 1}</div>
          <div class="rj45-swatch editable ${stateClass}"
               style="${colorId ? rj45SwatchStyle(colorId) : ''}"
               title="${colorId ? RJ45_COLOR_MAP[colorId].label : 'Empty'}"
               onclick="rj45bSelectPin(${i})"></div>
          ${hint}
        </div>
      `;
    }).join('');

    const binRow = rj45bState.bin.length
      ? rj45bState.bin.map(colorId => `
          <button type="button" class="rj45-swatch-btn" style="${rj45SwatchStyle(colorId)}" title="${RJ45_COLOR_MAP[colorId].label}" aria-label="${RJ45_COLOR_MAP[colorId].label}" onclick="rj45bPickFromBin('${colorId}')"></button>
        `).join('')
      : `<div class="rj45-bin-empty">All wires placed — hit Check.</div>`;

    let resultMsg = '';
    if (rj45bState.results === 'incomplete') {
      resultMsg = `<div class="rj45-result fail">Place all 8 wires before checking.</div>`;
    } else if (Array.isArray(rj45bState.results)) {
      const numCorrect = rj45bState.results.filter(Boolean).length;
      resultMsg = numCorrect === 8
        ? `<div class="rj45-result pass">✓ 8/8 correct — that's a valid T568${rj45bState.standard} arrangement.</div>`
        : `<div class="rj45-result fail">${numCorrect}/8 correct — check the pins outlined in red (correct color shown underneath).</div>`;
    }

    container.innerHTML = `
      <div class="rj45-end-label">Wire bin</div>
      <div class="rj45-palette">${binRow}</div>
      <div class="rj45-end-label">Pins (click one, then pick a wire from the bin)</div>
      <div class="rj45-end-row">${pinsRow}</div>
      <div class="rj45-actions">
        <button type="button" class="btn btn-primary btn-sm" onclick="rj45bCheck()">Check</button>
        <button type="button" class="btn btn-secondary btn-sm" onclick="rj45bShuffle()">Shuffle</button>
      </div>
      ${resultMsg}
    `;
  }

  // ============================================================
  // SUBNET REFERENCE CALCULATOR (live lookup, no grading)
  // ============================================================
  function subnetIsPrivate(ipInt) {
    const a = (ipInt >>> 24) & 255;
    const b = (ipInt >>> 16) & 255;
    if (a === 10) return true;
    if (a === 172 && b >= 16 && b <= 31) return true;
    if (a === 192 && b === 168) return true;
    if (a === 127) return true; // loopback, treated as non-public
    return false;
  }

window.subnetRefCalculate = function () {
    const output = document.getElementById('subnetRefOutput');
    if (!output) return;

    const ipStr = document.getElementById('subnetRefIp')?.value.trim();
    const prefixRaw = document.getElementById('subnetRefPrefix')?.value.trim();
    const prefix = Number(prefixRaw);

    const ipInt = subnetIpToInt(ipStr);
    if (ipInt === null || isNaN(prefix) || prefix < 0 || prefix > 32) {
      output.innerHTML = `<div class="rj45-result fail">Enter a valid IPv4 address (e.g. 192.168.1.10) and a prefix between 0 and 32.</div>`;
      return;
    }

    // Preserve which explanations were already open before re-rendering
    const rowKeys = ['ipType', 'cidr', 'mask', 'wildcard', 'network', 'broadcast', 'range', 'total', 'usable'];
    const openState = {};
    rowKeys.forEach(key => {
      const el = document.getElementById(`subnetExpl-${key}`);
      if (el) openState[key] = el.open;
    });

    const hostBits = 32 - prefix;
    const maskInt = hostBits === 32 ? 0 : (0xFFFFFFFF << hostBits) >>> 0;
    const wildcardInt = (~maskInt) >>> 0;
    const networkInt = (ipInt & maskInt) >>> 0;
    const broadcastInt = (networkInt | wildcardInt) >>> 0;
    const totalAddresses = Math.pow(2, hostBits);

    let firstUsable, lastUsable, usableHosts;
    if (prefix === 32) {
      firstUsable = networkInt;
      lastUsable = networkInt;
      usableHosts = 1;
    } else if (prefix === 31) {
      firstUsable = networkInt;
      lastUsable = broadcastInt;
      usableHosts = 2;
    } else {
      firstUsable = networkInt + 1;
      lastUsable = broadcastInt - 1;
      usableHosts = totalAddresses - 2;
    }

    const isPrivate = subnetIsPrivate(ipInt);

    // ---- Binary helpers for the explanations ----
    function bin8(n) { return n.toString(2).padStart(8, '0'); }
    function binIp(int) {
      return [(int >>> 24) & 255, (int >>> 16) & 255, (int >>> 8) & 255, int & 255].map(bin8).join('.');
    }
    function groupBinary(bitString) {
      return [bitString.slice(0, 8), bitString.slice(8, 16), bitString.slice(16, 24), bitString.slice(24, 32)].join('.');
    }

    const ipBin = binIp(ipInt);
    const maskBitString = '1'.repeat(prefix) + '0'.repeat(hostBits);
    const wildcardBitString = maskBitString.split('').map(b => b === '1' ? '0' : '1').join('');
    const maskBin = groupBinary(maskBitString);
    const wildcardBin = groupBinary(wildcardBitString);
    const networkBin = binIp(networkInt);
    const broadcastBin = binIp(broadcastInt);

    const rows = [
      {
        key: 'ipType',
        label: 'IP address',
        value: `<code>${ipStr}</code> <span class="tag ${isPrivate ? 'both' : 'tcp'}">${isPrivate ? 'Private' : 'Public'}</span>`,
        explanation: `
          <p>Private ranges are reserved for internal networks and never routed on the public internet: <code>10.0.0.0/8</code>, <code>172.16.0.0/12</code>, <code>192.168.0.0/16</code> (plus <code>127.0.0.0/8</code> for loopback).</p>
          <p>Your address <code>${ipStr}</code> ${isPrivate ? 'falls inside one of these private blocks' : 'falls outside all private ranges'}, so it's classified as <strong>${isPrivate ? 'Private' : 'Public'}</strong>.</p>
        `
      },
      {
        key: 'cidr',
        label: 'CIDR notation',
        value: `<code>${subnetIntToIp(networkInt)}/${prefix}</code>`,
        explanation: `
          <p>CIDR notation pairs a network address with a prefix length — the count of leading bits (out of 32) that belong to the network portion.</p>
          <p>Here, <code>/${prefix}</code> means the first ${prefix} bits are network bits and the remaining ${hostBits} bits are host bits.</p>
        `
      },
      {
        key: 'mask',
        label: 'Subnet mask',
        value: `<code>${subnetIntToIp(maskInt)}</code>`,
        explanation: `
          <p>A /${prefix} mask sets the first ${prefix} bits to 1 (network) and the remaining ${hostBits} bits to 0 (host):</p>
          <div class="code-block"><pre>${maskBin}</pre></div>
          <p>Converted back to decimal per octet: <code>${subnetIntToIp(maskInt)}</code></p>
        `
      },
      {
        key: 'wildcard',
        label: 'Wildcard mask',
        value: `<code>${subnetIntToIp(wildcardInt)}</code>`,
        explanation: `
          <p>The wildcard mask is the bitwise NOT (inverse) of the subnet mask — every 1 becomes 0 and every 0 becomes 1:</p>
          <div class="code-block"><pre>Subnet mask:   ${maskBin}
Wildcard mask: ${wildcardBin}</pre></div>
          <p>In decimal: <code>${subnetIntToIp(wildcardInt)}</code>. Used in Cisco ACLs and OSPF to specify which bits to match.</p>
        `
      },
      {
        key: 'network',
        label: 'Network address',
        value: `<code>${subnetIntToIp(networkInt)}</code>`,
        explanation: `
          <p>The network address is found with a bitwise AND between your IP address and the subnet mask — every host bit gets zeroed out:</p>
          <div class="code-block"><pre>IP:      ${ipBin}
Mask:    ${maskBin}
AND  →   ${networkBin}</pre></div>
          <p>Result: <code>${subnetIntToIp(networkInt)}</code></p>
        `
      },
      {
        key: 'broadcast',
        label: 'Broadcast address',
        value: `<code>${subnetIntToIp(broadcastInt)}</code>`,
        explanation: `
          <p>The broadcast address is found with a bitwise OR between the network address and the wildcard mask — every host bit gets set to 1:</p>
          <div class="code-block"><pre>Network:   ${networkBin}
Wildcard:  ${wildcardBin}
OR    →    ${broadcastBin}</pre></div>
          <p>Result: <code>${subnetIntToIp(broadcastInt)}</code></p>
        `
      },
      {
        key: 'range',
        label: 'Usable host range',
        value: `<code>${subnetIntToIp(firstUsable)} – ${subnetIntToIp(lastUsable)}</code>`,
        explanation: prefix === 32 ? `
          <p>A /32 prefix has zero host bits — it identifies exactly one address, itself. There's no separate network/broadcast/usable split; <code>${subnetIntToIp(networkInt)}</code> is the host route.</p>
        ` : prefix === 31 ? `
          <p>A /31 prefix (RFC 3021) is reserved for point-to-point links. Both addresses in the block are usable — there's no dedicated broadcast address here:</p>
          <div class="code-block"><pre>First usable: ${subnetIntToIp(firstUsable)}
Last usable:  ${subnetIntToIp(lastUsable)}</pre></div>
        ` : `
          <p>The network and broadcast addresses can't be assigned to hosts, so the usable range is everything in between:</p>
          <div class="code-block"><pre>First usable = Network + 1   = ${subnetIntToIp(networkInt)} + 1 = ${subnetIntToIp(firstUsable)}
Last usable  = Broadcast − 1 = ${subnetIntToIp(broadcastInt)} − 1 = ${subnetIntToIp(lastUsable)}</pre></div>
        `
      },
      {
        key: 'total',
        label: 'Total addresses',
        value: `<code>${totalAddresses.toLocaleString()}</code>`,
        explanation: `
          <p>Total addresses in a block equal 2 raised to the number of host bits. With a /${prefix} prefix, ${hostBits} bits remain for hosts:</p>
          <div class="code-block"><pre>2^${hostBits} = ${totalAddresses.toLocaleString()}</pre></div>
        `
      },
      {
        key: 'usable',
        label: 'Usable hosts',
        value: `<code>${usableHosts.toLocaleString()}</code>`,
        explanation: prefix >= 31 ? `
          <p>${prefix === 32
            ? 'A /32 has no host bits at all, so the single address itself counts as 1 usable host route.'
            : 'A /31 has no room to reserve either address, so RFC 3021 makes both addresses usable — total and usable are equal here.'}</p>
        ` : `
          <p>Usable hosts = total addresses minus the 2 reserved for network and broadcast:</p>
          <div class="code-block"><pre>${totalAddresses.toLocaleString()} − 2 = ${usableHosts.toLocaleString()}</pre></div>
        `
      }
    ];

    const rowsHTML = rows.map(r => `
      <tr>
        <td>${r.label}</td>
        <td>
          ${r.value}
          <details class="details-box subnet-details" id="subnetExpl-${r.key}" ${openState[r.key] ? 'open' : ''}>
            <summary>How is this calculated?</summary>
            <div class="details-answer-body">${r.explanation}</div>
          </details>
        </td>
      </tr>
    `).join('');

    output.innerHTML = `
      <div class="table-wrapper" style="margin-top:0.75rem;">
        <table class="data-table">
          <tbody>${rowsHTML}</tbody>
        </table>
      </div>
    `;
  };

  // ============================================================
  // SUBNET CALCULATOR PRACTICE WIDGET (Section 3 — Subnetting)
  // ============================================================
  const subnetState = {
    difficulty: null,     // 'easy' | 'hard'
    givenIp: null,        // string, the host IP shown to the user
    prefix: null,
    networkInt: null,
    broadcastInt: null,
    firstUsableInt: null,
    lastUsableInt: null,
    usableHosts: null,
    checked: false,
    results: null          // { network: bool, broadcast: bool, first: bool, last: bool, count: bool }
  };

  function subnetIpToInt(ip) {
    const parts = ip.split('.').map(Number);
    if (parts.length !== 4 || parts.some(p => isNaN(p) || p < 0 || p > 255)) return null;
    return ((parts[0] << 24) | (parts[1] << 16) | (parts[2] << 8) | parts[3]) >>> 0;
  }

  function subnetIntToIp(int) {
    return [(int >>> 24) & 255, (int >>> 16) & 255, (int >>> 8) & 255, int & 255].join('.');
  }

  function subnetRandomBaseInt() {
    // Pick a realistic private-range base (10.x, 172.16.x, 192.168.x)
    const templates = [
      () => [10, Math.floor(Math.random() * 256), Math.floor(Math.random() * 256), 0],
      () => [172, 16 + Math.floor(Math.random() * 16), Math.floor(Math.random() * 256), 0],
      () => [192, 168, Math.floor(Math.random() * 256), 0]
    ];
    const octets = templates[Math.floor(Math.random() * templates.length)]();
    return ((octets[0] << 24) | (octets[1] << 16) | (octets[2] << 8) | octets[3]) >>> 0;
  }

  window.subnetSetDifficulty = function (level) {
    subnetState.difficulty = level;
    document.getElementById('subnetBtnEasy')?.classList.toggle('active-mode', level === 'easy');
    document.getElementById('subnetBtnHard')?.classList.toggle('active-mode', level === 'hard');
    subnetNewProblem();
  };

  window.subnetNewProblem = function () {
    if (!subnetState.difficulty) return;

    const prefixPool = subnetState.difficulty === 'easy' ? [25, 26] : [27, 28, 29, 30];
    const prefix = prefixPool[Math.floor(Math.random() * prefixPool.length)];
    const hostBits = 32 - prefix;
    const blockSize = Math.pow(2, hostBits);

    const rawBase = subnetRandomBaseInt();
    const mask = hostBits === 0 ? 0xFFFFFFFF : (~(blockSize - 1)) >>> 0;
    const networkInt = (rawBase & mask) >>> 0;
    const broadcastInt = (networkInt + blockSize - 1) >>> 0;
    const firstUsableInt = networkInt + 1;
    const lastUsableInt = broadcastInt - 1;
    const usableHosts = blockSize - 2;

    // Pick a random valid host address inside this block to present to the user
    const hostOffset = 1 + Math.floor(Math.random() * (blockSize - 2));
    const givenIp = subnetIntToIp(networkInt + hostOffset);

    subnetState.givenIp = givenIp;
    subnetState.prefix = prefix;
    subnetState.networkInt = networkInt;
    subnetState.broadcastInt = broadcastInt;
    subnetState.firstUsableInt = firstUsableInt;
    subnetState.lastUsableInt = lastUsableInt;
    subnetState.usableHosts = usableHosts;
    subnetState.checked = false;
    subnetState.results = null;

    subnetRenderWorkspace();
  };

  window.subnetCheck = function () {
    const network = document.getElementById('subnetInputNetwork')?.value.trim();
    const broadcast = document.getElementById('subnetInputBroadcast')?.value.trim();
    const first = document.getElementById('subnetInputFirst')?.value.trim();
    const last = document.getElementById('subnetInputLast')?.value.trim();
    const count = document.getElementById('subnetInputCount')?.value.trim();

    if (!network || !broadcast || !first || !last || !count) {
      subnetState.results = 'incomplete';
      subnetRenderWorkspace();
      return;
    }

    subnetState.results = {
      network: subnetIpToInt(network) === subnetState.networkInt,
      broadcast: subnetIpToInt(broadcast) === subnetState.broadcastInt,
      first: subnetIpToInt(first) === subnetState.firstUsableInt,
      last: subnetIpToInt(last) === subnetState.lastUsableInt,
      count: Number(count) === subnetState.usableHosts
    };
    subnetState.checked = true;
    subnetRenderWorkspace();
  };

  function subnetFieldClass(key) {
    if (!subnetState.checked || subnetState.results === 'incomplete' || !subnetState.results) return '';
    return subnetState.results[key] ? 'correct' : 'incorrect';
  }

  function subnetFieldHint(key, correctInt) {
    if (subnetState.checked && subnetState.results !== 'incomplete' && subnetState.results && !subnetState.results[key]) {
      return `<div class="rj45-hint">${subnetIntToIp(correctInt)}</div>`;
    }
    return '';
  }

  function subnetRenderWorkspace() {
    const container = document.getElementById('subnetWorkspace');
    if (!container) return;

    if (!subnetState.difficulty) {
      container.innerHTML = `<p style="color:var(--text-muted); font-size:0.85rem;">Choose a difficulty above to begin.</p>`;
      return;
    }

    let resultMsg = '';
    if (subnetState.results === 'incomplete') {
      resultMsg = `<div class="rj45-result fail">Fill in all 5 fields before checking.</div>`;
    } else if (subnetState.results && typeof subnetState.results === 'object') {
      const numCorrect = Object.values(subnetState.results).filter(Boolean).length;
      resultMsg = numCorrect === 5
        ? `<div class="rj45-result pass">✓ 5/5 correct.</div>`
        : `<div class="rj45-result fail">${numCorrect}/5 correct — check the fields outlined in red (correct answer shown underneath).</div>`;
    }

    const countHint = (subnetState.checked && subnetState.results !== 'incomplete' && subnetState.results && !subnetState.results.count)
      ? `<div class="rj45-hint">${subnetState.usableHosts}</div>` : '';

    container.innerHTML = `
      <div class="subnet-given">Given host: <strong>${subnetState.givenIp}/${subnetState.prefix}</strong></div>
      <div class="subnet-fields">
        <div class="subnet-field">
          <label for="subnetInputNetwork">Network address</label>
          <input type="text" id="subnetInputNetwork" placeholder="e.g. 172.16.54.0" class="${subnetFieldClass('network')}" ${subnetState.checked ? 'disabled' : ''}>
          ${subnetFieldHint('network', subnetState.networkInt)}
        </div>
        <div class="subnet-field">
          <label for="subnetInputBroadcast">Broadcast address</label>
          <input type="text" id="subnetInputBroadcast" placeholder="e.g. 172.16.54.31" class="${subnetFieldClass('broadcast')}" ${subnetState.checked ? 'disabled' : ''}>
          ${subnetFieldHint('broadcast', subnetState.broadcastInt)}
        </div>
        <div class="subnet-field">
          <label for="subnetInputFirst">First usable host</label>
          <input type="text" id="subnetInputFirst" placeholder="e.g. 172.16.54.1" class="${subnetFieldClass('first')}" ${subnetState.checked ? 'disabled' : ''}>
          ${subnetFieldHint('first', subnetState.firstUsableInt)}
        </div>
        <div class="subnet-field">
          <label for="subnetInputLast">Last usable host</label>
          <input type="text" id="subnetInputLast" placeholder="e.g. 172.16.54.30" class="${subnetFieldClass('last')}" ${subnetState.checked ? 'disabled' : ''}>
          ${subnetFieldHint('last', subnetState.lastUsableInt)}
        </div>
        <div class="subnet-field">
          <label for="subnetInputCount">Usable host count</label>
          <input type="text" id="subnetInputCount" placeholder="e.g. 30" class="${subnetFieldClass('count')}" ${subnetState.checked ? 'disabled' : ''}>
          ${countHint}
        </div>
      </div>
      <div class="rj45-actions">
        <button type="button" class="btn btn-primary btn-sm" onclick="subnetCheck()" ${subnetState.checked ? 'disabled' : ''}>Check</button>
        <button type="button" class="btn btn-secondary btn-sm" onclick="subnetNewProblem()">New Problem</button>
      </div>
      ${resultMsg}
    `;
  }

  // Render sections
  renderNetworkingOverview();
  renderAccordion('js-section1-container', SECTION_1_ACCORDIONS);
  renderAccordion('js-section2-container', SECTION_2_ACCORDIONS);
  renderAccordion('js-section3-container', SECTION_3_ACCORDIONS);
  subnetRefCalculate();
  renderAccordion('js-section4-container', SECTION_4_ACCORDIONS);
  renderAccordion('js-section5-container', SECTION_5_ACCORDIONS);
  renderAccordion('js-section6-container', SECTION_6_ACCORDIONS);
  renderAccordion('js-section7-container', SECTION_7_ACCORDIONS);

// ============================================================
// RE-ATTACH COPY BUTTONS AFTER DYNAMIC RENDER
// ============================================================

// After all renderAccordion calls
setTimeout(() => {
  if (typeof initCopyButtons === 'function') {
    const added = initCopyButtons();
    console.log(`✅ Copy buttons re-attached: ${added} added`);
  } else {
    console.warn('⚠️ initCopyButtons not available');
  }
}, 150);

  // Update badges after a small delay to let DOM settle
  setTimeout(updateBadges, 100);

  function initFlashcardScroller() {
    const scroller = document.getElementById('flashcardScroller');
    const prevBtn = document.getElementById('flashcardPrev');
    const nextBtn = document.getElementById('flashcardNext');
    const indicator = document.getElementById('flashcardIndicator');
    
    if (!scroller) return;
    
    function updateIndicator() {
      if (!indicator) return;
      const scrollLeft = scroller.scrollLeft;
      const scrollWidth = scroller.scrollWidth;
      const clientWidth = scroller.clientWidth;
      const maxScroll = scrollWidth - clientWidth;
      const scrollPercent = maxScroll > 0 ? scrollLeft / maxScroll : 0;
      
      const cards = document.querySelectorAll('.flashcard');
      const totalCards = cards.length;
      const activeIndex = Math.round(scrollPercent * (totalCards - 1));
      
      const dots = indicator.querySelectorAll('.scroll-dot');
      dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === activeIndex);
      });
    }
    
    // Create indicator dots
    if (indicator) {
      const totalCards = FLASHCARDS.length;
      indicator.innerHTML = Array.from({ length: totalCards }, (_, i) => 
        `<span class="scroll-dot" data-index="${i}"></span>`
      ).join('');
      
      indicator.querySelectorAll('.scroll-dot').forEach(dot => {
        dot.addEventListener('click', (e) => {
          const index = parseInt(e.target.dataset.index);
          const cardWidth = document.querySelector('.flashcard')?.offsetWidth || 260;
          const gap = 16; // gap between cards
          const scrollPosition = index * (cardWidth + gap);
          scroller.scrollTo({ left: scrollPosition, behavior: 'smooth' });
        });
      });
    }
    
    // Scroll buttons
    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        scroller.scrollBy({ left: -280, behavior: 'smooth' });
      });
    }
    
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        scroller.scrollBy({ left: 280, behavior: 'smooth' });
      });
    }
    
    // Update indicator on scroll
    scroller.addEventListener('scroll', () => {
      requestAnimationFrame(updateIndicator);
    });
    
    // Initial indicator update
    setTimeout(updateIndicator, 100);
    
    // Update on window resize
    window.addEventListener('resize', () => {
      setTimeout(updateIndicator, 100);
    });
  }
  
  const QUIZ_SETS = {
    // ============================================================
    // SET 1: Core Networking Fundamentals (14 questions)
    // ============================================================
    1: [
      {
        q: "Which OSI layer is responsible for logical addressing and routing packets across multiple networks?",
        options: ["Layer 2 — Data Link", "Layer 3 — Network", "Layer 4 — Transport", "Layer 7 — Application"],
        correct: 1,
        explain: "Layer 3 (Network) handles IP addressing and routing. Routers operate at this layer, reading the IP header to forward packets hop-by-hop."
      },
      {
        q: "What is the correct formula for calculating the number of usable host addresses in a subnet?",
        options: ["2^(host bits)", "2^(host bits) − 1", "2^(host bits) − 2", "2^(prefix length) − 2"],
        correct: 2,
        explain: "2^(host bits) − 2. You subtract 2 to exclude the network address (host bits all zeros) and broadcast address (host bits all ones)."
      },
      {
        q: "A device on your network has the IP address 169.254.45.12. What does this indicate?",
        options: [
          "The device has a valid DHCP-assigned address",
          "The device cannot reach a DHCP server and has self-assigned an APIPA address",
          "The device is using a loopback address",
          "The device is on the 172.16.0.0/12 private range"
        ],
        correct: 1,
        explain: "169.254.0.0/16 is the APIPA range. Seeing 169.254.x.x means DHCP failed — the device is isolated from the broader network."
      },
      {
        q: "You need to divide 192.168.1.0/24 into 8 equal subnets. What is the new prefix length?",
        options: ["/25", "/26", "/27", "/28"],
        correct: 2,
        explain: "8 subnets = 2³, so you borrow 3 bits. /24 + 3 = /27. Each /27 subnet has a block size of 32 and 30 usable hosts."
      },
      {
        q: "During the TCP three-way handshake, what is the correct sequence of messages?",
        options: ["ACK → SYN → SYN-ACK", "SYN → SYN-ACK → ACK", "SYN → ACK → SYN-ACK", "SYN-ACK → SYN → ACK"],
        correct: 1,
        explain: "SYN (client initiates) → SYN-ACK (server acknowledges) → ACK (client confirms). Connection is now established."
      },
      {
        q: "Which statement correctly describes the difference between a stateless and stateful firewall?",
        options: [
          "A stateless firewall is slower because it checks every packet twice",
          "A stateful firewall tracks the connection state table and only allows inbound packets matching established outbound connections",
          "A stateless firewall tracks MAC addresses; stateful tracks IP addresses",
          "A stateful firewall only works at layer 2"
        ],
        correct: 1,
        explain: "A stateful firewall maintains a state table of active connections. Inbound packets that don't match an established outbound connection are dropped."
      },
      {
        q: "What is the purpose of ARP (Address Resolution Protocol)?",
        options: [
          "It translates domain names to IP addresses",
          "It assigns IP addresses to devices on a network",
          "It resolves IP addresses to MAC addresses within the same subnet",
          "It encrypts traffic between two devices"
        ],
        correct: 2,
        explain: "ARP resolves an IP address to its corresponding MAC address on the local subnet. The device broadcasts 'Who has IP x.x.x.x?' and the owner replies with its MAC address."
      },
      {
        q: "A DNS query for 'www.example.com' reaches a recursive resolver that has no cached answer. What is the correct order of servers it contacts?",
        options: [
          "Authoritative NS → TLD server → Root server",
          "TLD server → Root server → Authoritative NS",
          "Root server → TLD server → Authoritative NS",
          "Root server → Authoritative NS → TLD server"
        ],
        correct: 2,
        explain: "Root server → TLD server → Authoritative NS. The root tells the resolver which TLD handles .com, the TLD tells it which NS handles example.com, and the NS returns the IP."
      },
      {
        q: "In T568B wiring, what colour wire is connected to pin 1?",
        options: ["White/Green", "Green", "White/Orange", "Orange"],
        correct: 2,
        explain: "T568B: Pin 1 = White/Orange. The mnemonic O·G·B·G·B (2-1-2-1-2) tells you Orange pair leads, so pin 1 = White/Orange, pin 2 = Orange."
      },
      {
        q: "You are summarising four networks: 10.0.0.0/24, 10.0.1.0/24, 10.0.2.0/24, 10.0.3.0/24. What is the correct summary route?",
        options: ["10.0.0.0/22", "10.0.0.0/23", "10.0.0.0/24", "10.0.0.0/20"],
        correct: 0,
        explain: "The four networks share the first 22 bits — they diverge at bit 23. Summary = 10.0.0.0/22. Block size 2^10 = 1024 addresses, range 10.0.0.0 → 10.0.3.255 ✓"
      },
      // 🔴 NEW CARDS
      {
        q: "Which of the following is a private IP address range?",
        options: ["8.8.8.8", "192.168.1.1", "169.254.0.1", "1.1.1.1"],
        correct: 1,
        explain: "192.168.0.0/16 is one of the RFC 1918 private ranges. 8.8.8.8 and 1.1.1.1 are public DNS servers. 169.254.0.0/16 is APIPA (link-local)."
      },
      {
        q: "What is the loopback address in IPv4?",
        options: ["0.0.0.0", "127.0.0.1", "255.255.255.255", "169.254.0.1"],
        correct: 1,
        explain: "127.0.0.1 is the loopback address. Traffic sent here never leaves the host and is used for testing the local network stack."
      },
      {
        q: "What port does SSH use by default?",
        options: ["20", "21", "22", "23"],
        correct: 2,
        explain: "SSH uses port 22 by default. Port 20/21 are FTP, port 23 is Telnet."
      },
      {
        q: "What is the primary difference between a hub and a switch?",
        options: [
          "Hub is faster than switch",
          "Hub broadcasts to all ports; switch forwards based on MAC address",
          "Hub works at Layer 3; switch works at Layer 2",
          "Hub is more secure than switch"
        ],
        correct: 1,
        explain: "A hub broadcasts all traffic to every port (obsolete). A switch intelligently forwards frames based on MAC addresses, reducing collisions and improving performance."
      }
    ],

    // ============================================================
    // SET 2: Subnetting, IPv6 & Advanced IP (14 questions)
    // ============================================================
    2: [
      {
        q: "What is the subnet mask for a /27 CIDR block?",
        options: ["255.255.255.192", "255.255.255.224", "255.255.255.240", "255.255.255.248"],
        correct: 1,
        explain: "/27 = 27 network bits, 5 host bits. The last octet has 3 bits for network (128+64+32=224) → 255.255.255.224."
      },
      {
        q: "How many usable host addresses are in a /29 subnet?",
        options: ["8", "6", "4", "2"],
        correct: 1,
        explain: "/29 = 32-29=3 host bits → 2³ = 8 total addresses. Subtract network and broadcast → 6 usable hosts."
      },
      {
        q: "Which of the following is a valid VLSM subnet of 192.168.0.0/24?",
        options: ["192.168.0.0/23", "192.168.0.0/25", "192.168.1.0/24", "192.168.0.0/16"],
        correct: 1,
        explain: "VLSM subnets must be smaller than the parent. /25 fits inside /24. /23 is larger, 192.168.1.0/24 is a different network, /16 is much larger."
      },
      {
        q: "You have a network 10.0.0.0/16. What is the broadcast address for subnet 10.0.64.0/18?",
        options: ["10.0.127.255", "10.0.63.255", "10.0.95.255", "10.0.64.255"],
        correct: 0,
        explain: "/18 block size = 2^(32-18)=2^14=16384 addresses. Starting at 10.0.64.0, broadcast = start + block size -1 = 10.0.64.0 + 16383 = 10.0.127.255."
      },
      {
        q: "What is the CIDR notation for a subnet mask of 255.255.240.0?",
        options: ["/20", "/21", "/22", "/24"],
        correct: 0,
        explain: "255.255.240.0 = 11111111.11111111.11110000.00000000 → 20 consecutive 1s → /20."
      },
      {
        q: "Which of the following is the network address of 172.16.50.25/20?",
        options: ["172.16.0.0", "172.16.32.0", "172.16.48.0", "172.16.64.0"],
        correct: 2,
        explain: "/20 = 255.255.240.0. The third octet increments by 16. 50 falls in the 48-63 range → network address 172.16.48.0."
      },
      {
        q: "You need 50 subnets from 10.0.0.0/8. How many bits must you borrow?",
        options: ["4", "5", "6", "7"],
        correct: 2,
        explain: "2^5 = 32 (not enough), 2^6 = 64 (≥50). Borrow 6 bits → new prefix /14 (8+6)."
      },
      {
        q: "What is the maximum number of hosts on a /30 subnet?",
        options: ["2", "4", "6", "8"],
        correct: 0,
        explain: "/30 leaves 2 host bits → 2² = 4 total addresses, minus 2 (network & broadcast) = 2 usable hosts. Commonly used for point-to-point links."
      },
      {
        q: "Supernetting 192.168.0.0/24 and 192.168.1.0/24 results in which summary route?",
        options: ["192.168.0.0/22", "192.168.0.0/23", "192.168.0.0/24", "192.168.1.0/23"],
        correct: 1,
        explain: "The first 23 bits are common. 192.168.0.0/23 covers 192.168.0.0–192.168.1.255."
      },
      {
        q: "A /26 subnet has how many total addresses?",
        options: ["32", "64", "128", "256"],
        correct: 1,
        explain: "/26 = 32-26=6 host bits → 2^6 = 64 total addresses."
      },
      // 🔴 NEW CARDS
      {
        q: "What is the IPv6 link-local address prefix?",
        options: ["FE80::/10", "FC00::/7", "2000::/3", "FF00::/8"],
        correct: 0,
        explain: "FE80::/10 is the link-local prefix. These addresses are used for communication on the same subnet and are not routed."
      },
      {
        q: "What is the IPv6 unique local address prefix?",
        options: ["FE80::/10", "FC00::/7", "2000::/3", "FF00::/8"],
        correct: 1,
        explain: "FC00::/7 is the unique local prefix (similar to IPv4 private addresses). They are routable within a site but not on the internet."
      },
      {
        q: "What is the IPv6 global unicast address prefix?",
        options: ["FE80::/10", "FC00::/7", "2000::/3", "FF00::/8"],
        correct: 2,
        explain: "2000::/3 is the global unicast prefix — these addresses are routable on the public internet."
      },
      {
        q: "What is the DHCP process commonly referred to as?",
        options: ["SYN-ACK", "DORA", "Three-way handshake", "DNS resolution"],
        correct: 1,
        explain: "DORA = Discover, Offer, Request, Acknowledge. The client broadcasts a Discover, the server Offers an IP, the client Requests it, and the server Acknowledges."
      }
    ],

    // ============================================================
    // SET 3: Security, Protocols & Troubleshooting (14 questions)
    // ============================================================
    3: [
      {
        q: "What type of attack sends TCP SYN packets but never completes the handshake?",
        options: ["DDoS", "SYN flood", "ARP spoofing", "IP spoofing"],
        correct: 1,
        explain: "SYN flood attack sends many SYN packets without ACK, exhausting the target's connection table and preventing legitimate connections."
      },
      {
        q: "Which firewall type tracks the state of active connections?",
        options: ["Stateless firewall", "Stateful firewall", "Packet filter", "Proxy firewall"],
        correct: 1,
        explain: "Stateful firewalls maintain a state table and only allow return traffic that matches an established outbound connection."
      },
      {
        q: "What does the acronym DMZ stand for in networking?",
        options: ["Demilitarized Zone", "Dynamic Management Zone", "Data Mirroring Zone", "Domain Name Zone"],
        correct: 0,
        explain: "Demilitarized Zone — a network segment between the internet and internal network that hosts public‑facing servers."
      },
      {
        q: "Which protocol is used to resolve an IP address to a MAC address?",
        options: ["DNS", "DHCP", "ARP", "ICMP"],
        correct: 2,
        explain: "ARP (Address Resolution Protocol) resolves IPv4 addresses to MAC addresses within a local subnet."
      },
      {
        q: "What is the primary purpose of a VLAN?",
        options: [
          "Increase bandwidth",
          "Segment a physical network into logical broadcast domains",
          "Encrypt traffic between switches",
          "Provide redundancy"
        ],
        correct: 1,
        explain: "VLANs logically separate networks on the same physical switch, improving security and reducing broadcast traffic."
      },
      {
        q: "Which of the following is a common defense against SYN flood attacks?",
        options: ["SYN cookies", "ARP inspection", "DMZ", "Stateful firewall"],
        correct: 0,
        explain: "SYN cookies encode connection information in the initial SYN-ACK, avoiding resource allocation until the handshake completes."
      },
      {
        q: "What type of attack involves an attacker intercepting communication between two parties?",
        options: ["DoS", "Man-in-the-Middle (MITM)", "Port scanning", "IP spoofing"],
        correct: 1,
        explain: "MITM attacks secretly relay or alter communication between two parties who believe they are talking directly."
      },
      {
        q: "Which command would you use to scan for open ports on a remote host?",
        options: ["ping", "traceroute", "nmap", "ifconfig"],
        correct: 2,
        explain: "nmap (Network Mapper) is a port scanner used to discover open ports and services on a network."
      },
      {
        q: "What is the function of the FCS (Frame Check Sequence) in an Ethernet frame?",
        options: ["Encryption", "Error detection", "Addressing", "Flow control"],
        correct: 1,
        explain: "FCS is a checksum trailer at layer 2. The receiver recalculates it; a mismatch means the frame was corrupted in transit."
      },
      {
        q: "Which protocol is used by the `ping` command to test reachability?",
        options: ["TCP", "UDP", "ICMP", "ARP"],
        correct: 2,
        explain: "ICMP (Internet Control Message Protocol) Echo Request and Echo Reply are used by ping."
      },
      // 🔴 NEW CARDS
      {
        q: "What does ICMP Type 3 indicate?",
        options: ["Echo Reply", "Destination Unreachable", "Time Exceeded", "Redirect"],
        correct: 1,
        explain: "ICMP Type 3 is Destination Unreachable. It indicates a network, host, port, or protocol is unreachable."
      },
      {
        q: "What command shows the route packets take to reach a destination?",
        options: ["ping", "traceroute", "dig", "nmap"],
        correct: 1,
        explain: "traceroute shows every router hop a packet takes to reach the destination. tracepath is a no-root alternative."
      },
      {
        q: "Which wireless security standard is considered the most secure for home networks?",
        options: ["WEP", "WPA", "WPA2", "WPA3"],
        correct: 3,
        explain: "WPA3 is the most current and secure standard. WEP is obsolete, WPA is outdated, and WPA2 is still common but WPA3 offers better protection."
      },
      {
        q: "What is the purpose of the `netstat` or `ss` command?",
        options: [
          "Show routing table",
          "Show active network connections and listening ports",
          "Test connectivity to a host",
          "Resolve hostnames"
        ],
        correct: 1,
        explain: "ss (or the older netstat) shows active network connections, listening ports, and socket statistics. ss -tuln is the most common usage."
      }
    ]
  };

  // After defining QUIZ_SETS
  let currentSet = 1;
  let currentQuestions = QUIZ_SETS[currentSet];
  let userAnswers = new Array(currentQuestions.length).fill(null);

  // Function to load a specific set (to be called by set selector buttons)
  function loadQuizSet(setNumber) {
    if (!QUIZ_SETS[setNumber]) return;
    currentSet = setNumber;
    currentQuestions = QUIZ_SETS[currentSet];
    userAnswers = new Array(currentQuestions.length).fill(null);
    renderQuiz();
    //Reset progress
    document.getElementById('quizProgressFill').style.width = '0%';
    document.getElementById('quizScore').classList.remove('show');
    document.getElementById('quizFeedback').style.display = 'none';
  }

  function renderQuiz() {
    const body = document.getElementById('quizBody');
    if (!body) return;
    body.innerHTML = currentQuestions.map((q, qi) => `
      <div class="quiz-question" id="qq${qi}" style="margin-bottom:1.75rem;padding-bottom:1.75rem;border-bottom:1px solid var(--border-color);">
        <span class="q-number">Question ${qi + 1} of ${currentQuestions.length}</span>
        ${q.q}
        <div class="quiz-options" style="margin-top:0.875rem;">
          ${q.options.map((opt, oi) => `
            <label class="quiz-option" id="opt${qi}_${oi}" onclick="selectOption(${qi}, ${oi})">
              <input type="radio" name="q${qi}" value="${oi}" />
              <span>${opt}</span>
            </label>
          `).join('')}
        </div>
      </div>
    `).join('');
  }

  window.selectOption = function(qi, oi) {
    userAnswers[qi] = oi;
    document.querySelectorAll(`#qq${qi} .quiz-option`).forEach((opt, i) => {
      opt.classList.toggle('selected', i === oi);
    });
    const answered = userAnswers.filter(a => a !== null).length;
    const fill = document.getElementById('quizProgressFill');
    if (fill) fill.style.width = (answered / currentQuestions.length * 100) + '%';
  };

  window.submitQuiz = function() {
    const answered = userAnswers.filter(a => a !== null).length;
    if (answered < currentQuestions.length) {
      const fb = document.getElementById('quizFeedback');
      fb.className = 'quiz-feedback incorrect';
      fb.textContent = `Please answer all ${currentQuestions.length} questions before submitting. (${answered}/${currentQuestions.length} answered)`;
      fb.style.display = 'block';
      return;
    }

    let score = 0;
    currentQuestions.forEach((q, qi) => {
      const isCorrect = userAnswers[qi] === q.correct;
      if (isCorrect) score++;
      document.querySelectorAll(`#qq${qi} .quiz-option`).forEach((opt, oi) => {
        if (oi === q.correct) opt.classList.add('correct');
        else if (oi === userAnswers[qi] && !isCorrect) opt.classList.add('incorrect');
        opt.style.pointerEvents = 'none';
      });
      const qEl = document.getElementById(`qq${qi}`);
      if (!qEl.querySelector('.quiz-explain')) {
        const explain = document.createElement('div');
        explain.className = 'info-box ' + (isCorrect ? 'tip' : 'warning') + ' quiz-explain';
        explain.style.marginTop = '0.75rem';
        explain.innerHTML = `<strong>${isCorrect ? 'Correct' : 'Incorrect'}</strong> ${q.explain}`;
        qEl.appendChild(explain);
      }
    });

    const totalQuestions = currentQuestions.length;
    if (score === totalQuestions) {
      // Mark this specific set as passed
      localStorage.setItem(`networking-quiz-set-${currentSet}-passed`, 'true');
      
      // Check if ANY set is mastered to update the floating ring
      if (isQuizMastered()) {
        localStorage.setItem('networking-quiz-passed', 'true');
      }
    }
    
    // Force update of the floating ring
    if (window.updateFloatingRing) window.updateFloatingRing();

    document.getElementById('quizFeedback').style.display = 'none';
    document.getElementById('quizScore').classList.add('show');
    document.getElementById('scoreNum').textContent = `${score}/${currentQuestions.length}`;

    const pct = Math.round(score / currentQuestions.length * 100);
    const previousBest = localStorage.getItem('gc-score-networking') || 0;
    if (pct > previousBest) {
      localStorage.setItem('gc-score-networking', pct);
      if (typeof window.updateGlobalProgress === 'function') {
        window.updateGlobalProgress();
      }
    }

    let msg = '';
    if (pct === 100) msg = 'Perfect score — outstanding command of networking fundamentals.';
    else if (pct >= 80) msg = 'Strong result — revisit any incorrect questions and you are ready to move on.';
    else if (pct >= 60) msg = 'Good foundation — review the sections where you made errors before advancing.';
    else msg = 'Keep studying — revisit the accordion sections above, then try again.';
    document.getElementById('scoreMsg').textContent = `${pct}% — ${msg}`;
    document.getElementById('quizScore').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  };

  window.resetQuiz = function() {
    userAnswers = new Array(currentQuestions.length).fill(null);
    document.getElementById('quizScore').classList.remove('show');
    const fb = document.getElementById('quizFeedback');
    fb.className = 'quiz-feedback';
    fb.style.display = 'none';
    const fill = document.getElementById('quizProgressFill');
    if (fill) fill.style.width = '0%';
    renderQuiz();

    // Only reset mastery for the CURRENT set (not all sets)
    localStorage.removeItem(`networking-quiz-set-${currentSet}-passed`);

    // If no sets are mastered anymore, remove the overall flag
    if (!isQuizMastered()) {
      localStorage.removeItem('networking-quiz-passed');
    }
    
    if (window.updateFloatingRing) window.updateFloatingRing();
  };

  document.getElementById('set1Btn')?.addEventListener('click', () => loadQuizSet(1));
  document.getElementById('set2Btn')?.addEventListener('click', () => loadQuizSet(2));
  document.getElementById('set3Btn')?.addEventListener('click', () => loadQuizSet(3));
  document.getElementById('resetAllBtn')?.addEventListener('click', resetAllQuizProgress);

  function isQuizMastered() {
    // Check if any of the three quiz sets have been passed
    for (let i = 1; i <= 3; i++) {
      if (localStorage.getItem(`networking-quiz-set-${i}-passed`) === 'true') {
        return true;
      }
    }
    return false;
  }

  function resetAllQuizProgress() {
    for (let i = 1; i <= 3; i++) {
      localStorage.removeItem(`networking-quiz-set-${i}-passed`);
    }
    localStorage.removeItem('networking-quiz-passed');
    if (window.updateFloatingRing) window.updateFloatingRing();
  }
  // ============================================

  // Floating progress ring for pillar sections + modal popup
  function initFloatingProgressRing() {
    const checkboxes = document.querySelectorAll('.section-checkbox');
    if (!checkboxes.length) return;

    // Create floating ring element
    const floatingDiv = document.createElement('div');
    floatingDiv.className = 'floating-progress-ring';
    floatingDiv.innerHTML = `
      <svg class="floating-ring-svg" viewBox="0 0 60 60">
        <circle class="floating-ring-bg" cx="30" cy="30" r="26" fill="none" stroke-width="4"/>
        <circle class="floating-ring-fill" cx="30" cy="30" r="26" fill="none" stroke-width="4" stroke-linecap="round"/>
      </svg>
      <div class="floating-ring-percent" id="floatingPercent">0%</div>
    `;
    document.body.appendChild(floatingDiv);

    const ringFill = floatingDiv.querySelector('.floating-ring-fill');
    const percentSpan = floatingDiv.querySelector('#floatingPercent');
    const circumference = 2 * Math.PI * 26; // ≈ 163.36

        // Load saved states and update ring
    function updateFloatingRing() {
      const checkboxes = document.querySelectorAll('.section-checkbox');
      const total = checkboxes.length + 1; // +1 for quiz
      let checked = 0;

      // Count section checkboxes
      checkboxes.forEach(cb => {
        const section = cb.dataset.section;
        const saved = localStorage.getItem(`networking-section-${section}`);
        const isChecked = saved === 'true' ? true : false;
        cb.checked = isChecked;
        if (isChecked) checked++;
      });

      // Count quiz if passed
      const quizPassed = localStorage.getItem('networking-quiz-passed') === 'true';
      if (quizPassed) checked++;

      const percent = Math.round((checked / total) * 100);
      const offset = circumference - (percent / 100) * circumference;
      ringFill.style.strokeDasharray = circumference;
      ringFill.style.strokeDashoffset = offset;
      percentSpan.textContent = `${percent}%`;

      // Show congratulations toast when 100% is reached (only once)
      if (percent === 100) {
        const alreadyCongratulated = localStorage.getItem('networking-100-congrats-shown');
        if (!alreadyCongratulated) {
          // Mark as shown so it doesn't repeat
          localStorage.setItem('networking-100-congrats-shown', 'true');
          
          // Create and show toast
          const toast = document.createElement('div');
          toast.className = 'coming-soon-toast';
          toast.innerHTML = '🎉 CONGRATULATIONS! 🎉<br>You have mastered Networking Fundamentals!';
          toast.style.background = 'linear-gradient(135deg, var(--accent-secondary), var(--accent-primary))';
          toast.style.padding = '12px 24px';
          toast.style.fontSize = '0.9rem';
          toast.style.fontWeight = 'bold';
          toast.style.textAlign = 'center';
          toast.style.borderRadius = '40px';
          document.body.appendChild(toast);
          
          // Auto-remove after 4 seconds
          setTimeout(() => {
            toast.style.opacity = '0';
            setTimeout(() => toast.remove(), 300);
          }, 4000);
        }
      }
    }

    // Expose globally so quiz submission can call it
    window.updateFloatingRing = updateFloatingRing;

    // Save checkbox state
    function saveCheckboxState() {
      checkboxes.forEach(cb => {
        cb.addEventListener('change', () => {
          localStorage.setItem(`networking-section-${cb.dataset.section}`, cb.checked);
          updateFloatingRing();
        });
      });
    }

    // ----- MODAL FUNCTIONALITY -----
    function openProgressModal() {
      const modal = document.getElementById('progressModal');
      if (!modal) return;
      
      // Open modal
      modal.style.display = 'flex';
      
      // Switch to Pillar Details tab (tab 3)
      const tabButton = document.querySelector('.tab-button[data-tab="tab3"]');
      if (tabButton) tabButton.click();
      
      // Load Networking pillar details (using globally exposed function)
      if (typeof window.showPillarDetail === 'function') {
        window.showPillarDetail('networking', 'phase1');
      }
    }

    function closeProgressModal() {
      const modal = document.getElementById('progressModal');
      if (modal) modal.style.display = 'none';
    }

    function getSectionTitle(sectionNum) {
      const titles = {
        '1': 'Section 1 — Internet Structure',
        '2': 'Section 2 — IP Addressing',
        '3': 'Section 3 — Subnetting & CIDR',
        '4': 'Section 4 — Routing & Switching',
        '5': 'Section 5 — DNS',
        '6': 'Section 6 — TCP & UDP',
        '7': 'Section 7 — Network Security'
      };
      return titles[sectionNum] || `Section ${sectionNum}`;
    }

    floatingDiv.addEventListener('click', (e) => {
      e.stopPropagation();
      if (typeof window.openModalToPillarDetails === 'function') {
        window.openModalToPillarDetails('networking', 'phase1');
      } else {
        openProgressModal(); // fallback
      }
    });

    // Global close handlers
    document.addEventListener('click', (e) => {
      const modal = document.getElementById('progressModal');
      if (modal && modal.style.display === 'flex') {
        if (!modal.querySelector('.progress-modal-content').contains(e.target)) {
          closeProgressModal();
        }
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeProgressModal();
      }
    });

    const closeBtn = document.getElementById('closeModalBtn');
    if (closeBtn) closeBtn.addEventListener('click', closeProgressModal);
    
    const overviewBtn = document.getElementById('modalOverviewBtn');
    if (overviewBtn) {
      overviewBtn.addEventListener('click', () => {
        const overview = document.getElementById('overview');
        if (overview) overview.scrollIntoView({ behavior: 'smooth' });
        closeProgressModal();
      });
    }

    // Reset pillar progress button
    const resetBtn = document.getElementById('modalResetBtn');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        if (confirm('⚠️ Are you sure? This will reset ALL section checkboxes and quiz mastery for Networking. This cannot be undone.')) {
          // Reset all 7 section checkboxes
          for (let i = 1; i <= 7; i++) {
            localStorage.removeItem(`networking-section-${i}`);
          }
          // Reset quiz mastery
          localStorage.removeItem('networking-quiz-passed');
          // Reset congratulations flag so it can show again
          localStorage.removeItem('networking-100-congrats-shown');

          // Reset quiz mastery
          localStorage.removeItem('networking-quiz-passed');
          localStorage.removeItem('networking-100-congrats-shown');
          
          // Update actual checkboxes on the page
          const checkboxes = document.querySelectorAll('.section-checkbox');
          checkboxes.forEach(cb => {
            cb.checked = false;
          });
          
          // Update floating ring
          if (window.updateFloatingRing) window.updateFloatingRing();
          
          // Close modal
          closeProgressModal();
          
          // Show confirmation toast
          const toast = document.createElement('div');
          toast.className = 'coming-soon-toast';
          toast.textContent = '✅ Networking progress has been reset';
          toast.style.background = 'var(--accent-secondary)';
          document.body.appendChild(toast);
          setTimeout(() => {
            toast.style.opacity = '0';
            setTimeout(() => toast.remove(), 300);
          }, 2000);
        }
      });
    }

    updateFloatingRing();
    saveCheckboxState();
  }

  // Run on networking page only
  if (document.querySelector('.section-checkbox')) {
    initFloatingProgressRing();
  }

  // Render flashcards and quiz when the page loads
  renderFlashcards();
  renderQuiz();

  // ----- IMAGE LIGHTBOX (Popup + Zoom) with consistent scaling -----
  function initImageLightbox() {
    const lightbox = document.getElementById('imageLightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const container = document.getElementById('lightboxContainer');
    const closeBtn = document.getElementById('lightboxClose');
    const zoomInBtn = document.getElementById('lightboxZoomIn');
    const zoomOutBtn = document.getElementById('lightboxZoomOut');
    const resetBtn = document.getElementById('lightboxReset');
    const zoomInfo = document.getElementById('lightboxZoomInfo');
    
    if (!lightbox) return;
    
    let currentScale = 1;
    let panX = 0, panY = 0;
    let isDragging = false;
    let startX = 0, startY = 0;
    let isFitToScreen = true;
    
    // Add Fit to Screen button
    const controlsDiv = document.querySelector('.lightbox-controls');
    let fitBtn = document.getElementById('lightboxFitBtn');
    if (!fitBtn && controlsDiv) {
      fitBtn = document.createElement('button');
      fitBtn.id = 'lightboxFitBtn';
      fitBtn.className = 'fit-to-screen-btn';
      fitBtn.innerHTML = '📐 Fit';
      fitBtn.title = 'Toggle fit to screen / actual size';
      controlsDiv.insertBefore(fitBtn, zoomInBtn);
    }
    
    function updateTransform() {
      if (isFitToScreen) {
        lightboxImg.classList.remove('zoomed');
        lightboxImg.style.transform = '';
        lightboxImg.style.maxWidth = '90vw';
        lightboxImg.style.maxHeight = '85vh';
        container.style.overflow = 'hidden';
        if (fitBtn) fitBtn.classList.add('active');
      } else {
        lightboxImg.classList.add('zoomed');
        lightboxImg.style.transform = `translate(${panX}px, ${panY}px) scale(${currentScale})`;
        lightboxImg.style.maxWidth = 'none';
        lightboxImg.style.maxHeight = 'none';
        container.style.overflow = 'auto';
        if (fitBtn) fitBtn.classList.remove('active');
      }
      if (!isFitToScreen) {
        zoomInfo.textContent = `${Math.round(currentScale * 100)}%`;
      } else {
        zoomInfo.textContent = 'Fit to screen';
      }
    }
    
    function resetView() {
      currentScale = 1;
      panX = 0;
      panY = 0;
      isFitToScreen = true;
      updateTransform();
      container.style.cursor = 'default';
    }
    
    function toggleFitMode() {
      isFitToScreen = !isFitToScreen;
      if (isFitToScreen) {
        resetView();
      } else {
        lightboxImg.classList.add('zoomed');
        currentScale = 1;
        panX = 0;
        panY = 0;
        updateTransform();
        container.style.cursor = 'grab';
      }
    }
    
    function zoomIn() {
      if (isFitToScreen) toggleFitMode();
      currentScale = Math.min(currentScale + 0.25, 4);
      updateTransform();
    }
    
    function zoomOut() {
      if (isFitToScreen) toggleFitMode();
      currentScale = Math.max(currentScale - 0.25, 0.5);
      updateTransform();
    }
    
    // Open lightbox on image click
    document.querySelectorAll('.accordion-body img, .overview-content img').forEach(img => {
      img.style.cursor = 'pointer';
      img.addEventListener('click', (e) => {
        e.stopPropagation();
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt || 'Enlarged image';
        resetView();
        lightbox.classList.add('active');
      });
    });
    
    // Close lightbox
    function closeLightbox() {
      lightbox.classList.remove('active');
      resetView();
    }
    
    closeBtn.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });
    
    zoomInBtn.addEventListener('click', zoomIn);
    zoomOutBtn.addEventListener('click', zoomOut);
    resetBtn.addEventListener('click', resetView);
    if (fitBtn) fitBtn.addEventListener('click', toggleFitMode);
    
    // Panning with mouse
    container.addEventListener('mousedown', (e) => {
      if (isFitToScreen || currentScale <= 1) return;
      isDragging = true;
      startX = e.clientX - panX;
      startY = e.clientY - panY;
      container.style.cursor = 'grabbing';
      e.preventDefault();
    });
    
    window.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      panX = e.clientX - startX;
      panY = e.clientY - startY;
      updateTransform();
    });
    
    window.addEventListener('mouseup', () => {
      isDragging = false;
      container.style.cursor = (!isFitToScreen && currentScale > 1) ? 'grab' : 'default';
    });
    
    // Touch events for mobile
    container.addEventListener('touchstart', (e) => {
      if (isFitToScreen || currentScale <= 1) return;
      isDragging = true;
      const touch = e.touches[0];
      startX = touch.clientX - panX;
      startY = touch.clientY - panY;
      e.preventDefault();
    });
    
    window.addEventListener('touchmove', (e) => {
      if (!isDragging) return;
      const touch = e.touches[0];
      panX = touch.clientX - startX;
      panY = touch.clientY - panY;
      updateTransform();
      e.preventDefault();
    });
    
    window.addEventListener('touchend', () => {
      isDragging = false;
    });
    
    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
      if (!lightbox.classList.contains('active')) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === '+' || e.key === '=') zoomIn();
      if (e.key === '-' || e.key === '_') zoomOut();
      if (e.key === '0') resetView();
      if (e.key === 'f' || e.key === 'F') toggleFitMode();
    });
  }
  
  initImageLightbox();

  // At the bottom of your DOMContentLoaded listener, add:
  if (typeof updateNavBadges === 'function') {
    // Initial update after a short delay
    setTimeout(updateNavBadges, 200);
  }

  // Inside DOMContentLoaded, after all renders:
  console.log('✅ Flashcard track:', document.getElementById('flashcardTrack')?.children?.length || 0);
  console.log('✅ Quiz body:', document.getElementById('quizBody')?.children?.length || 0);
  console.log('✅ Section 1 container:', document.getElementById('js-section1-container')?.children?.length || 0);

  const SECTION_PBX_ACCORDIONS = [
    // ============================================================
    // TOPIC 1: FUNDAMENTALS & CONCEPTS
    // ============================================================
    {
      id: 'pbx-what-is',
      title: 'What is a PBX?',
      priority: true,
      icon: '📞',
      bodyHTML: `
        <p>A <strong>Private Branch Exchange (PBX)</strong> is a private telephone network used within an organization. It acts as a central switching system that:</p>
        <ul style="padding-left:1.25rem;margin-bottom:0.75rem;">
          <li>Connects all internal extensions (employees' phones) to each other</li>
          <li>Shares a limited number of external phone lines (trunks) for outside calls</li>
          <li>Provides features like call routing, voicemail, auto-attendants, call forwarding, and conferencing</li>
        </ul>
        <div class="table-wrapper">
          <table class="data-table">
            <thead><tr><th>Aspect</th><th>Before PBX</th><th>With PBX</th></tr></thead>
            <tbody>
              <tr><td>Phone lines</td><td>Every phone needs its own outside line</td><td>Many phones share a few external lines</td></tr>
              <tr><td>Cost</td><td>Expensive (per-line charges)</td><td>Cost-effective (shared trunks)</td></tr>
              <tr><td>Internal calls</td><td>Go through the public network</td><td>Stay internal — free</td></tr>
              <tr><td>Features</td><td>Limited to basic calling</td><td>Rich (voicemail, conferencing, IVR, call recording)</td></tr>
            </tbody>
          </table>
        </div>
        <div class="info-box note"><strong>📌 Modern context:</strong> Today's PBX systems are increasingly <strong>IP‑based</strong> (VoIP), running on the same network infrastructure as your data. This makes PBX part of the networking stack.</div>
      `
    },
    {
      id: 'pbx-history-evolution',
      title: 'History & Evolution of PBX',
      priority: false,
      icon: '📜',
      bodyHTML: `
        <div class="table-wrapper">
          <table class="data-table">
            <thead><tr><th>Era</th><th>Technology</th><th>Characteristics</th></tr></thead>
            <tbody>
              <tr><td><strong>1970s–1990s</strong></td><td>TDM PBX (Circuit‑Switched)</td><td>Dedicated hardware, analogue/digital lines, ISDN PRI, limited features, expensive</td></tr>
              <tr><td><strong>2000s–2010s</strong></td><td>IP‑PBX (On‑Premises)</td><td>Runs on standard servers, uses SIP trunks, more flexible, lower cost</td></tr>
              <tr><td><strong>2015–Present</strong></td><td>Cloud PBX (Hosted/UCaaS)</td><td>No hardware on-site, subscription model, auto‑scaling, rich features</td></tr>
              <tr><td><strong>2020+</strong></td><td>Hybrid PBX</td><td>Combination of on‑premises and cloud — best of both worlds</td></tr>
            </tbody>
          </table>
        </div>
        <div class="info-box tip"><strong>💡 Key milestone:</strong> The transition from circuit‑switched (dedicated path for each call) to packet‑switched (voice as data packets over IP networks) fundamentally changed PBX architecture.</div>
      `
    },
    {
      id: 'pbx-terminology',
      title: 'PBX Terminology — Key Terms',
      priority: false,
      icon: '📖',
      bodyHTML: `
        <div class="table-wrapper">
          <table class="data-table">
            <thead><tr><th>Term</th><th>Definition</th></tr></thead>
            <tbody>
              <tr><td><strong>Extension</strong></td><td>Internal phone number (e.g., 101, 102, 103)</td></tr>
              <tr><td><strong>Trunk</strong></td><td>Connection to the outside world (PSTN or SIP)</td></tr>
              <tr><td><strong>CO Line</strong></td><td>Central Office line — direct connection to telephone exchange</td></tr>
              <tr><td><strong>DID / DDI</strong></td><td>Direct Inward Dialling — external number that routes directly to an extension</td></tr>
              <tr><td><strong>Hunt Group</strong></td><td>Group of extensions that ring in sequence or simultaneously</td></tr>
              <tr><td><strong>Auto‑Attendant</strong></td><td>Automated greeting that routes calls (Press 1 for Sales...)</td></tr>
              <tr><td><strong>IVR</strong></td><td>Interactive Voice Response — more advanced auto‑attendant with database integration</td></tr>
              <tr><td><strong>PSTN</strong></td><td>Public Switched Telephone Network — the traditional phone network</td></tr>
              <tr><td><strong>VoIP</strong></td><td>Voice over IP — voice transmitted over IP networks</td></tr>
              <tr><td><strong>SIP</strong></td><td>Session Initiation Protocol — signalling protocol for VoIP calls</td></tr>
            </tbody>
          </table>
        </div>
      `
    },
    {
      id: 'pbx-call-flow',
      title: 'How a Call Works (Flow)',
      priority: false,
      icon: '🔄',
      bodyHTML: `
        <h4 style="font-size:0.95rem;font-weight:600;margin:0 0 0.25rem 0;">Internal call (Extension to Extension)</h4>
        <div class="code-block"><pre>1. User picks up phone, dials extension (e.g., 102)
  2. PBX checks: extension 102 exists and is registered
  3. PBX sends SIP INVITE to extension 102
  4. Phone 102 rings, user answers (200 OK)
  5. RTP audio flows between phones (or via PBX)
  6. Either party hangs up (BYE)</pre></div>
        <h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;">External call (Outbound)</h4>
        <div class="code-block"><pre>1. User picks up phone, dials outside number
  2. PBX checks outbound routing rules
  3. PBX selects an available trunk (SIP or ISDN)
  4. PBX sends call to trunk provider
  5. Provider routes call to PSTN/destination
  6. RTP audio flows between phone and provider
  7. Call ends (BYE)</pre></div>
        <h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;">External call (Inbound)</h4>
        <div class="code-block"><pre>1. Incoming call arrives on a trunk/DID
  2. PBX matches inbound route (DDI mapping)
  3. PBX routes to extension, auto‑attendant, or queue
  4. Answer and establish audio path</pre></div>
      `
    },
    {
      id: 'pbx-pstn-vs-voip',
      title: 'PSTN vs VoIP',
      priority: false,
      icon: '📡',
      bodyHTML: `
        <div class="table-wrapper">
          <table class="data-table">
            <thead><tr><th>Aspect</th><th>PSTN</th><th>VoIP</th></tr></thead>
            <tbody>
              <tr><td><strong>Technology</strong></td><td>Circuit‑switched</td><td>Packet‑switched</td></tr>
              <tr><td><strong>Medium</strong></td><td>Copper lines, fibre</td><td>IP network</td></tr>
              <tr><td><strong>Billing</strong></td><td>Per‑minute, distance‑based</td><td>Usually flat rate</td></tr>
              <tr><td><strong>Features</strong></td><td>Basic (caller ID, voicemail)</td><td>Rich (video, conferencing, integration)</td></tr>
              <tr><td><strong>Quality</strong></td><td>Consistent, toll‑grade</td><td>Variable (depends on network)</td></tr>
              <tr><td><strong>Cost</strong></td><td>High</td><td>Low</td></tr>
            </tbody>
          </table>
        </div>
      `
    },
    {
      id: 'pbx-codecs',
      title: 'Codecs Explained',
      priority: false,
      icon: '🎵',
      bodyHTML: `
        <p>Codecs compress audio for transmission over IP networks.</p>
        <div class="table-wrapper">
          <table class="data-table">
            <thead><tr><th>Codec</th><th>Bandwidth (per call)</th><th>Quality</th><th>Use Case</th></tr></thead>
            <tbody>
              <tr><td><strong>G.711</strong></td><td>~87 kbps</td><td>Toll‑grade (excellent)</td><td>Default, high‑bandwidth</td></tr>
              <tr><td><strong>G.722</strong></td><td>~64 kbps</td><td>Wideband (HD)</td><td>HD voice, good bandwidth</td></tr>
              <tr><td><strong>G.729</strong></td><td>~31 kbps</td><td>Good (compressed)</td><td>Low‑bandwidth, international</td></tr>
              <tr><td><strong>Opus</strong></td><td>32–64 kbps</td><td>Excellent (adaptive)</td><td>Modern, adaptive</td></tr>
              <tr><td><strong>AMR‑WB</strong></td><td>12–23 kbps</td><td>Good</td><td>Mobile networks</td></tr>
            </tbody>
          </table>
        </div>
        <div class="info-box tip"><strong>💡 Rule of thumb:</strong> Estimate <strong>100 kbps per concurrent call</strong> for G.711, <strong>40 kbps</strong> for G.729 (including overhead).</div>
      `
    },

    // ============================================================
    // TOPIC 2: PBX ARCHITECTURE & COMPONENTS
    // ============================================================
    {
      id: 'pbx-core-components',
      title: 'PBX Core Components',
      priority: false,
      icon: '🏗️',
      bodyHTML: `
        <div class="table-wrapper">
          <table class="data-table">
            <thead><tr><th>Component</th><th>Function</th></tr></thead>
            <tbody>
              <tr><td><strong>Call Processor</strong></td><td>The "brain" — handles call setup, routing, and tear‑down</td></tr>
              <tr><td><strong>Switching Matrix</strong></td><td>Connects calls between extensions and trunks</td></tr>
              <tr><td><strong>Interface Cards</strong></td><td>Connect to outside lines (ISDN, analogue, PRI)</td></tr>
              <tr><td><strong>Telephony Database</strong></td><td>Stores users, extensions, routing rules, voicemail</td></tr>
              <tr><td><strong>Media Server</strong></td><td>Handles audio processing (music on hold, conferencing, IVR)</td></tr>
              <tr><td><strong>Management Interface</strong></td><td>Admin web GUI or CLI for configuration</td></tr>
            </tbody>
          </table>
        </div>
      `
    },
    {
      id: 'pbx-ip-architecture',
      title: 'IP‑PBX Architecture',
      priority: false,
      icon: '🖥️',
      bodyHTML: `
        <div class="code-block"><pre>                     ┌─────────────────────────────────────────────────┐
                      │                IP‑PBX Server                    │
                      ├─────────────────────────────────────────────────┤
                      │  SIP Proxy/Registrar                           │
                      │  ├── Authentication                           │
                      │  ├── Registration handling                    │
                      │  └── Call routing                             │
                      ├─────────────────────────────────────────────────┤
                      │  Media Server                                  │
                      │  ├── RTP relaying                             │
                      │  ├── Transcoding                             │
                      │  ├── Music on hold                           │
                      │  └── Conferencing                            │
                      ├─────────────────────────────────────────────────┤
                      │  Database                                      │
                      │  ├── Users/Extensions                         │
                      │  ├── Routing rules                           │
                      │  ├── Voicemail                               │
                      │  └── Call logs                               │
                      ├─────────────────────────────────────────────────┤
                      │  Web Admin Interface                          │
                      │  ├── User management                         │
                      │  ├── Feature configuration                   │
                      │  └── Reporting                               │
                      └─────────────────────────────────────────────────┘
                                      │
                      ┌──────────────┼──────────────┐
                      │              │              │
                  ┌───┴───┐      ┌───┴───┐      ┌───┴───┐
                  │Phone A│      │Phone B│      │Trunk  │
                  │(101)  │      │(102)  │      │(SIP)  │
                  └───────┘      └───────┘      └───────┘</pre></div>
        <div class="info-box note"><strong>📌 Key components:</strong> SIP Proxy handles registration and routing. Media Server processes audio. Database stores user data and call logs.</div>
      `
    },
    {
      id: 'pbx-cloud-architecture',
      title: 'Cloud PBX Architecture',
      priority: false,
      icon: '☁️',
      bodyHTML: `
        <p>Cloud PBX is multi‑tenant, distributed, and elastic:</p>
        <div class="code-block"><pre>                     ┌─────────────────────────────────────────────────┐
                      │            CLOUD PBX PROVIDER                   │
                      │              (e.g., RingCentral, 3CX)           │
                      │                                                 │
                      │  ┌─────────────────────────────────────────┐   │
                      │  │   Regional SBC / POP                   │   │
                      │  │   (Edge for SIP signalling)           │   │
                      │  └─────────────────────────────────────────┘   │
                      │                    │                           │
                      │  ┌─────────────────────────────────────────┐   │
                      │  │   Core Processing                     │   │
                      │  │   ├── Multi‑tenant SIP Proxy          │   │
                      │  │   ├── Media Processing                │   │
                      │  │   ├── Database (scalable)             │   │
                      │  │   └── API Gateway                     │   │
                      │  └─────────────────────────────────────────┘   │
                      │                    │                           │
                      │  ┌─────────────────────────────────────────┐   │
                      │  │   PSTN Gateway                         │   │
                      │  │   (Connects to public network)         │   │
                      │  └─────────────────────────────────────────┘   │
                      └─────────────────────────────────────────────────┘</pre></div>
        <div class="info-box tip"><strong>💡 Key characteristics:</strong> Multi‑tenant (one platform serves many customers), Elastic (auto‑scales), Redundant (built‑in failover), API‑driven.</div>
      `
    },
    {
      id: 'pbx-hybrid-architecture',
      title: 'Hybrid PBX Architecture',
      priority: false,
      icon: '🔀',
      bodyHTML: `
        <p>Hybrid PBX combines on‑premises and cloud PBX capabilities.</p>
        <div class="code-block"><pre>                     ┌─────────────────────────────────────────────────┐
                      │         HYBRID PBX ARCHITECTURE                │
                      ├─────────────────────────────────────────────────┤
                      │                                                 │
                      │   ┌─────────────────────────────────┐          │
                      │   │     On‑Premises PBX             │          │
                      │   │   (Core calls stay internal)   │          │
                      │   │   ├── Extensions (101, 102)   │          │
                      │   │   └── Local gateway            │          │
                      │   └─────────────┬───────────────────┘          │
                      │                 │                              │
                      │                 │ SIP Trunk                    │
                      │                 │ (Backup/Failover)            │
                      │                 ▼                              │
                      │   ┌─────────────────────────────────┐          │
                      │   │     Cloud PBX Provider          │          │
                      │   │   (Failover/Remote users)      │          │
                      │   │   ├── Disaster recovery        │          │
                      │   │   └── Remote worker access    │          │
                      │   └─────────────────────────────────┘          │
                      │                                                 │
                      └─────────────────────────────────────────────────┘</pre></div>
        <div class="info-box tip"><strong>💡 Common hybrid scenarios:</strong> On‑premises PBX + SIP trunking (cost savings), On‑premises + cloud failover (disaster recovery), Cloud PBX + local PSTN gateway (emergency calls).</div>
      `
    },
    {
      id: 'pbx-sbc',
      title: 'Session Border Controller (SBC)',
      priority: false,
      icon: '🛡️',
      bodyHTML: `
        <p><strong>Purpose:</strong> The SBC sits at the edge of the VoIP network, acting as a gateway between your internal network and external providers.</p>
        <h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;">Key functions</h4>
        <ul style="padding-left:1.25rem;margin-bottom:0.5rem;">
          <li><strong>Security:</strong> Hides internal topology, prevents SIP attacks</li>
          <li><strong>NAT traversal:</strong> Enables SIP to work across NAT boundaries</li>
          <li><strong>Interoperability:</strong> Translates between different SIP implementations</li>
          <li><strong>QoS:</strong> Prioritises voice traffic at the border</li>
          <li><strong>Media processing:</strong> Transcoding, media forking</li>
        </ul>
        <h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;">Deployment models</h4>
        <ul style="padding-left:1.25rem;margin-bottom:0.5rem;">
          <li><strong>Hardware SBC:</strong> Physical appliance (Cisco, AudioCodes, Oracle)</li>
          <li><strong>Virtual SBC:</strong> Runs on VMware, Hyper‑V, KVM</li>
          <li><strong>Cloud SBC:</strong> Offered by cloud providers (AWS, Azure, GCP)</li>
        </ul>
        <div class="info-box tip"><strong>💡 When you need an SBC:</strong> Connecting to a cloud PBX provider, multiple SIP trunk providers, complex network topology (multiple NAT layers), regulatory compliance requiring encryption.</div>
      `
    },
    {
      id: 'pbx-gateways',
      title: 'VoIP Gateways',
      priority: false,
      icon: '🔌',
      bodyHTML: `
        <p>A VoIP gateway bridges IP networks and traditional telephony.</p>
        <div class="table-wrapper">
          <table class="data-table">
            <thead><tr><th>Gateway Type</th><th>Purpose</th><th>Connection</th></tr></thead>
            <tbody>
              <tr><td><strong>FXS Gateway</strong></td><td>Connects analogue phones to IP network</td><td>Phone → Gateway → LAN</td></tr>
              <tr><td><strong>FXO Gateway</strong></td><td>Connects IP‑PBX to analogue phone lines</td><td>LAN → Gateway → PSTN</td></tr>
              <tr><td><strong>ISDN PRI Gateway</strong></td><td>Connects IP‑PBX to ISDN PRI lines</td><td>LAN → Gateway → ISDN</td></tr>
              <tr><td><strong>E1/T1 Gateway</strong></td><td>Connects to E1/T1 digital trunks</td><td>LAN → Gateway → E1/T1</td></tr>
            </tbody>
          </table>
        </div>
        <div class="info-box tip"><strong>💡 Common use cases:</strong> Transitioning from traditional to IP‑PBX, Failover to analogue lines if internet goes down, Connecting legacy equipment (fax machines, analogue phones). <strong>Popular vendors:</strong> Grandstream, Cisco, Patton, Sangoma, AudioCodes.</div>
      `
    },
    {
      id: 'pbx-sip-trunks',
      title: 'SIP Trunks',
      priority: false,
      icon: '🔗',
      bodyHTML: `
        <p>A <strong>SIP Trunk</strong> is a virtual connection to a VoIP provider that replaces traditional ISDN/analogue lines.</p>
        <h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;">How it works</h4>
        <ol style="padding-left:1.25rem;margin-bottom:0.5rem;">
          <li>Your PBX registers with the SIP provider</li>
          <li>Provider assigns a SIP URI (e.g., <code>12345@sip.provider.com</code>)</li>
          <li>You receive a block of DID (Direct Inward Dialling) numbers</li>
          <li>All inbound/outbound calls go over your internet connection</li>
        </ol>
        <h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;">Benefits</h4>
        <ul style="padding-left:1.25rem;margin-bottom:0.5rem;">
          <li><strong>Cost:</strong> Much cheaper than ISDN</li>
          <li><strong>Scalability:</strong> Add capacity instantly (no physical lines)</li>
          <li><strong>Geographic flexibility:</strong> Get DID numbers from any area code</li>
          <li><strong>Features:</strong> Multiple channels, failover, E911</li>
        </ul>
      `
    },
    {
      id: 'pbx-softphones',
      title: 'Softphones',
      priority: false,
      icon: '📱',
      bodyHTML: `
        <p>A <strong>softphone</strong> is a software‑based telephone running on a computer, tablet, or smartphone.</p>
        <div class="table-wrapper">
          <table class="data-table">
            <thead><tr><th>Softphone</th><th>Platform</th><th>Features</th></tr></thead>
            <tbody>
              <tr><td><strong>Linphone</strong></td><td>Windows, macOS, Linux, iOS, Android</td><td>Free, open‑source, SIP, video</td></tr>
              <tr><td><strong>Zoiper</strong></td><td>Windows, macOS, Linux, iOS, Android</td><td>Free version, business version, SIP/IAX</td></tr>
              <tr><td><strong>Bria</strong></td><td>Windows, macOS, iOS, Android</td><td>Paid, professional, enterprise features</td></tr>
              <tr><td><strong>MicroSIP</strong></td><td>Windows</td><td>Lightweight, open‑source</td></tr>
              <tr><td><strong>TeamSoftphone</strong></td><td>Web‑based</td><td>Built into 3CX, RingCentral, etc.</td></tr>
            </tbody>
          </table>
        </div>
        <div class="info-box tip"><strong>💡 Use cases:</strong> Remote workers, Traveling employees, Call centre agents, Testing and development.</div>
      `
    },

    // ============================================================
    // TOPIC 4: CLOUD PBX
    // ============================================================
    {
      id: 'cloud-pbx-what-is',
      title: 'What is Cloud PBX?',
      priority: true,
      icon: '☁️',
      bodyHTML: `
        <p>A <strong>Cloud PBX</strong> (also called Hosted PBX or UCaaS) is a phone system hosted and managed by a third‑party provider. No hardware is installed on‑site — phones connect to the cloud over the internet.</p>
        <div class="table-wrapper">
          <table class="data-table">
            <thead><tr><th>Pros</th><th>Cons</th></tr></thead>
            <tbody>
              <tr><td>No capital expenditure (capex) — operational expense (opex)</td><td>Ongoing subscription costs</td></tr>
              <tr><td>Instant provisioning (minutes, not weeks)</td><td>Dependent on internet connectivity</td></tr>
              <tr><td>Automatic updates and security patches</td><td>Less control over configuration</td></tr>
              <tr><td>Built‑in redundancy and disaster recovery</td><td>Compliance concerns (data sovereignty)</td></tr>
              <tr><td>Rich feature set (IVR, call recording, CRM integration)</td><td></td></tr>
            </tbody>
          </table>
        </div>
      `
    },
    {
      id: 'cloud-pbx-providers-global',
      title: 'Cloud PBX Providers (Global)',
      priority: false,
      icon: '🌍',
      bodyHTML: `
        <div class="table-wrapper">
          <table class="data-table">
            <thead><tr><th>Provider</th><th>Type</th><th>Key Features</th></tr></thead>
            <tbody>
              <tr><td><strong>RingCentral</strong></td><td>UCaaS</td><td>Voice, video, messaging, fax, integrations</td></tr>
              <tr><td><strong>8x8</strong></td><td>UCaaS</td><td>Voice, video, contact centre, international focus</td></tr>
              <tr><td><strong>Zoom Phone</strong></td><td>UCaaS</td><td>Zoom‑integrated PBX, cloud‑native</td></tr>
              <tr><td><strong>Microsoft Teams Calling</strong></td><td>UCaaS</td><td>Teams integration, direct routing</td></tr>
              <tr><td><strong>Cisco Webex Calling</strong></td><td>UCaaS</td><td>Webex integration, enterprise‑grade</td></tr>
              <tr><td><strong>3CX Cloud</strong></td><td>Hosted PBX</td><td>Self‑hosted or cloud, open‑source base</td></tr>
              <tr><td><strong>Twilio Voice</strong></td><td>API‑first</td><td>Programmable voice, build your own PBX</td></tr>
            </tbody>
          </table>
        </div>
        <div class="info-box tip"><strong>💡 How to choose:</strong> RingCentral (all‑in‑one), Zoom Phone (if you use Zoom), Microsoft Teams (if you use Office 365), 3CX (flexibility), Twilio (custom build).</div>
      `
    },
    {
      id: 'cloud-pbx-providers-kenya',
      title: 'Cloud PBX Providers (Kenya/Africa)',
      priority: false,
      icon: '🇰🇪',
      bodyHTML: `
        <div class="table-wrapper">
          <table class="data-table">
            <thead><tr><th>Provider</th><th>Type</th><th>Presence in Kenya</th></tr></thead>
            <tbody>
              <tr><td><strong>Safaricom Business</strong></td><td>SIP Trunks + UCaaS</td><td>Strong local presence, SIP trunking</td></tr>
              <tr><td><strong>Telkom Kenya</strong></td><td>SIP Trunks</td><td>Traditional telecom, SIP offering</td></tr>
              <tr><td><strong>Liquid Telecom</strong></td><td>SIP Trunks + Cloud PBX</td><td>Pan‑African, enterprise focus</td></tr>
              <tr><td><strong>Airtel Kenya</strong></td><td>SIP Trunks</td><td>SIP trunking and VoIP</td></tr>
              <tr><td><strong>3CX Cloud</strong></td><td>Hosted PBX</td><td>Available globally, self‑hosted option</td></tr>
              <tr><td><strong>RingCentral</strong></td><td>UCaaS</td><td>Available globally (requires local DID)</td></tr>
              <tr><td><strong>Zoom Phone</strong></td><td>UCaaS</td><td>Available globally</td></tr>
            </tbody>
          </table>
        </div>
        <div class="info-box note"><strong>📌 Important:</strong> For Kenya, Safaricom is the dominant provider with the most extensive coverage. Telkom and Liquid are also strong options for enterprise.</div>
      `
    },
    {
      id: 'cloud-pbx-signup',
      title: 'How to Sign Up for a Cloud PBX (Step‑by‑Step)',
      priority: false,
      icon: '📝',
      bodyHTML: `
        <p><strong>General process (applies to most providers):</strong></p>
        <ol style="padding-left:1.25rem;margin-bottom:0.75rem;">
          <li><strong>Choose a provider</strong> — RingCentral, Zoom Phone, 3CX, Safaricom, etc.</li>
          <li><strong>Visit the provider's website</strong> and find the "Sign Up" or "Get Started" page</li>
          <li><strong>Create an account</strong> — provide business email, company name, phone number</li>
          <li><strong>Choose a plan</strong> — based on number of users and features needed</li>
          <li><strong>Set up billing</strong> — credit card, invoice, or bank transfer</li>
          <li><strong>Add users</strong> — import or manually add employees</li>
          <li><strong>Assign numbers</strong> — choose DID numbers (local, toll‑free, etc.)</li>
          <li><strong>Provision phones</strong> — auto‑provision IP phones or use softphones</li>
          <li><strong>Configure call routing</strong> — auto‑attendant, IVR, call queues</li>
          <li><strong>Test</strong> — make internal and external calls to verify</li>
          <li><strong>Go live</strong> — train users, cutover from old system</li>
        </ol>
        <div class="info-box tip"><strong>💡 Typical time:</strong> 30 minutes to 2 hours (provider‑dependent).</div>
      `
    },

    // ============================================================
    // TOPIC 5: HYBRID PBX
    // ============================================================
    {
      id: 'hybrid-pbx-what-is',
      title: 'What is Hybrid PBX?',
      priority: false,
      icon: '🔀',
      bodyHTML: `
        <p>A <strong>Hybrid PBX</strong> combines on‑premises and cloud PBX capabilities. It gives you the best of both worlds:</p>
        <ul style="padding-left:1.25rem;margin-bottom:0.75rem;">
          <li><strong>Control</strong> of on‑premises PBX</li>
          <li><strong>Resilience</strong> of cloud PBX</li>
          <li><strong>Flexibility</strong> to choose where each call is handled</li>
        </ul>
        <div class="info-box tip"><strong>💡 Key characteristics:</strong> On‑premises PBX handles internal calls, Cloud PBX handles external calls (or vice versa), Failover between on‑premises and cloud for disaster recovery, Gradual migration from on‑premises to cloud.</div>
      `
    },
    {
      id: 'hybrid-pbx-scenarios',
      title: 'Hybrid PBX Deployment Scenarios',
      priority: false,
      icon: '🏗️',
      bodyHTML: `
        <div class="table-wrapper">
          <table class="data-table">
            <thead><tr><th>Scenario</th><th>Best Approach</th></tr></thead>
            <tbody>
              <tr><td>Office with unreliable internet</td><td>On‑premises PBX + local PSTN + cloud backup</td></tr>
              <tr><td>Large enterprise with multiple offices</td><td>Central on‑premises PBX + SIP trunks + cloud failover</td></tr>
              <tr><td>Startup wanting cloud but concerned about cost</td><td>Cloud PBX with local gateway for emergency calls</td></tr>
              <tr><td>Organisation with regulatory compliance requirements</td><td>On‑premises PBX for sensitive calls, cloud for others</td></tr>
              <tr><td>Phased migration from legacy PBX</td><td>On‑premises PBX with SIP trunk, move extensions to cloud gradually</td></tr>
            </tbody>
          </table>
        </div>
      `
    },

    // ============================================================
    // TOPIC 7: PBX TROUBLESHOOTING
    // ============================================================
    {
      id: 'pbx-common-issues',
      title: 'Common PBX Issues',
      priority: true,
      icon: '🔧',
      bodyHTML: `
        <div class="table-wrapper">
          <table class="data-table">
            <thead><tr><th>Issue</th><th>Symptom</th><th>Likely Cause</th></tr></thead>
            <tbody>
              <tr><td><strong>No dial tone</strong></td><td>Phone doesn't respond</td><td>Network connectivity, registration failure, power</td></tr>
              <tr><td><strong>One‑way audio</strong></td><td>Can hear other party but they can't hear you</td><td>NAT, firewall, codec mismatch, RTP blocked</td></tr>
              <tr><td><strong>Dropped calls</strong></td><td>Calls disconnect randomly</td><td>Network congestion, jitter, packet loss</td></tr>
              <tr><td><strong>Registration failures</strong></td><td>Phone won't register</td><td>Credentials wrong, SIP port blocked, network issue</td></tr>
              <tr><td><strong>No incoming calls</strong></td><td>Calls ring but don't connect</td><td>DDI mapping wrong, inbound routing misconfigured</td></tr>
              <tr><td><strong>No outgoing calls</strong></td><td>Can't dial outside</td><td>Outbound routing misconfigured, trunk down</td></tr>
              <tr><td><strong>Chopped audio</strong></td><td>Voice breaks up</td><td>Network congestion, jitter, packet loss</td></tr>
              <tr><td><strong>Delay/latency</strong></td><td>Talking over each other</td><td>High latency (>300ms), network congestion</td></tr>
            </tbody>
          </table>
        </div>
      `
    },
    {
      id: 'pbx-sip-errors',
      title: 'SIP Troubleshooting — Error Codes',
      priority: false,
      icon: '🚫',
      bodyHTML: `
        <div class="table-wrapper">
          <table class="data-table">
            <thead><tr><th>Code</th><th>Meaning</th><th>What to Do</th></tr></thead>
            <tbody>
              <tr><td><strong>408 Request Timeout</strong></td><td>No response from remote</td><td>Check network connectivity, firewall</td></tr>
              <tr><td><strong>503 Service Unavailable</strong></td><td>Provider issue</td><td>Wait, retry, check trunk status</td></tr>
              <tr><td><strong>404 Not Found</strong></td><td>User/extension doesn't exist</td><td>Check number dialled, routing rules</td></tr>
              <tr><td><strong>407 Proxy Authentication Required</strong></td><td>Authentication failed</td><td>Check username, password, realm</td></tr>
              <tr><td><strong>486 Busy Here</strong></td><td>Remote is busy</td><td>Remote user is on another call</td></tr>
              <tr><td><strong>483 Too Many Hops</strong></td><td>Routing loop</td><td>Check routing configurations</td></tr>
              <tr><td><strong>401 Unauthorised</strong></td><td>Authentication failed</td><td>Check credentials</td></tr>
            </tbody>
          </table>
        </div>
        <div class="code-block"><pre><span class="code-comment"># Check registration</span>
  sip show registry              <span class="code-comment"># Asterisk</span>
  systemctl status 3CX           <span class="code-comment"># 3CX</span>

  <span class="code-comment"># Check SIP log</span>
  tail -f /var/log/asterisk/full | grep SIP

  <span class="code-comment"># Capture SIP traffic</span>
  tcpdump -i eth0 -s 0 -w sip.pcap port 5060</pre></div>
      `
    },
    {
      id: 'pbx-rtp-troubleshooting',
      title: 'RTP Troubleshooting (Audio Issues)',
      priority: false,
      icon: '🎤',
      bodyHTML: `
        <div class="table-wrapper">
          <table class="data-table">
            <thead><tr><th>Cause</th><th>Explanation</th><th>Fix</th></tr></thead>
            <tbody>
              <tr><td><strong>NAT</strong></td><td>RTP ports not forwarded</td><td>Configure NAT traversal (STUN, TURN, SBC)</td></tr>
              <tr><td><strong>Firewall</strong></td><td>RTP ports blocked</td><td>Open RTP port range (10000–20000)</td></tr>
              <tr><td><strong>Codec mismatch</strong></td><td>Incompatible codecs</td><td>Configure common codec (G.711, G.722)</td></tr>
              <tr><td><strong>Network congestion</strong></td><td>Packet loss, jitter</td><td>QoS, bandwidth upgrade</td></tr>
              <tr><td><strong>RTP relay</strong></td><td>Media not flowing</td><td>Configure RTP relay, check media path</td></tr>
            </tbody>
          </table>
        </div>
        <div class="code-block"><pre><span class="code-comment"># Check RTP ports are open</span>
  ss -tulpn | grep 10000

  <span class="code-comment"># Check RTP traffic</span>
  tcpdump -i eth0 -s 0 -w rtp.pcap udp portrange 10000-20000</pre></div>
      `
    },
    {
      id: 'pbx-troubleshooting-tools',
      title: 'Troubleshooting Tools',
      priority: false,
      icon: '🛠️',
      bodyHTML: `
        <div class="table-wrapper">
          <table class="data-table">
            <thead><tr><th>Tool</th><th>Purpose</th><th>Command</th></tr></thead>
            <tbody>
              <tr><td><strong>tcpdump</strong></td><td>Capture network traffic</td><td><code>tcpdump -i eth0 port 5060</code></td></tr>
              <tr><td><strong>sngrep</strong></td><td>Visual SIP debug</td><td><code>sngrep</code></td></tr>
              <tr><td><strong>ss</strong></td><td>Check listening ports</td><td><code>ss -tulpn</code></td></tr>
              <tr><td><strong>ping</strong></td><td>Test connectivity</td><td><code>ping &lt;ip&gt;</code></td></tr>
              <tr><td><strong>mtr</strong></td><td>Trace route with stats</td><td><code>mtr &lt;ip&gt;</code></td></tr>
              <tr><td><strong>iperf</strong></td><td>Bandwidth test</td><td><code>iperf -c &lt;server&gt;</code></td></tr>
            </tbody>
          </table>
        </div>
      `
    },

    // ============================================================
    // TOPIC 9: PBX INTEGRATIONS
    // ============================================================
    {
      id: 'pbx-integrations-crm',
      title: 'CRM Integration',
      priority: false,
      icon: '🔗',
      bodyHTML: `
        <div class="table-wrapper">
          <table class="data-table">
            <thead><tr><th>CRM</th><th>Integration Method</th><th>Notes</th></tr></thead>
            <tbody>
              <tr><td><strong>Salesforce</strong></td><td>CTI API, Lightning Dialer</td><td>Enterprise, robust</td></tr>
              <tr><td><strong>HubSpot</strong></td><td>Telephony API</td><td>Growing, easy to set up</td></tr>
              <tr><td><strong>Zoho CRM</strong></td><td>SIP-based Integration</td><td>Good for small/medium</td></tr>
              <tr><td><strong>Freshsales</strong></td><td>Telephony Integration</td><td>Freshworks ecosystem</td></tr>
              <tr><td><strong>Pipedrive</strong></td><td>Click‑to‑dial</td><td>Good for sales teams</td></tr>
            </tbody>
          </table>
        </div>
        <div class="info-box tip"><strong>💡 Benefits:</strong> Click‑to‑dial from CRM, Call pop‑ups (view customer info before answering), Call logging (automatically log calls in CRM), Customer history, Screen pops.</div>
      `
    },
    {
      id: 'pbx-integrations-api',
      title: 'API Integration',
      priority: false,
      icon: '⚡',
      bodyHTML: `
        <div class="table-wrapper">
          <table class="data-table">
            <thead><tr><th>API Type</th><th>Purpose</th></tr></thead>
            <tbody>
              <tr><td><strong>REST API</strong></td><td>User management, provisioning, call control, reporting</td></tr>
              <tr><td><strong>Webhooks</strong></td><td>Real‑time events (call started, call ended, voicemail)</td></tr>
              <tr><td><strong>SIP API</strong></td><td>Programmatic call control (originate, hangup, transfer)</td></tr>
              <tr><td><strong>WebRTC API</strong></td><td>Browser‑based calling</td></tr>
            </tbody>
          </table>
        </div>
        <div class="info-box tip"><strong>💡 Common use cases:</strong> Automated provisioning (onboarding/offboarding users), Custom IVR (database‑driven menus), Call analytics (dashboards, reporting), Automated call routing (based on CRM data).</div>
      `
    },

    // ============================================================
    // TOPIC 10: PBX SECURITY
    // ============================================================
    {
      id: 'pbx-security-toll-fraud',
      title: 'Toll Fraud Prevention',
      priority: false,
      icon: '💰',
      bodyHTML: `
        <p><strong>Toll fraud:</strong> Attackers gain access to your PBX and make expensive international calls.</p>
        <div class="table-wrapper">
          <table class="data-table">
            <thead><tr><th>Measure</th><th>Description</th></tr></thead>
            <tbody>
              <tr><td><strong>International call blocking</strong></td><td>Block all international calls unless specifically needed</td></tr>
              <tr><td><strong>Rate limiting</strong></td><td>Limit calls per minute/hour/day</td></tr>
              <tr><td><strong>Anomaly detection</strong></td><td>Alerts on unusual call patterns</td></tr>
              <tr><td><strong>Strong passwords</strong></td><td>Minimum 12 characters, special characters, unique</td></tr>
              <tr><td><strong>IP whitelisting</strong></td><td>Only allow SIP from trusted IPs</td></tr>
              <tr><td><strong>Monitor call logs</strong></td><td>Regularly review call logs for suspicious activity</td></tr>
              <tr><td><strong>Fail2ban</strong></td><td>Block IPs after failed login attempts</td></tr>
            </tbody>
          </table>
        </div>
        <div class="info-box warning"><strong>⚠️ Signs of toll fraud:</strong> High international call volume, Calls to premium numbers, Calls at unusual times, Multiple failed registrations.</div>
      `
    },
    {
      id: 'pbx-security-sip-attacks',
      title: 'SIP Attacks & Mitigation',
      priority: false,
      icon: '🛡️',
      bodyHTML: `
        <div class="table-wrapper">
          <table class="data-table">
            <thead><tr><th>Attack</th><th>Description</th><th>Mitigation</th></tr></thead>
            <tbody>
              <tr><td><strong>INVITE flood</strong></td><td>Thousands of INVITE requests</td><td>Rate limiting, fail2ban</td></tr>
              <tr><td><strong>REGISTER flood</strong></td><td>Fake registration attempts</td><td>Rate limiting, strong passwords</td></tr>
              <tr><td><strong>Scanner attacks</strong></td><td>Scanning for open SIP ports</td><td>Firewall, SBC</td></tr>
              <tr><td><strong>Bye attack</strong></td><td>Sending BYE to end calls</td><td>Authentication, encryption</td></tr>
              <tr><td><strong>RTP injection</strong></td><td>Injecting RTP packets</td><td>SRTP, authentication</td></tr>
            </tbody>
          </table>
        </div>
        <div class="code-block"><pre><span class="code-comment"># Fail2ban configuration for Asterisk</span>
  <span class="code-comment"># /etc/fail2ban/jail.local</span>
  [asterisk]
  enabled = true
  port = 5060,5061
  filter = asterisk
  logpath = /var/log/asterisk/security
  maxretry = 5
  bantime = 3600</pre></div>
      `
    },
    {
      id: 'pbx-security-encryption',
      title: 'Encryption for VoIP',
      priority: false,
      icon: '🔐',
      bodyHTML: `
        <div class="table-wrapper">
          <table class="data-table">
            <thead><tr><th>Protocol</th><th>Encrypts</th><th>Purpose</th></tr></thead>
            <tbody>
              <tr><td><strong>TLS</strong> (SIPS)</td><td>SIP signalling</td><td>Prevent eavesdropping on call setup</td></tr>
              <tr><td><strong>SRTP</strong></td><td>RTP audio</td><td>Encrypt voice packets</td></tr>
              <tr><td><strong>HTTPS</strong></td><td>Web UI</td><td>Secure web interface</td></tr>
            </tbody>
          </table>
        </div>
        <div class="code-block"><pre><span class="code-comment"># Enable TLS for SIP (Asterisk)</span>
  transport=tls
  tlscertfile=/etc/asterisk/keys/asterisk.pem
  tlscafile=/etc/asterisk/keys/ca.crt</pre></div>
        <div class="info-box tip"><strong>💡 Best practice:</strong> Always use TLS for SIP and SRTP for media when possible. Most modern PBX providers support both.</div>
      `
    },

    // ============================================================
    // TOPIC 12: PRACTICAL GUIDES
    // ============================================================
    {
      id: 'pbx-guide-small-office',
      title: 'How to Set Up a Small Office PBX',
      priority: true,
      icon: '🏢',
      bodyHTML: `
        <p><strong>Scenario:</strong> 5–20 users, simple call routing, budget‑conscious</p>
        <h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;">Option A: Cloud PBX (Recommended)</h4>
        <ol style="padding-left:1.25rem;margin-bottom:0.75rem;">
          <li><strong>Sign up with a provider:</strong> RingCentral, 3CX Cloud, Safaricom Business</li>
          <li><strong>Add users:</strong> Each user gets an extension (101, 102, 103...)</li>
          <li><strong>Set up call routing:</strong> Auto‑attendant, ring groups</li>
          <li><strong>Provision phones:</strong> Buy SIP‑enabled IP phones (Yealink, Grandstream), use auto‑provisioning</li>
          <li><strong>Test and go live</strong></li>
        </ol>
        <h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;">Option B: On‑premises PBX (More technical)</h4>
        <div class="code-block"><pre><span class="code-comment"># Install Issabel (Asterisk with GUI)</span>
  wget -O install.sh https://raw.githubusercontent.com/issabel/install/master/install.sh
  sudo bash install.sh</pre></div>
      `
    },
    {
      id: 'pbx-guide-add-user',
      title: 'How to Add a New User',
      priority: false,
      icon: '👤',
      bodyHTML: `
        <ol style="padding-left:1.25rem;margin-bottom:0.75rem;">
          <li><strong>Create extension:</strong> Choose extension number (e.g., 104), set display name, set SIP password</li>
          <li><strong>Configure voicemail:</strong> Enable voicemail, set mailbox number, enable voicemail‑to‑email</li>
          <li><strong>Set permissions:</strong> Outbound restrictions, feature access</li>
          <li><strong>Assign phone:</strong> If using IP phone — provision; if using softphone — provide credentials</li>
          <li><strong>Test calls:</strong> Internal call, external call</li>
        </ol>
        <div class="info-box tip"><strong>💡 In 3CX:</strong> Admin Console → Users → Add → Fill in details → Assign phone → Save</div>
        <div class="info-box tip"><strong>💡 In Issabel/FreePBX:</strong> PBX → Extensions → Add Extension → Fill in details → Save → Apply Configuration</div>
      `
    },
    {
      id: 'pbx-guide-ivr',
      title: 'How to Set Up an Auto‑Attendant (IVR)',
      priority: false,
      icon: '🎙️',
      bodyHTML: `
        <ol style="padding-left:1.25rem;margin-bottom:0.75rem;">
          <li><strong>Record greeting:</strong> "Thank you for calling [Company]. Press 1 for Sales, 2 for Support, 3 for Accounts..."</li>
          <li><strong>Create IVR in PBX:</strong> Asterisk: <code>extensions.conf</code>, 3CX: Management Console → IVR, Issabel: PBX → IVR</li>
          <li><strong>Configure menu options:</strong> 1 → Sales (ring group), 2 → Support (ring group), * → Operator (extension 0)</li>
          <li><strong>Set time‑based routing:</strong> Office hours → Route to operators, After hours → Play closed greeting and voicemail</li>
          <li><strong>Test:</strong> Call main number, test each option</li>
        </ol>
        <div class="code-block"><pre><span class="code-comment"># Asterisk IVR example</span>
  [inbound]
  exten => s,1,Answer()
  same => n,Wait(1)
  same => n,Background(welcome-greeting)
  same => n,WaitExten(5)

  exten => 1,1,Dial(SIP/101)
  exten => 2,1,Dial(SIP/102)
  exten => 0,1,Dial(SIP/0)</pre></div>
      `
    },
    {
      id: 'pbx-guide-call-recording',
      title: 'How to Set Up Call Recording',
      priority: false,
      icon: '🎥',
      bodyHTML: `
        <ol style="padding-left:1.25rem;margin-bottom:0.75rem;">
          <li><strong>Enable recording:</strong> Asterisk: <code>monitor.conf</code>, 3CX: Settings → Recording, Issabel: PBX → Recording</li>
          <li><strong>Choose recording mode:</strong> On‑demand (*9 to record), Always (record all calls), Never</li>
          <li><strong>Set storage location:</strong> Local storage or external storage (NAS, cloud)</li>
          <li><strong>Configure retention:</strong> How long to keep recordings, auto‑delete older recordings</li>
          <li><strong>Compliance:</strong> Inform callers they are being recorded, secure access to recordings</li>
        </ol>
        <div class="info-box warning"><strong>⚠️ Important:</strong> Check local regulations. In Kenya, you must inform participants that calls are being recorded.</div>
      `
    },
    {
      id: 'pbx-guide-troubleshoot-dropped-call',
      title: 'How to Troubleshoot a Dropped Call',
      priority: false,
      icon: '🔍',
      bodyHTML: `
        <p><strong>Step‑by‑step diagnostic flow:</strong></p>
        <ol style="padding-left:1.25rem;margin-bottom:0.75rem;">
          <li><strong>Is it internal or external?</strong> Internal → Check PBX logs, External → Check SIP trunk/provider</li>
          <li><strong>Check network:</strong> <code>ping &lt;provider-ip&gt; -c 10</code>, <code>mtr &lt;provider-ip&gt;</code> — check latency, jitter, packet loss</li>
          <li><strong>Check logs:</strong> <code>tail -f /var/log/asterisk/full</code> — look for error messages (408, 503, BYE)</li>
          <li><strong>Check SIP traffic:</strong> <code>sngrep</code> — look for BYE messages (who sent the BYE?)</li>
          <li><strong>If BYE from provider:</strong> Contact provider, provide timestamps</li>
          <li><strong>If BYE from PBX:</strong> Check configuration (timeouts, codecs), check logs for errors</li>
        </ol>
        <div class="code-block"><pre><span class="code-comment"># Follow Asterisk logs for debugging</span>
  tail -f /var/log/asterisk/full | grep -v "verbose"</pre></div>
      `
    },

    // ============================================================
    // TOPIC 3: ON‑PREMISES PBX (Selected Subtopics)
    // ============================================================
    {
      id: 'onprem-what-is',
      title: 'What is On‑Premises PBX?',
      priority: false,
      icon: '🏠',
      bodyHTML: `
        <p>An on‑premises PBX is a phone system where the PBX hardware and software are physically located at your office or data centre. You own and manage the entire system.</p>
        <div class="table-wrapper">
          <table class="data-table">
            <thead><tr><th>Pros</th><th>Cons</th></tr></thead>
            <tbody>
              <tr><td>Full control over configuration</td><td>High upfront cost (hardware, licensing)</td></tr>
              <tr><td>No recurring subscription costs (after hardware purchase)</td><td>Requires technical expertise to maintain</td></tr>
              <tr><td>Data stays on‑premises (compliance)</td><td>Responsible for backups, updates, security</td></tr>
              <tr><td>No dependency on internet for internal calls</td><td>Limited scalability (requires hardware upgrades)</td></tr>
            </tbody>
          </table>
        </div>
        <div class="info-box tip"><strong>💡 When to choose:</strong> Large enterprise with dedicated IT staff, Regulatory/compliance requirements, Unreliable internet connectivity, Existing PBX investment.</div>
      `
    },
    {
      id: 'onprem-software',
      title: 'Popular On‑Premises PBX Software',
      priority: false,
      icon: '💻',
      bodyHTML: `
        <div class="table-wrapper">
          <table class="data-table">
            <thead><tr><th>Software</th><th>Description</th><th>License</th></tr></thead>
            <tbody>
              <tr><td><strong>Asterisk</strong></td><td>Most popular open‑source PBX</td><td>GPLv2</td></tr>
              <tr><td><strong>FreeSWITCH</strong></td><td>Modern alternative to Asterisk</td><td>MPL 1.1</td></tr>
              <tr><td><strong>Issabel</strong></td><td>Asterisk‑based with GUI</td><td>GPL</td></tr>
              <tr><td><strong>3CX Self‑Hosted</strong></td><td>Commercial, easy setup</td><td>Paid</td></tr>
              <tr><td><strong>FreePBX</strong></td><td>Asterisk‑based web GUI</td><td>GPL</td></tr>
            </tbody>
          </table>
        </div>
        <div class="info-box note"><strong>📌 Recommended for beginners:</strong> Issabel (GUI) or 3CX Self‑Hosted (easy setup wizard). <strong>For advanced users:</strong> Asterisk (most flexible).</div>
      `
    },
    {
      id: 'onprem-hardware',
      title: 'Hardware Requirements',
      priority: false,
      icon: '🖥️',
      bodyHTML: `
        <h4 style="font-size:0.95rem;font-weight:600;margin:0 0 0.25rem 0;">Minimal hardware (10–20 users)</h4>
        <div class="table-wrapper">
          <table class="data-table">
            <thead><tr><th>Component</th><th>Specification</th><th>Notes</th></tr></thead>
            <tbody>
              <tr><td><strong>CPU</strong></td><td>2+ cores</td><td>Intel Xeon or i5</td></tr>
              <tr><td><strong>RAM</strong></td><td>4–8 GB</td><td>More for call recording</td></tr>
              <tr><td><strong>Storage</strong></td><td>50–100 GB SSD</td><td>For OS, logs, recordings</td></tr>
              <tr><td><strong>Network</strong></td><td>1 Gbps</td><td>Static IP recommended</td></tr>
              <tr><td><strong>Power</strong></td><td>UPS</td><td>Surge protection</td></tr>
            </tbody>
          </table>
        </div>
        <h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;">Phones</h4>
        <ul style="padding-left:1.25rem;margin-bottom:0.5rem;">
          <li><strong>IP Phones:</strong> Yealink, Grandstream, Cisco, Polycom</li>
          <li><strong>Analogue phones:</strong> Need FXS gateway</li>
          <li><strong>Softphones:</strong> Linphone, Zoiper, Bria</li>
        </ul>
        <div class="info-box tip"><strong>💡 Popular brands in Kenya:</strong> Yealink (most popular, good value), Grandstream (affordable), Cisco (enterprise).</div>
      `
    },

    // ============================================================
    // TOPIC 6: PBX DEPLOYMENT & SETUP (Selected Subtopics)
    // ============================================================
    {
      id: 'pbx-deployment-planning',
      title: 'Planning a PBX Deployment',
      priority: false,
      icon: '📋',
      bodyHTML: `
        <h4 style="font-size:0.95rem;font-weight:600;margin:0 0 0.25rem 0;">Phase 1: Discovery</h4>
        <ul style="padding-left:1.25rem;margin-bottom:0.5rem;">
          <li><strong>Determine requirements:</strong> Number of users (current and future), Call volume (peak concurrent calls), Features needed (IVR, recording, conferencing), Budget (capex vs opex)</li>
          <li><strong>Network assessment:</strong> Bandwidth available, Network quality (latency, jitter, packet loss), Firewall/NAT status</li>
          <li><strong>Phone inventory:</strong> Existing phones (compatible?), New phone procurement</li>
          <li><strong>Number porting:</strong> Numbers to port, Porting timeline</li>
        </ul>
        <h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;">Phase 2: Selection</h4>
        <ul style="padding-left:1.25rem;margin-bottom:0.5rem;">
          <li>Model selection: On‑premises, Cloud, Hybrid</li>
          <li>Vendor selection: Asterisk/Issabel/3CX/RingCentral</li>
          <li>Hardware selection: Server, phones, gateways</li>
        </ul>
        <h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;">Phase 3: Implementation</h4>
        <ul style="padding-left:1.25rem;margin-bottom:0.5rem;">
          <li>Installation: Hardware, OS, PBX software</li>
          <li>Configuration: Extensions, trunks, routing</li>
          <li>Testing: Internal, external, features</li>
          <li>User training: How to use new system</li>
        </ul>
        <h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;">Phase 4: Cutover</h4>
        <ul style="padding-left:1.25rem;margin-bottom:0.5rem;">
          <li>Migration: Port numbers, move users</li>
          <li>Go‑live: Day 1 support</li>
          <li>Review: Address issues</li>
        </ul>
      `
    },
    {
      id: 'pbx-deployment-selection',
      title: 'Selecting the Right PBX Model',
      priority: false,
      icon: '🎯',
      bodyHTML: `
        <div class="table-wrapper">
          <table class="data-table">
            <thead><tr><th>Criteria</th><th>On‑Premises</th><th>Cloud</th><th>Hybrid</th></tr></thead>
            <tbody>
              <tr><td><strong>Cost</strong></td><td>High capex, low opex</td><td>Low capex, high opex</td><td>Medium</td></tr>
              <tr><td><strong>Control</strong></td><td>Full</td><td>Limited</td><td>Partial</td></tr>
              <tr><td><strong>Maintenance</strong></td><td>Internal IT</td><td>Provider</td><td>Shared</td></tr>
              <tr><td><strong>Scalability</strong></td><td>Hardware upgrades</td><td>Instant</td><td>Flexible</td></tr>
              <tr><td><strong>Reliability</strong></td><td>Single point of failure</td><td>Multi‑site redundancy</td><td>Best of both</td></tr>
              <tr><td><strong>Remote work</strong></td><td>VPN required</td><td>Native</td><td>Hybrid</td></tr>
            </tbody>
          </table>
        </div>
        <div class="info-box tip"><strong>💡 Decision guide:</strong> Dedicated IT staff + budget → On‑premises, No IT staff + want simplicity → Cloud, Compliance requirements + want cloud benefits → Hybrid.</div>
      `
    },
    {
      id: 'pbx-deployment-hardware',
      title: 'Hardware Selection',
      priority: false,
      icon: '🖥️',
      bodyHTML: `
        <h4 style="font-size:0.95rem;font-weight:600;margin:0 0 0.25rem 0;">Server Hardware (On‑Premises)</h4>
        <div class="table-wrapper">
          <table class="data-table">
            <thead><tr><th>Component</th><th>SOHO (10‑20)</th><th>SME (20‑100)</th><th>Enterprise (100+)</th></tr></thead>
            <tbody>
              <tr><td><strong>CPU</strong></td><td>2‑4 cores</td><td>4‑8 cores</td><td>8+ cores</td></tr>
              <tr><td><strong>RAM</strong></td><td>4‑8 GB</td><td>8‑16 GB</td><td>16‑32 GB</td></tr>
              <tr><td><strong>Storage</strong></td><td>60‑120 GB SSD</td><td>120‑500 GB SSD</td><td>500 GB+ SSD (RAID)</td></tr>
              <tr><td><strong>Network</strong></td><td>1 Gbps</td><td>1 Gbps (dual)</td><td>10 Gbps</td></tr>
            </tbody>
          </table>
        </div>
        <h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;">Phones — Recommended Brands</h4>
        <div class="table-wrapper">
          <table class="data-table">
            <thead><tr><th>Type</th><th>Recommended Brands</th><th>Use Case</th></tr></thead>
            <tbody>
              <tr><td><strong>IP Desk Phones</strong></td><td>Yealink, Grandstream, Cisco</td><td>Office workers</td></tr>
              <tr><td><strong>IP Conference Phones</strong></td><td>Polycom, Yealink</td><td>Meeting rooms</td></tr>
              <tr><td><strong>Softphones</strong></td><td>Linphone, Zoiper, Bria</td><td>Remote workers</td></tr>
            </tbody>
          </table>
        </div>
      `
    },
    {
      id: 'pbx-safaricom-sip',
      title: 'Connecting to Safaricom SIP Trunk',
      priority: true,
      icon: '🇰🇪',
      bodyHTML: `
        <div class="info-box note"><strong>📌 Prerequisites:</strong> Safaricom business account, Lease line or fibre connection, Public IP address (or VPN), PBX with SIP trunking support.</div>
        <h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;">Step 1: Contact Safaricom Business</h4>
        <ul style="padding-left:1.25rem;margin-bottom:0.5rem;">
          <li><strong>Phone:</strong> 0733 222 333</li>
          <li><strong>Email:</strong> business@safaricom.co.ke</li>
          <li><strong>Website:</strong> https://www.safaricom.co.ke/business</li>
        </ul>
        <h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;">Step 2: Configure PBX</h4>
        <div class="code-block"><pre><span class="code-comment"># Asterisk SIP configuration</span>
  [safaricom-trunk]
  type=peer
  host=sip.safaricom.co.ke
  username=your-username
  secret=your-password
  context=from-safaricom
  dtmfmode=rfc2833
  disallow=all
  allow=alaw
  allow=ulaw
  qualify=yes
  register => your-username:your-password@sip.safaricom.co.ke

  <span class="code-comment"># Outbound routing</span>
  [outbound]
  exten => _0.,1,Dial(SIP/$\{EXTEN}@safaricom-trunk)</pre></div>
        <h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;">Step 3: Test</h4>
        <ul style="padding-left:1.25rem;margin-bottom:0.5rem;">
          <li><strong>Registration:</strong> <code>sip show registry</code> — should show "Registered"</li>
          <li><strong>Outbound:</strong> Dial a mobile number (e.g., 0712345678)</li>
          <li><strong>Inbound:</strong> Call your DID number from mobile</li>
          <li><strong>Quality:</strong> Test multiple calls, check audio quality</li>
        </ul>
        <div class="info-box tip"><strong>💡 Zoom Phone & Webex Calling:</strong> Zoom Phone and Cisco Webex Calling are UCaaS platforms, not SIP trunk providers. To use them in Kenya, sign up directly: <a href="https://zoom.us/phone" target="_blank">Zoom Phone</a> | <a href="https://www.webex.com/calling" target="_blank">Webex Calling</a> (check regional availability).</div>
      `
    },

    // ============================================================
    // TOPIC 11: PBX FOR KENYA (REGIONAL)
    // ============================================================
    {
      id: 'kenya-telecom-landscape',
      title: 'Kenyan Telecom Landscape',
      priority: false,
      icon: '🇰🇪',
      bodyHTML: `
        <div class="table-wrapper">
          <table class="data-table">
            <thead><tr><th>Provider</th><th>Type</th><th>Market Position</th></tr></thead>
            <tbody>
              <tr><td><strong>Safaricom</strong></td><td>Mobile + Fixed</td><td>Dominant (70%+ market share)</td></tr>
              <tr><td><strong>Telkom Kenya</strong></td><td>Mobile + Fixed</td><td>Challenger, enterprise focus</td></tr>
              <tr><td><strong>Airtel Kenya</strong></td><td>Mobile</td><td>Strong consumer, growing enterprise</td></tr>
              <tr><td><strong>Liquid Telecom</strong></td><td>Fixed (Fibre)</td><td>Pan‑African, enterprise</td></tr>
            </tbody>
          </table>
        </div>
        <div class="info-box note"><strong>📌 Key facts:</strong> Safaricom is the largest provider with the most extensive network. Fibre penetration is increasing but still limited in rural areas. Mobile penetration is high (>80%). 4G/5G availability is widespread in urban areas.</div>
        <div class="info-box note"><strong>📌 Regulatory body:</strong> Communications Authority of Kenya (CAK) — <a href="https://ca.go.ke" target="_blank">https://ca.go.ke</a></div>
      `
    },
    {
      id: 'kenya-sip-providers',
      title: 'SIP Trunk Providers in Kenya',
      priority: false,
      icon: '📞',
      bodyHTML: `
        <div class="table-wrapper">
          <table class="data-table">
            <thead><tr><th>Provider</th><th>Type</th><th>Notes</th></tr></thead>
            <tbody>
              <tr><td><strong>Safaricom Business</strong></td><td>SIP Trunks</td><td>Largest, most reliable, enterprise focus</td></tr>
              <tr><td><strong>Telkom Kenya</strong></td><td>SIP Trunks</td><td>Good alternative, competitive pricing</td></tr>
              <tr><td><strong>Liquid Telecom</strong></td><td>SIP Trunks</td><td>Pan‑African, good for multinationals</td></tr>
              <tr><td><strong>Airtel Kenya</strong></td><td>SIP Trunks</td><td>Growing offering, good for SMEs</td></tr>
            </tbody>
          </table>
        </div>
        <div class="info-box tip"><strong>💡 Contact details:</strong>
          <ul style="margin:0.25rem 0 0 1rem;">
            <li><strong>Safaricom Business:</strong> 0733 222 333 | business@safaricom.co.ke</li>
            <li><strong>Telkom Kenya:</strong> 020 222 2222 | enterprise@telkom.co.ke</li>
            <li><strong>Liquid Telecom:</strong> 020 366 1000 | sales@liquidtelecom.com</li>
            <li><strong>Airtel Kenya:</strong> 0722 000 000 | https://www.airtel.co.ke/business</li>
          </ul>
        </div>
      `
    },
    {
      id: 'kenya-call-rates',
      title: 'Call Termination Rates in Kenya',
      priority: false,
      icon: '💰',
      bodyHTML: `
        <div class="table-wrapper">
          <table class="data-table">
            <thead><tr><th>Call Type</th><th>Approximate Rate</th><th>Notes</th></tr></thead>
            <tbody>
              <tr><td><strong>Safaricom mobile (on‑net)</strong></td><td>~KSh 1.50‑2.00/min</td><td>SIP to mobile</td></tr>
              <tr><td><strong>Other mobile (off‑net)</strong></td><td>~KSh 2.00‑3.00/min</td><td>Termination to other networks</td></tr>
              <tr><td><strong>International (outbound)</strong></td><td>Varies by destination</td><td>Depends on country</td></tr>
              <tr><td><strong>Local fixed</strong></td><td>~KSh 0.50‑1.00/min</td><td>Termination to fixed lines</td></tr>
            </tbody>
          </table>
        </div>
        <div class="info-box tip"><strong>💡 Factors affecting rates:</strong> Volume (higher volume = lower rates), Contract terms (long‑term = lower rates), Provider (Safaricom typically higher but more reliable), Time of day (peak rates higher).</div>
      `
    },
    {
      id: 'kenya-regulations',
      title: 'Kenyan Regulations (CAK)',
      priority: false,
      icon: '📜',
      bodyHTML: `
        <div class="table-wrapper">
          <table class="data-table">
            <thead><tr><th>Regulation</th><th>Implication</th></tr></thead>
            <tbody>
              <tr><td><strong>Licensing</strong></td><td>Providers must have a licence to offer voice services</td></tr>
              <tr><td><strong>Numbering</strong></td><td>DID numbers must be obtained from CAK (via providers)</td></tr>
              <tr><td><strong>Quality of Service</strong></td><td>Providers must meet QoS targets</td></tr>
              <tr><td><strong>Consumer protection</strong></td><td>Clear billing, dispute resolution</td></tr>
              <tr><td><strong>Privacy</strong></td><td>Must protect customer data</td></tr>
              <tr><td><strong>Interconnection</strong></td><td>Providers must interconnect</td></tr>
            </tbody>
          </table>
        </div>
        <div class="info-box warning"><strong>⚠️ Compliance checklist:</strong> Ensure provider is CAK‑licensed. Only use numbers allocated by CAK. Comply with privacy regulations (Kenyan Data Protection Act 2019). Maintain call records as required.</div>
      `
    },
    {
      id: 'kenya-bandwidth',
      title: 'Internet Bandwidth Considerations',
      priority: false,
      icon: '📶',
      bodyHTML: `
        <div class="table-wrapper">
          <table class="data-table">
            <thead><tr><th>User Type</th><th>Recommended Bandwidth</th><th>Notes</th></tr></thead>
            <tbody>
              <tr><td><strong>Single user (G.711)</strong></td><td>~100 kbps</td><td>Including overhead</td></tr>
              <tr><td><strong>Single user (G.729)</strong></td><td>~40 kbps</td><td>Compressed codec</td></tr>
              <tr><td><strong>10 users (G.711)</strong></td><td>1 Mbps</td><td>Concurrent calls</td></tr>
              <tr><td><strong>50 users (G.711)</strong></td><td>5 Mbps</td><td>Concurrent calls</td></tr>
              <tr><td><strong>100 users (G.711)</strong></td><td>10 Mbps</td><td>Concurrent calls</td></tr>
            </tbody>
          </table>
        </div>
        <div class="table-wrapper">
          <table class="data-table">
            <thead><tr><th>Connection Type</th><th>Best For</th></tr></thead>
            <tbody>
              <tr><td><strong>Fibre</strong></td><td>All PBX deployments (most reliable)</td></tr>
              <tr><td><strong>4G/5G</strong></td><td>Backup, remote users (best‑effort)</td></tr>
              <tr><td><strong>ADSL</strong></td><td>Not recommended (unreliable)</td></tr>
              <tr><td><strong>Leased line</strong></td><td>Enterprise (guaranteed bandwidth)</td></tr>
            </tbody>
          </table>
        </div>
        <div class="info-box tip"><strong>💡 Quality metrics:</strong> Latency < 150 ms (preferred < 100 ms), Jitter < 30 ms (< 10 ms preferred), Packet loss < 1% (< 0.1% preferred).</div>
      `
    },
    {
      id: 'kenya-hardware',
      title: 'Hardware Availability in Kenya',
      priority: false,
      icon: '🛒',
      bodyHTML: `
        <div class="table-wrapper">
          <table class="data-table">
            <thead><tr><th>Supplier</th><th>Products</th><th>Location</th></tr></thead>
            <tbody>
              <tr><td><strong>Safaricom Business</strong></td><td>IP phones, gateways</td><td>Nairobi</td></tr>
              <tr><td><strong>Telkom Kenya</strong></td><td>IP phones, gateways</td><td>Nairobi</td></tr>
              <tr><td><strong>Gadgets Computers</strong></td><td>IP phones, servers</td><td>Nairobi (Various branches)</td></tr>
              <tr><td><strong>Safaricom Shops</strong></td><td>IP phones</td><td>Nationwide</td></tr>
              <tr><td><strong>Online (Jumia, Kilimall)</strong></td><td>SIP phones, adapters</td><td>Online</td></tr>
            </tbody>
          </table>
        </div>
        <div class="table-wrapper">
          <table class="data-table">
            <thead><tr><th>Model</th><th>Approx Price (KSh)</th><th>Purpose</th></tr></thead>
            <tbody>
              <tr><td><strong>Yealink T31P</strong></td><td>8,000‑12,000</td><td>Entry‑level</td></tr>
              <tr><td><strong>Yealink T43U</strong></td><td>15,000‑20,000</td><td>Mid‑range</td></tr>
              <tr><td><strong>Yealink T54W</strong></td><td>25,000‑35,000</td><td>Premium</td></tr>
              <tr><td><strong>Grandstream GXP2130</strong></td><td>10,000‑15,000</td><td>Entry‑level</td></tr>
            </tbody>
          </table>
        </div>
        <div class="info-box tip"><strong>💡 Popular brands in Kenya:</strong> Yealink (most popular, good value), Grandstream (affordable), Cisco (enterprise).</div>
      `
    },
    {
      id: 'kenya-support',
      title: 'Local Support & Vendors in Kenya',
      priority: false,
      icon: '🤝',
      bodyHTML: `
        <div class="table-wrapper">
          <table class="data-table">
            <thead><tr><th>Vendor</th><th>Services</th><th>Contact</th></tr></thead>
            <tbody>
              <tr><td><strong>Safaricom Business</strong></td><td>PBX, SIP, UCaaS</td><td>0733 222 333</td></tr>
              <tr><td><strong>Telkom Kenya</strong></td><td>PBX, SIP, UCaaS</td><td>020 222 2222</td></tr>
              <tr><td><strong>Liquid Telecom</strong></td><td>PBX, SIP</td><td>020 366 1000</td></tr>
              <tr><td><strong>3CX Partners (Kenya)</strong></td><td>3CX installation/support</td><td>(Check 3CX website)</td></tr>
              <tr><td><strong>Asterisk Consultants</strong></td><td>Asterisk/Issabel</td><td>(Search online)</td></tr>
            </tbody>
          </table>
        </div>
        <div class="info-box tip"><strong>💡 How to find a vendor:</strong> Google search "PBX installer Kenya", Business directories (Yellow Pages Kenya), Recommendations from other businesses, LinkedIn.</div>
      `
    },

    // ============================================================
    // TOPIC 15: GLOSSARY & REFERENCE
    // ============================================================
    {
      id: 'pbx-glossary',
      title: 'PBX Terminology Glossary',
      priority: false,
      icon: '📖',
      bodyHTML: `
        <div class="table-wrapper">
          <table class="data-table">
            <thead><tr><th>Term</th><th>Definition</th></tr></thead>
            <tbody>
              <tr><td><strong>ACD</strong></td><td>Automatic Call Distribution — queuing and routing calls to agents</td></tr>
              <tr><td><strong>ATA</strong></td><td>Analogue Telephone Adapter — connects analogue phones to VoIP</td></tr>
              <tr><td><strong>Auto‑Attendant</strong></td><td>Automated system that answers and routes calls</td></tr>
              <tr><td><strong>B2BUA</strong></td><td>Back‑to‑Back User Agent — terminates and re‑originates SIP</td></tr>
              <tr><td><strong>CDR</strong></td><td>Call Detail Record — call log information</td></tr>
              <tr><td><strong>CLI</strong></td><td>Calling Line Identity — caller ID</td></tr>
              <tr><td><strong>Codec</strong></td><td>Coder/Decoder — compresses audio for VoIP</td></tr>
              <tr><td><strong>DDI / DID</strong></td><td>Direct Dialling In — external number to extension</td></tr>
              <tr><td><strong>DTMF</strong></td><td>Dual‑Tone Multi‑Frequency — telephone keypad tones</td></tr>
              <tr><td><strong>Extension</strong></td><td>Internal phone number</td></tr>
              <tr><td><strong>FXO</strong></td><td>Foreign Exchange Office — connects to PSTN line</td></tr>
              <tr><td><strong>FXS</strong></td><td>Foreign Exchange Station — connects to a phone</td></tr>
              <tr><td><strong>Gateway</strong></td><td>Bridges IP and traditional telephony</td></tr>
              <tr><td><strong>Hunt Group</strong></td><td>Group of extensions (ring in sequence or all at once)</td></tr>
              <tr><td><strong>IVR</strong></td><td>Interactive Voice Response — automated menu system</td></tr>
              <tr><td><strong>Jitter</strong></td><td>Variation in packet delay</td></tr>
              <tr><td><strong>MoH</strong></td><td>Music on Hold — music played to waiting callers</td></tr>
              <tr><td><strong>PBX</strong></td><td>Private Branch Exchange — private phone system</td></tr>
              <tr><td><strong>PSTN</strong></td><td>Public Switched Telephone Network — traditional phone network</td></tr>
              <tr><td><strong>QoS</strong></td><td>Quality of Service — prioritising voice traffic</td></tr>
              <tr><td><strong>Registrar</strong></td><td>SIP server that authenticates and registers phones</td></tr>
              <tr><td><strong>RTP</strong></td><td>Real‑time Transport Protocol — carries audio (UDP)</td></tr>
              <tr><td><strong>SBC</strong></td><td>Session Border Controller — security and NAT device</td></tr>
              <tr><td><strong>SIP</strong></td><td>Session Initiation Protocol — signalling protocol for VoIP</td></tr>
              <tr><td><strong>SIP Trunk</strong></td><td>Virtual connection to VoIP provider</td></tr>
              <tr><td><strong>Softphone</strong></td><td>Software‑based phone (PC/mobile)</td></tr>
              <tr><td><strong>SRTP</strong></td><td>Secure RTP — encrypted audio</td></tr>
              <tr><td><strong>Trunk</strong></td><td>Connection to outside world (PSTN or SIP)</td></tr>
              <tr><td><strong>VoIP</strong></td><td>Voice over IP — voice over internet</td></tr>
            </tbody>
          </table>
        </div>
      `
    },
    {
      id: 'pbx-port-reference',
      title: 'PBX Port Reference',
      priority: false,
      icon: '🔌',
      bodyHTML: `
        <div class="table-wrapper">
          <table class="data-table">
            <thead><tr><th>Protocol</th><th>Port</th><th>Type</th><th>Purpose</th></tr></thead>
            <tbody>
              <tr><td><strong>SIP</strong></td><td>5060</td><td>UDP/TCP</td><td>SIP signalling (default)</td></tr>
              <tr><td><strong>SIPS</strong></td><td>5061</td><td>UDP/TCP</td><td>SIP over TLS (encrypted)</td></tr>
              <tr><td><strong>RTP</strong></td><td>10000‑20000</td><td>UDP</td><td>Media (audio) — configurable</td></tr>
              <tr><td><strong>SSH</strong></td><td>22</td><td>TCP</td><td>Secure shell (server access)</td></tr>
              <tr><td><strong>HTTPS</strong></td><td>443</td><td>TCP</td><td>Web admin interface</td></tr>
              <tr><td><strong>HTTP</strong></td><td>80</td><td>TCP</td><td>Web admin (unsecure)</td></tr>
              <tr><td><strong>MySQL</strong></td><td>3306</td><td>TCP</td><td>Database access</td></tr>
              <tr><td><strong>NTP</strong></td><td>123</td><td>UDP</td><td>Time synchronisation</td></tr>
              <tr><td><strong>DNS</strong></td><td>53</td><td>UDP/TCP</td><td>DNS resolution</td></tr>
            </tbody>
          </table>
        </div>
        <div class="info-box tip"><strong>💡 Common port configurations:</strong>
          <ul style="margin:0.25rem 0 0 1rem;">
            <li><strong>SIP (insecure):</strong> UDP 5060 + RTP ports</li>
            <li><strong>SIP (TLS):</strong> TCP 5061 + SRTP ports</li>
            <li><strong>Web Admin:</strong> TCP 443 (HTTPS)</li>
            <li><strong>Softphone:</strong> 5060 (SIP) + RTP ports</li>
          </ul>
        </div>
      `
    },
    {
      id: 'pbx-quick-reference',
      title: 'PBX Quick Reference Cards',
      priority: false,
      icon: '📋',
      bodyHTML: `
        <h4 style="font-size:0.95rem;font-weight:600;margin:0 0 0.25rem 0;">Asterisk Quick Commands</h4>
        <div class="table-wrapper">
          <table class="data-table">
            <thead><tr><th>Action</th><th>Command</th></tr></thead>
            <tbody>
              <tr><td>Connect to CLI</td><td><code>asterisk -rvvv</code></td></tr>
              <tr><td>SIP debug on</td><td><code>sip set debug on</code></td></tr>
              <tr><td>SIP debug off</td><td><code>sip set debug off</code></td></tr>
              <tr><td>Show SIP peers</td><td><code>sip show peers</code></td></tr>
              <tr><td>Show SIP registry</td><td><code>sip show registry</code></td></tr>
              <tr><td>Reload config</td><td><code>reload</code></td></tr>
              <tr><td>Monitor logs</td><td><code>tail -f /var/log/asterisk/full</code></td></tr>
            </tbody>
          </table>
        </div>
        <h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;">SIP Response Codes</h4>
        <div class="table-wrapper">
          <table class="data-table">
            <thead><tr><th>Code</th><th>Meaning</th></tr></thead>
            <tbody>
              <tr><td><strong>200</strong></td><td>OK</td></tr>
              <tr><td><strong>401</strong></td><td>Unauthorised</td></tr>
              <tr><td><strong>403</strong></td><td>Forbidden</td></tr>
              <tr><td><strong>404</strong></td><td>Not Found</td></tr>
              <tr><td><strong>407</strong></td><td>Proxy Authentication Required</td></tr>
              <tr><td><strong>408</strong></td><td>Request Timeout</td></tr>
              <tr><td><strong>486</strong></td><td>Busy Here</td></tr>
              <tr><td><strong>500</strong></td><td>Server Internal Error</td></tr>
              <tr><td><strong>503</strong></td><td>Service Unavailable</td></tr>
              <tr><td><strong>603</strong></td><td>Decline</td></tr>
            </tbody>
          </table>
        </div>
        <h4 style="font-size:0.95rem;font-weight:600;margin:0.75rem 0 0.25rem 0;">Troubleshooting Flowchart</h4>
        <div class="code-block"><pre>Call Issue?
  ├── Internal call?
  │   ├── Yes → Check PBX logs
  │   └── No → Check trunk/provider
  ├── Audio issue?
  │   ├── No audio → Check RTP ports, NAT, codecs
  │   ├── One‑way → Check firewall, NAT, codecs
  │   └── Chopped → Check QoS, network congestion
  ├── Call drops?
  │   ├── Check logs (who sent BYE?)
  │   ├── Check network (latency, jitter)
  │   └── Check provider (contact support)
  ├── Registration issue?
  │   ├── Check credentials
  │   ├── Check network (ping provider)
  │   ├── Check firewall (port 5060)
  │   └── Check provider (registration status)
  └── Outbound issue?
      ├── Check routing rules
      ├── Check trunk status
      └── Check provider (call logs)</pre></div>
      `
    }
  ];

  function renderPBXAccordions() {
    const container = document.getElementById('js-sectionPBX-container');
    if (!container) {
      console.warn('⚠️ PBX accordion container not found');
      return;
    }

    let html = '';
    SECTION_PBX_ACCORDIONS.forEach(item => {
      html += `
        <div class="accordion" data-searchable>
          <button type="button" class="accordion-header" onclick="toggleAccordion(this)" aria-expanded="false">
            <div class="accordion-title">
              <span class="acc-icon" aria-hidden="true">${item.icon}</span>
              ${item.title}
            </div>
            <svg class="accordion-chevron" width="16" height="16" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"/>
            </svg>
          </button>
          <div class="accordion-body">
            ${item.bodyHTML}
          </div>
        </div>
      `;
    });

    container.innerHTML = html;
  }

  renderPBXAccordions();

}); // DOMContentLoaded end