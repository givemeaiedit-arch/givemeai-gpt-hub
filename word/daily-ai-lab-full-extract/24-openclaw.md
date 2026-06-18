# OpenClaw
Source: https://ailab.learnnakdev.online/docs/openclaw
Pages captured: 7

## Page 1 (หน้า 1 / 2)
```text
OpenClaw
คู่มืออย่างเป็นทางการ
7 เอกสาร
เริ่มต้น
OpenClaw คืออะไร — AI Agent โอเพนซอร์สที่รันบนเครื่องคุณเอง

ภาพรวม OpenClaw เกตเวย์ AI agent โอเพนซอร์ส และวิธีเริ่มต้น (ติดตั้ง → onboard → แชท) ·  6 นาที

หน้า 1 / 2
OpenClaw — ผู้ช่วย AI ส่วนตัวแบบโอเพนซอร์ส 🦞

เรียบเรียงเป็นภาษาไทยจากเอกสารทางการ docs.openclaw.ai — โดยเฉพาะหน้า Getting Started

OpenClaw คือ AI agent โอเพนซอร์ส (ฟรี) ที่ รันบนเครื่องของคุณเอง (self-hosted) ทำหน้าที่เป็น Gateway (เกตเวย์) เชื่อมโมเดลภาษา (Claude, GPT, Gemini, DeepSeek, Grok หรือโมเดลโลคัล) เข้ากับ ไฟล์ เชลล์ เบราว์เซอร์ แอปแชต และบริการต่าง ๆ — แล้วคุยกับมันได้จากแอปแชตที่คุณใช้อยู่ทุกวัน

มาสคอตคือ "กุ้งล็อบสเตอร์" 🦞 และสโลแกนคือ "Any OS. Any Platform. The lobster way."

📖 คำศัพท์ที่ควรรู้
คำศัพท์	ความหมายง่าย ๆ
Agent	AI ที่ "ลงมือทำ" ได้เอง ไม่ใช่แค่ตอบแชต (เปิดไฟล์ รันคำสั่ง ค้นเว็บ ฯลฯ)
Gateway	ตัวกลางที่รันบนเครื่องคุณ คอยรับข้อความจากแอปแชตแล้วส่งให้ AI ทำงาน
Channel	ช่องทางแชตที่เชื่อมเข้ามา เช่น Discord, Slack, Telegram, WhatsApp
Provider	ผู้ให้บริการโมเดล (Anthropic, OpenAI, Google ฯลฯ) ที่ต้องมี API key
Self-hosted	รันเองบนเครื่อง/เซิร์ฟเวอร์ของคุณ ข้อมูลไม่ผ่านคนกลาง
⭐ จุดเด่น
โอเพนซอร์ส + รันเอง — ควบคุมข้อมูลและความเป็นส่วนตัวได้เต็มที่
เชื่อมแอปแชตได้หลายตัว — Discord, Google Chat, iMessage, Matrix, Microsoft Teams, Signal, Slack, Telegram, WhatsApp, Zalo และอื่น ๆ
เลือกโมเดลได้อิสระ — ต่อกับ Claude/GPT/Gemini/Grok/DeepSeek หรือโมเดลโลคัล
ทำงานจริงบนเครื่อง — เข้าถึงไฟล์ เชลล์ เบราว์เซอร์ และเครื่องมืออื่น ๆ
มีระบบความปลอดภัย — โทเคน, allowlist, การแยกพื้นที่ทำงาน (workspace isolation), เซสชันแยกต่อ agent
🚀 เริ่มต้นใน ~5 นาที

สิ่งที่ต้องมี: Node.js (แนะนำเวอร์ชัน 24, รองรับ 22.19+) และ API key จากผู้ให้บริการโมเดลสักเจ้า (เช่น Anthropic, OpenAI, Google)

ขั้นตอน:

ติดตั้ง — รันสคริปต์ติดตั้ง (macOS/Linux ผ่าน bash, Windows ผ่าน PowerShell)
Onboarding — รัน openclaw onboard --install-daemon เพื่อตั้งค่าเริ่มต้น + ติดตั้ง daemon
เช็คสถานะ Gateway — openclaw gateway status
เปิดแดชบอร์ด — openclaw dashboard
ส่งข้อความแรก ผ่านหน้า Control UI — เสร็จแล้วจะได้ Gateway ที่ทำงาน + ตั้งค่า auth + เซสชันแชตพร้อมใช้

ตั้งค่าเพิ่มเติมได้ผ่าน environment variable เช่น OPENCLAW_HOME, OPENCLAW_STATE_DIR, OPENCLAW_CONFIG_PATH และปรับ Control UI ที่ gateway.controlUi.root

ก้าวต่อไป: เชื่อมช่องทางแชต (Discord/Slack/Telegram ฯลฯ), ตั้งค่า safety pairing, ปรับแต่ง Gateway หรือสำรวจเครื่องมือที่มี

📚 สารบัญเอกสาร OpenClaw (เรียงตาม official docs)
✅ ภาพรวม OpenClaw (หน้านี้)
⏳ Getting Started — ติดตั้งและแชตครั้งแรก
⏳ Core Gateway — การตั้งค่า, โทเคน, การตั้ง provider
⏳ Channels — เชื่อมแชต (Discord, Slack, Telegram, WhatsApp, Teams ฯลฯ)
⏳ Routing & Media — การกำหนดเส้นทางข้อความและสื่อ
⏳ Tools — เครื่องมือที่ agent ใช้ได้
⏳ Safety & Workspace — allowlist, โทเคน, การแยกพื้นที่ทำงาน
🔗 อ้างอิง (เอกสารทางการ)
เอกสารหลัก: https://docs.openclaw.ai/
เริ่มต้น: https://docs.openclaw.ai/start/getting-started
ซอร์สโค้ด (GitHub): https://github.com/openclaw/openclaw
 ก่อนหน้า
ถัดไป
OpenClaw: เริ่มต้นใช้งาน (ติดตั้ง → onboard → แชต)
```

