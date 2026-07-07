// ============================================================
// PILLAR 1: NETWORKING – FLASHCARDS & QUIZ (only pillar-specific)
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
  //----- FLASHCARD DATA & RENDERING -----
  const FLASHCARDS = [
    // Original cards (23)
    { term: "OSI Model mnemonic", answer: "All People Seem To Need Data Processing — layers 7 to 1: Application, Presentation, Session, Transport, Network, Data Link, Physical" },
    { term: "PDU at Layer 4", answer: "Segment — TCP breaks data into numbered segments with source/destination port numbers and sequence numbers" },
    { term: "PDU at Layer 3", answer: "Packet — IP wraps the segment adding source and destination IP addresses. Routers forward at this layer" },
    { term: "PDU at Layer 2", answer: "Frame — Ethernet wraps the packet with MAC addresses + FCS trailer. Switches operate here" },
    { term: "RFC 1918 private ranges", answer: "10.0.0.0/8 (enterprise) · 172.16.0.0/12 (mid-size) · 192.168.0.0/16 (home/office)" },
    { term: "APIPA range", answer: "169.254.0.0/16 — self-assigned when DHCP fails. Seeing 169.254.x.x = DHCP unreachable" },
    { term: "Loopback address", answer: "127.0.0.1 — traffic sent here never leaves the host. Also accessible as 'localhost'" },
    { term: "Subnet formula: usable hosts", answer: "2^(host bits) − 2. Subtract 2 for network address and broadcast address" },
    { term: "CIDR /26 — key facts", answer: "Mask: 255.255.255.192 · Block size: 64 · Usable hosts: 62 · Subnets from /24: 4" },
    { term: "TCP three-way handshake", answer: "SYN (client initiates) → SYN-ACK (server confirms + sends seq) → ACK (client confirms). Connection established" },
    { term: "DNS port and protocol", answer: "Port 53. UDP for standard queries (small, fast). TCP for large responses (zone transfers, 512+ byte replies)" },
    { term: "NAT vs PAT", answer: "NAT = IP translation only (one private per public). PAT = IP + port translation (many private per public IP)" },
    { term: "Stateful vs stateless firewall", answer: "Stateless: examines each packet in isolation. Stateful: tracks connection state table — only allows responses to established outbound connections" },
    { term: "ARP purpose", answer: "Address Resolution Protocol — resolves IP addresses to MAC addresses within a subnet. Broadcasts 'Who has x.x.x.x?' and caches the reply" },
    { term: "Default gateway", answer: "The router's private-side IP configured on every device. Traffic to destinations outside the local subnet is forwarded here" },
    { term: "SYN flood attack", answer: "Attacker sends many SYN packets but never completes the handshake. Target's connection table fills with half-open connections, refusing legitimate traffic" },
    { term: "VLSM golden rule", answer: "Always allocate subnets from largest host requirement to smallest. Prevents large subnets consuming space needed by smaller ones" },
    { term: "BGP", answer: "Border Gateway Protocol — holds the public internet together. ISPs use it to advertise address blocks and determine routing paths globally" },
    { term: "FCS", answer: "Frame Check Sequence — a checksum trailer added at Layer 2. Receiver recalculates; mismatch = frame corrupted and discarded. Only footer in the stack" },
    { term: "IPv6 shortening rules", answer: "Rule 1: drop leading zeros in each group (0db8 → db8). Rule 2: replace one consecutive run of all-zero groups with :: (can appear only once)" },
    { term: "T568B mnemonic", answer: "O · G · B · G · B (2-1-2-1-2): Orange×2 → White/Green → Blue×2 → Green → Brown×2. Dominant standard for commercial and home cabling." },
    { term: "RJ45 T568A vs T568B difference", answer: "Only the orange and green pairs swap. Pins 4,5 (blue) and 7,8 (brown) are identical in both. T568B: Orange leads. T568A: Green leads." },
    { term: "Straight-through vs crossover cable", answer: "Straight-through: both ends T568B — connects different device types (PC→switch). Crossover: T568A one end, T568B other — connects same device types (PC→PC)." }, 
    // New cards (15)
    { term: "OSI Layer 7 protocols", answer: "HTTP, HTTPS, FTP, SMTP, SSH, DNS — Application layer protocols that enable communication between applications and the network" },
    { term: "OSI Layer 4 protocols", answer: "TCP (Transmission Control Protocol) — reliable, connection-oriented. UDP (User Datagram Protocol) — fast, connectionless" },
    { term: "OSI Layer 3 protocols", answer: "IP (Internet Protocol) — routing and addressing. ICMP (Internet Control Message Protocol) — used by ping and traceroute" },
    { term: "Difference between hub, switch, router", answer: "Hub: broadcasts to all ports (obsolete). Switch: forwards based on MAC address. Router: forwards based on IP address between networks" },
    { term: "Public vs private IP addresses", answer: "Public: globally unique, routable on internet, assigned by IANA. Private: RFC 1918 ranges, reusable, not routable on internet" },
    { term: "What is a subnet mask?", answer: "32-bit number that separates IP address into network and host portions. 1s = network bits, 0s = host bits. Example: 255.255.255.0 = /24" },
    { term: "CIDR notation explained", answer: "Classless Inter-Domain Routing — writes IP address followed by slash and prefix length. /24 means first 24 bits are network, 8 bits are hosts" },
    { term: "Broadcast address vs multicast address", answer: "Broadcast: sent to ALL devices on network (255.255.255.255). Multicast: sent to specific group of devices (224.0.0.0 to 239.255.255.255)" },
    { term: "What is NAT overloading (PAT)?", answer: "Port Address Translation — maps multiple private IPs to one public IP using unique source port numbers. Most common form of NAT in home routers" },
    { term: "DNS record types — A vs AAAA vs CNAME", answer: "A: IPv4 address. AAAA: IPv6 address. CNAME: alias/canonical name (maps one hostname to another)" },
    { term: "TCP congestion control algorithms", answer: "Slow start (exponential growth) → Congestion avoidance (linear growth) → Fast retransmit/fast recovery (on packet loss)" },
    { term: "UDP use cases (why not TCP)", answer: "DNS queries (small, fast), VoIP (latency-sensitive), video streaming (dropped frames better than delay), DHCP (no IP yet)" },
    { term: "What is ARP poisoning/spoofing?", answer: "Attacker sends fake ARP replies, associating their MAC address with another device's IP. Traffic intended for that device goes to attacker instead" },
    { term: "Difference between IDS and IPS", answer: "IDS (Intrusion Detection System): monitors and alerts. IPS (Intrusion Prevention System): monitors and actively blocks/threatens traffic" },
    { term: "What is the DMZ in networking?", answer: "Demilitarized Zone — network segment between internet and internal network. Hosts public-facing servers (web, email). If compromised, internal network remains protected" }
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

  // Render sections
  renderAccordion('js-section1-container', SECTION_1_ACCORDIONS);
  renderAccordion('js-section2-container', SECTION_2_ACCORDIONS);
  renderAccordion('js-section3-container', SECTION_3_ACCORDIONS);
  renderAccordion('js-section4-container', SECTION_4_ACCORDIONS);
  renderAccordion('js-section5-container', SECTION_5_ACCORDIONS);
  renderAccordion('js-section6-container', SECTION_6_ACCORDIONS);
  renderAccordion('js-section7-container', SECTION_7_ACCORDIONS);

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
  
  // ----- QUIZ DATA SETS -----
  const QUIZ_SETS = {
    // SET 1 – Core Networking Fundamentals (Original 10 questions)
    1: [
      {
        q: "Which OSI layer is responsible for logical addressing and routing packets across multiple networks?",
        options: ["Layer 2 — Data Link", "Layer 3 — Network", "Layer 4 — Transport", "Layer 7 — Application"],
        correct: 1,
        explain: "Layer 3 (Network) handles IP addressing and routing. Routers operate exclusively at this layer, reading the IP header to forward packets hop-by-hop."
      },
      {
        q: "What is the correct formula for calculating the number of usable host addresses in a subnet?",
        options: ["2^(host bits)", "2^(host bits) − 1", "2^(host bits) − 2", "2^(prefix length) − 2"],
        correct: 2,
        explain: "2^(host bits) − 2. You subtract 2 to exclude the network address (host bits all zeros) and broadcast address (host bits all ones)."
      },
      {
        q: "A device on your network has the IP address 169.254.45.12. What does this indicate?",
        options: ["The device has a valid DHCP-assigned address", "The device cannot reach a DHCP server and has self-assigned an APIPA address", "The device is using a loopback address", "The device is on the 172.16.0.0/12 private range"],
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
        explain: "SYN (client initiates) → SYN-ACK (server acknowledges and sends its sequence number) → ACK (client confirms). Connection is now established."
      },
      {
        q: "Which statement correctly describes the difference between a stateless and stateful firewall?",
        options: ["A stateless firewall is slower because it checks every packet twice", "A stateful firewall tracks the connection state table and only allows inbound packets matching established outbound connections", "A stateless firewall tracks MAC addresses; stateful tracks IP addresses", "A stateful firewall only works at layer 2"],
        correct: 1,
        explain: "A stateful firewall maintains a state table of active connections. Inbound packets that don't match an established outbound connection are dropped."
      },
      {
        q: "What is the purpose of ARP (Address Resolution Protocol)?",
        options: ["It translates domain names to IP addresses", "It assigns IP addresses to devices on a network", "It resolves IP addresses to MAC addresses within the same subnet", "It encrypts traffic between two devices"],
        correct: 2,
        explain: "ARP resolves an IP address to its corresponding MAC address on the local subnet. The device broadcasts 'Who has IP x.x.x.x?' and the owner replies with its MAC address."
      },
      {
        q: "A DNS query for 'www.example.com' reaches a recursive resolver that has no cached answer. What is the correct order of servers it contacts?",
        options: ["Authoritative NS → TLD server → Root server", "TLD server → Root server → Authoritative NS", "Root server → TLD server → Authoritative NS", "Root server → Authoritative NS → TLD server"],
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
      }
    ],

    // SET 2 – Subnetting & CIDR (New)
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
      }
    ],

    // SET 3 – Network Security & Advanced Topics (New)
    3: [
      {
        q: "What type of attack sends TCP SYN packets but never completes the handshake?",
        options: ["DDoS", "SYN flood", "ARP spoofing", "IP spoofing"],
        correct: 1,
        explain: "SYN flood attack sends many SYN packets without ACK, exhausting the target's connection table."
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
        options: ["Increase bandwidth", "Segment a physical network into logical broadcast domains", "Encrypt traffic between switches", "Provide redundancy"],
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

}); // DOMContentLoaded end