## Page 2 (หน้า 2 / 2)
```text
OpenClaw
คู่มืออย่างเป็นทางการ
7 เอกสาร
เริ่มต้น
OpenClaw: เริ่มต้นใช้งาน (ติดตั้ง → onboard → แชต)

ติดตั้ง OpenClaw รัน onboarding และคุยกับผู้ช่วย AI ได้ใน ~5 นาที ·  5 นาที

หน้า 2 / 2
เริ่มต้นใช้งาน OpenClaw

เรียบเรียงจากเอกสารทางการ Getting Started

เป้าหมาย: ติดตั้ง OpenClaw, ตั้งค่าเริ่มต้น (onboarding) และมี Gateway ที่ทำงาน + เซสชันแชตพร้อมใช้ ภายในประมาณ 5 นาที

✅ สิ่งที่ต้องมีก่อน
Node.js — แนะนำเวอร์ชัน 24 (รองรับตั้งแต่ 22.19+)
API key จากผู้ให้บริการโมเดลสักเจ้า — Anthropic (Claude), OpenAI (GPT), Google (Gemini) ฯลฯ
🚀 ขั้นตอน
ติดตั้ง — รันสคริปต์ติดตั้ง (macOS/Linux ใช้ bash, Windows ใช้ PowerShell) ตามคำสั่งในหน้า Getting Started ทางการ
Onboarding — รัน:
openclaw onboard --install-daemon

ตัวช่วยจะพาตั้งค่า provider/โทเคน และติดตั้ง daemon (ให้ Gateway รันค้างเป็นบริการ)
ตรวจสถานะ Gateway:
openclaw gateway status

เปิดแดชบอร์ด:
openclaw dashboard

ส่งข้อความแรก ผ่านหน้า Control UI — ถ้าตอบกลับได้ แปลว่าทุกอย่างพร้อมแล้ว
⚙️ ตั้งค่าเพิ่มเติม (ทางเลือก)
ปรับ path/สถานะผ่าน environment variable: OPENCLAW_HOME, OPENCLAW_STATE_DIR, OPENCLAW_CONFIG_PATH
ปรับโฟลเดอร์หน้า Control UI ที่ gateway.controlUi.root
ก้าวต่อไป

เชื่อมช่องทางแชต (ดูหัวข้อ Channels), เปิดใช้ความปลอดภัย (Security), หรือสำรวจ Tools & Plugins

 ก่อนหน้า
OpenClaw คืออะไร — AI Agent โอเพนซอร์สที่รันบนเครื่องคุณเอง
ถัดไป
OpenClaw: Channels — เชื่อมแอปแชต
```

## Page 3 (หน้า 1 / 2)
```text
OpenClaw
คู่มืออย่างเป็นทางการ
7 เอกสาร
ระดับกลาง
OpenClaw: Channels — เชื่อมแอปแชต

เชื่อม OpenClaw เข้ากับ Discord, Slack, Telegram, WhatsApp, Teams และอื่น ๆ เพื่อคุยกับ AI จากแอปที่ใช้ทุกวัน ·  5 นาที

หน้า 1 / 2
Channels — เชื่อมแอปแชตเข้ากับ OpenClaw

เรียบเรียงจากเอกสารทางการ docs.openclaw.ai หมวด Channels

Channel คือช่องทางแชตที่ต่อเข้ากับ Gateway เพื่อให้คุณคุยกับผู้ช่วย AI จากแอปที่ใช้ทุกวัน แทนที่จะต้องเปิดหน้า Control UI เสมอ

💬 ช่องทางที่รองรับ (built-in)
Discord
Slack
Telegram
WhatsApp
Microsoft Teams
Google Chat
Signal
iMessage
Matrix
Zalo
WebChat (หน้าแชตในเบราว์เซอร์)

และมี ปลั๊กอินจากชุมชน เพิ่มเติม เช่น Nostr และ Twitch

🔌 วิธีเชื่อม (ภาพรวม)

แต่ละช่องทางมีขั้นตอนตั้งค่าของตัวเอง แต่หลักการคล้ายกัน:

สร้าง bot/แอปในแพลตฟอร์มนั้น (เช่น Discord Bot, Telegram Bot จาก BotFather) แล้วได้ token
ใส่ token ลงในไฟล์ตั้งค่าของ OpenClaw (ดูหัวข้อ Gateway Configuration)
รีสตาร์ท Gateway แล้วทักหา bot ในแอปนั้นได้เลย
🛡️ ความปลอดภัยของแชตกลุ่ม
ตั้ง allowlist ว่าใครคุยกับ AI ได้ (เช่น channels.whatsapp.allowFrom)
ในกลุ่ม ตั้งให้ตอบเฉพาะเมื่อถูก mention (พิมพ์ @ ถึง bot) เพื่อกันมันตอบทุกข้อความ
แยกเซสชันต่อผู้ส่ง/ต่อกลุ่ม (ดูหัวข้อ Routing)

มือถือ: ดูหัวข้อ Nodes สำหรับการต่อ iOS/Android เป็นช่องทาง/อุปกรณ์เสริม

 ก่อนหน้า
OpenClaw: เริ่มต้นใช้งาน (ติดตั้ง → onboard → แชต)
ถัดไป
OpenClaw: Gateway Configuration — ตั้งค่าหลัก
```

## Page 4 (หน้า 2 / 2)
```text
OpenClaw
คู่มืออย่างเป็นทางการ
7 เอกสาร
ระดับกลาง
OpenClaw: Gateway Configuration — ตั้งค่าหลัก

ตั้งค่า Gateway ของ OpenClaw — provider/โมเดล, โทเคน, path และไฟล์ config ·  5 นาที

หน้า 2 / 2
Gateway Configuration — ตั้งค่าหลักของ OpenClaw

เรียบเรียงจากเอกสารทางการ docs.openclaw.ai หมวด Gateway

Gateway คือหัวใจของ OpenClaw — โปรเซสเดียวที่รันบนเครื่องคุณ ทำหน้าที่เป็นสะพานเชื่อมแอปแชตเข้ากับโมเดล AI การตั้งค่าส่วนใหญ่อยู่ที่นี่

🧠 Provider & โมเดล
ต้องมี API key ของผู้ให้บริการที่เลือก (Anthropic / OpenAI / Google ฯลฯ)
เอกสารทางการแนะนำให้ใช้ โมเดลรุ่นล่าสุดที่แรงที่สุด เพื่อคุณภาพและความปลอดภัยของ agent
กำหนด provider/โมเดล/โทเคน ในไฟล์ตั้งค่า
🔑 โทเคนและช่องทาง
โทเคนของแต่ละ channel (Discord, Telegram ฯลฯ) ใส่ในส่วน config ของช่องทางนั้น
โทเคนเข้าถึง Gateway/Control UI สำหรับยืนยันตัวตน
📁 ตำแหน่งไฟล์และ path

ปรับผ่าน environment variable ได้:

ตัวแปร	ใช้ทำอะไร
OPENCLAW_HOME	โฟลเดอร์หลักของ OpenClaw
OPENCLAW_STATE_DIR	ที่เก็บสถานะ/ข้อมูลรันไทม์
OPENCLAW_CONFIG_PATH	path ไฟล์ config
gateway.controlUi.root	โฟลเดอร์หน้า Control UI (ปรับแต่งเองได้)
🔧 คำสั่งที่ใช้บ่อย
openclaw onboard --install-daemon   # ตั้งค่าเริ่มต้น + ติดตั้งบริการ
openclaw gateway status             # เช็คว่า Gateway ทำงานอยู่ไหม
openclaw dashboard                  # เปิดหน้าควบคุม


หลังแก้ config ให้รีสตาร์ท Gateway เพื่อให้ค่าใหม่มีผล

 ก่อนหน้า
OpenClaw: Channels — เชื่อมแอปแชต
ถัดไป
OpenClaw: Multi-Agent Routing — แยกเซสชันและพื้นที่ทำงาน
```

## Page 5 (หน้า 1 / 3)
```text
OpenClaw
คู่มืออย่างเป็นทางการ
7 เอกสาร
ขั้นโปร
OpenClaw: Multi-Agent Routing — แยกเซสชันและพื้นที่ทำงาน

จัดเส้นทางข้อความไปหลาย agent และแยกเซสชัน/พื้นที่ทำงานเพื่อความปลอดภัยและความเป็นระเบียบ ·  4 นาที

หน้า 1 / 3
Multi-Agent Routing — หลาย agent, แยกพื้นที่กัน

เรียบเรียงจากเอกสารทางการ docs.openclaw.ai หมวด Routing

OpenClaw รองรับการมี หลาย agent และจัดเส้นทาง (routing) ข้อความให้ไปหา agent ที่ถูกต้อง พร้อม แยกเซสชัน เพื่อไม่ให้ข้อมูลของคนหนึ่งปนกับอีกคน

🧩 แนวคิดหลัก
Workspace isolation — แต่ละ agent/พื้นที่ทำงานแยกกัน ไฟล์/บริบทไม่ปนกัน
เซสชันแยกต่อ agent / workspace / ผู้ส่ง — เช่น แต่ละคนในกลุ่มมีบทสนทนาของตัวเอง
Routing — กำหนดว่าข้อความจากช่องทาง/ผู้ส่งไหน ควรไปหา agent ตัวใด
💡 ทำไมถึงสำคัญ
ความปลอดภัย — กันไม่ให้บริบท/สิทธิ์ของคนหนึ่งรั่วไปอีกคน
ความเป็นระเบียบ — งานคนละโปรเจกต์/คนละทีม ใช้ agent คนละตัว
ความต่อเนื่อง — แต่ละเซสชันจำบริบทของตัวเองได้ ไม่สับสน

ใช้คู่กับหัวข้อ Security (allowlist, การ mention ในกลุ่ม) เพื่อคุมว่าใครเข้าถึง agent ตัวไหนได้

 ก่อนหน้า
OpenClaw: Gateway Configuration — ตั้งค่าหลัก
ถัดไป
OpenClaw: Security — โทเคน, allowlist และการคุมความปลอดภัย
```

## Page 6 (หน้า 2 / 3)
```text
OpenClaw
คู่มืออย่างเป็นทางการ
7 เอกสาร
ขั้นโปร
OpenClaw: Security — โทเคน, allowlist และการคุมความปลอดภัย

คุมว่าใครคุยกับ AI ได้ และทำให้ agent ที่เข้าถึงเครื่อง/ไฟล์ทำงานอย่างปลอดภัย ·  4 นาที

หน้า 2 / 3
Security — ความปลอดภัยของ OpenClaw

เรียบเรียงจากเอกสารทางการ docs.openclaw.ai หมวด Security

เพราะ OpenClaw เป็น agent ที่เข้าถึง ไฟล์ เชลล์ และเครื่องมือบนเครื่องคุณ การคุมความปลอดภัยจึงสำคัญมาก โดยเฉพาะเมื่อเชื่อมกับแชตสาธารณะ/กลุ่ม

🔒 มาตรการหลัก
Allowlist — กำหนดรายชื่อผู้ที่คุยกับ agent ได้ (เช่น channels.whatsapp.allowFrom) คนนอกลิสต์จะถูกเมิน
ต้อง mention ในกลุ่ม — ในแชตกลุ่ม ตั้งให้ตอบเฉพาะเมื่อถูกพิมพ์ @ ถึง เพื่อกันการตอบทุกข้อความ
แยกเซสชันต่อผู้ส่ง — บริบท/สิทธิ์ของแต่ละคนไม่ปนกัน (ดู Routing)
โทเคน — ใช้ยืนยันตัวตนเข้าถึง Gateway/Control UI
✅ แนวทางที่ดี
ใช้ allowlist เสมอเมื่อเปิดให้เข้าจากแชตสาธารณะ
ใช้โมเดลรุ่นล่าสุดที่แรง (ตามคำแนะนำทางการ) เพราะเข้าใจเจตนาและกัน prompt injection ได้ดีกว่า
จำกัดสิทธิ์เครื่องมือ/โฟลเดอร์ที่ agent เข้าถึงได้เท่าที่จำเป็น
ตรวจ log/กิจกรรมเป็นระยะ

OpenClaw รันบนเครื่องคุณเอง (self-hosted) — ข้อมูลไม่ผ่านคนกลาง แต่ความรับผิดชอบเรื่องการตั้งค่าให้ปลอดภัยก็อยู่ที่คุณด้วย

 ก่อนหน้า
OpenClaw: Multi-Agent Routing — แยกเซสชันและพื้นที่ทำงาน
ถัดไป
OpenClaw: Tools & Plugins — เครื่องมือและส่วนขยาย
```

## Page 7 (หน้า 3 / 3)
```text
OpenClaw
คู่มืออย่างเป็นทางการ
7 เอกสาร
ขั้นโปร
OpenClaw: Tools & Plugins — เครื่องมือและส่วนขยาย

เครื่องมือที่ agent ใช้ได้ ปลั๊กอินช่องทางเสริม และการต่อมือถือ (Nodes) ·  4 นาที

หน้า 3 / 3
Tools & Plugins — ขยายความสามารถ OpenClaw

เรียบเรียงจากเอกสารทางการ docs.openclaw.ai หมวด Tools & Plugins / Nodes

OpenClaw ขยายความสามารถได้หลายทาง — ตั้งแต่เครื่องมือที่ agent เรียกใช้ ไปจนถึงปลั๊กอินช่องทางและอุปกรณ์มือถือ

🧰 เครื่องมือ (Tools)

agent ใช้เครื่องมือเพื่อ "ลงมือทำ" ได้จริง เช่น เข้าถึงไฟล์ รันคำสั่งในเชลล์ คุมเบราว์เซอร์ และจัดการสื่อ (รูป/เสียง/เอกสาร) — ทำให้ไม่ใช่แค่แชตตอบ แต่ทำงานให้เสร็จได้

🧩 Plugins (ส่วนขยาย)
Channel plugins — เพิ่มช่องทางแชตนอกเหนือจาก built-in เช่น Nostr, Twitch (จากชุมชน)
ส่วนขยายแบบ bundled หรือ external ที่เพิ่มความสามารถเฉพาะทาง
📱 Nodes — ต่อมือถือ

OpenClaw รองรับการต่อ iOS / Android เป็น "node" เพื่อเปิดความสามารถเสริม เช่น เวิร์กโฟลว์ผ่านกล้อง/Canvas และใช้มือถือเป็นช่องทาง/อุปกรณ์ของ agent

🌐 Web Control UI

หน้าควบคุมในเบราว์เซอร์ (openclaw dashboard) ใช้ดูสถานะ ตั้งค่า และแชตกับ agent ได้โดยตรง ปรับแต่งโฟลเดอร์หน้าได้ที่ gateway.controlUi.root

ดูการตั้งค่าโทเคน/ความปลอดภัยของแต่ละเครื่องมือในหัวข้อ Gateway Configuration และ Security

 ก่อนหน้า
OpenClaw: Security — โทเคน, allowlist และการคุมความปลอดภัย
ถัดไป
```


---

## Beginner Guide

### OpenClaw

Source: daily-ai-lab-ai-tools-32page-beginner-guide.docx

![OpenClaw](assets/openclaw.png)

**หมวด:** Chat / Agent / Coding / App
**บทเรียนใน /docs:** 7 หน้า

**ใช้ทำอะไร**
ภาพรวม OpenClaw เกตเวย์ AI agent โอเพนซอร์ส และวิธีเริ่มต้น (ติดตั้ง → onboard → แชท)

**พื้นฐานที่ควรรู้**
พื้นฐานที่ควรรู้คือ prompt, context, file, workspace, และการตรวจผลลัพธ์ก่อนนำไปใช้งานจริง. มือใหม่ควรเริ่มจากงานเล็กที่วัดผลได้ เช่น สรุปเอกสาร แก้โค้ดสั้น ๆ หรือทำต้นแบบหน้าเว็บหนึ่งหน้า

**เหมาะกับมือใหม่แบบไหน**
เครื่องมือนี้เหมาะกับผู้เริ่มต้นที่อยากฝึกงาน Chat / Agent / Coding / App แบบสั้นและดูผลลัพธ์ได้เร็ว

**วิธีเริ่มแบบสั้น**
1. เปิด workspace หรือแชท แล้วให้โจทย์เดียวที่ชัดเจนพร้อมบริบทที่จำเป็น
2. แนบไฟล์ ตัวอย่าง หรือเป้าหมายที่อยากได้ เพื่อให้โมเดลอ่านภาพรวมได้เร็ว
3. ตรวจผลลัพธ์รอบแรก แล้วให้แก้แบบเฉพาะจุด เช่น tone, logic, code style หรือ structure

**ราคา/Plan**
Open-source/self-hosted; base app is free, while connected models/providers cost extra.

**สิ่งที่ควรจำ**
- จุดแข็ง: เครื่องมือนี้เหมาะกับผู้เริ่มต้นที่อยากฝึกงาน Chat / Agent / Coding / App แบบสั้นและดูผลลัพธ์ได้เร็ว
- ข้อควรระวัง: ระวัง prompt ที่กว้างเกินไปและตรวจโค้ดหรือเอกสารทุกครั้งก่อนนำไปใช้จริง.

**ตัวอย่างเริ่มต้น**
ตัวอย่างงานเริ่มต้น: ช่วยฉันทำงานนี้ให้จบในรอบแรก: งานเริ่มต้นของฉัน. นี่คือบริบทที่มีอยู่: ฉันมีเป้าหมายชัดและอยากได้ผลลัพธ์ที่ตรวจสอบได้. ขอผลลัพธ์เป็นขั้นตอนชัดเจนและตรวจสอบได้

---

---

<!-- merged-beginner-guide:OpenClaw -->
## คู่มือพื้นฐานของ OpenClaw

**หมวด:** Chat / Agent / Coding / App
**บทเรียนใน /docs:** 7 หน้า

**ใช้ทำอะไร**
ภาพรวม OpenClaw เกตเวย์ AI agent โอเพนซอร์ส และวิธีเริ่มต้น (ติดตั้ง → onboard → แชท)

**พื้นฐานที่ควรรู้**
พื้นฐานที่ควรรู้คือ prompt, context, file, workspace, และการตรวจผลลัพธ์ก่อนนำไปใช้งานจริง. มือใหม่ควรเริ่มจากงานเล็กที่วัดผลได้ เช่น สรุปเอกสาร แก้โค้ดสั้น ๆ หรือทำต้นแบบหน้าเว็บหนึ่งหน้า

**เหมาะกับมือใหม่แบบไหน**
เครื่องมือนี้เหมาะกับผู้เริ่มต้นที่อยากฝึกงาน Chat / Agent / Coding / App แบบสั้นและดูผลลัพธ์ได้เร็ว

**วิธีเริ่มแบบสั้น**
1. เปิด workspace หรือแชท แล้วให้โจทย์เดียวที่ชัดเจนพร้อมบริบทที่จำเป็น
2. แนบไฟล์ ตัวอย่าง หรือเป้าหมายที่อยากได้ เพื่อให้โมเดลอ่านภาพรวมได้เร็ว
3. ตรวจผลลัพธ์รอบแรก แล้วให้แก้แบบเฉพาะจุด เช่น tone, logic, code style หรือ structure

**ราคา/Plan**
Open-source/self-hosted; base app is free, while connected models/providers cost extra.

**สิ่งที่ควรจำ**
- จุดแข็ง: เครื่องมือนี้เหมาะกับผู้เริ่มต้นที่อยากฝึกงาน Chat / Agent / Coding / App แบบสั้นและดูผลลัพธ์ได้เร็ว
- ข้อควรระวัง: ระวัง prompt ที่กว้างเกินไปและตรวจโค้ดหรือเอกสารทุกครั้งก่อนนำไปใช้จริง.

**ตัวอย่างเริ่มต้น**
ตัวอย่างงานเริ่มต้น: ช่วยฉันทำงานนี้ให้จบในรอบแรก: งานเริ่มต้นของฉัน. นี่คือบริบทที่มีอยู่: ฉันมีเป้าหมายชัดและอยากได้ผลลัพธ์ที่ตรวจสอบได้. ขอผลลัพธ์เป็นขั้นตอนชัดเจนและตรวจสอบได้

---

![OpenRouter](assets/openrouter.png)
