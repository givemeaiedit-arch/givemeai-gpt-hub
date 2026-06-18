# Codex
Source: https://ailab.learnnakdev.online/docs/codex
Pages captured: 11

## Page 1 (หน้า 1 / 3)
```text
Codex
คู่มืออย่างเป็นทางการ
11 เอกสาร
เริ่มต้น
ภาพรวม, เริ่มต้นใช้งาน และ Concepts ทั้งหมด

Codex คือ Coding Agent (ตัวแทน AI สำหรับงานพัฒนาซอฟต์แวร์) โดย OpenAI ออกแบบมาเพื่อช่วยนักพัฒนาและทีม Engineering ทำงานเขียนโค้ด ท ·  9 นาที

หน้า 1 / 3
Codex คู่มือภาษาไทย — ตอนที่ 1: ภาพรวม, เริ่มต้นใช้งาน และ Concepts ทั้งหมด

อ้างอิงหลัก: Codex Overview | Codex Docs

Codex คืออะไร

อ้างอิง: Overview

หัวข้อนี้คืออะไร

Codex คือ Coding Agent (ตัวแทน AI สำหรับงานพัฒนาซอฟต์แวร์) โดย OpenAI ออกแบบมาเพื่อช่วยนักพัฒนาและทีม Engineering ทำงานเขียนโค้ด ทบทวนโค้ด แก้บัค และจัดการงาน Dev ต่างๆ ในแบบ Agentic คือทำได้หลายขั้นตอนโดยอัตโนมัติ

สรุปในหนึ่งประโยค: "One agent for everywhere you code" — Codex ใช้ได้ทุกที่ที่คุณเขียนโค้ด

ใช้ทำอะไรได้บ้าง

Codex ช่วยได้ทั้ง 5 ด้านหลัก:

เขียนโค้ด: อธิบายว่าต้องการอะไร Codex จะสร้างโค้ดที่เหมาะกับ Project และ Convention ของคุณ
ทำความเข้าใจ Codebase ที่ไม่รู้จัก: อ่านและอธิบายโค้ดซับซ้อนหรือ Legacy Code
รีวิวโค้ด: วิเคราะห์โค้ดหา Bug, Logic Error และ Edge Cases
Debug และแก้ไขปัญหา: ช่วยตามหาสาเหตุของ Error และเสนอวิธีแก้ไข
Automate งาน Dev: Refactoring, Testing, Migration, Setup ซ้ำๆ โดยอัตโนมัติ
แผนที่รองรับ

Codex รวมอยู่ในทุกแผนของ ChatGPT: Free, Go, Plus, Pro, Business, Edu, และ Enterprise

นอกจากนั้นยังใช้ Codex ผ่าน OpenAI API key ได้

Quickstart — เริ่มต้นใช้งาน Codex

อ้างอิง: Quickstart

หัวข้อนี้คืออะไร

วิธีเริ่มต้นใช้งาน Codex ตั้งแต่ศูนย์ มีให้เลือก 4 ช่องทาง ได้แก่ App (แนะนำ), IDE Extension, CLI และ Cloud

ช่องทาง 1: Codex App (แนะนำ)

วิธีติดตั้ง:

ดาวน์โหลด Codex App
macOS (Apple Silicon): ดาวน์โหลด
macOS (Intel): ดาวน์โหลด
Windows: ดาวน์โหลดผ่าน Microsoft Store
Linux: รอ Notification ทางอีเมล (ยังไม่เปิดให้โหลด)
เปิด App และ Sign in ด้วย ChatGPT Account หรือ OpenAI API Key
เลือก Project Folder ที่ต้องการให้ Codex ทำงาน
ตั้งค่า Local และส่ง Prompt แรก

ตัวอย่าง Prompt เริ่มต้น:

Tell me about this project
Build a classic Snake game in this repo.
Find and fix bugs in my codebase with minimal, high-confidence changes.


หมายเหตุ: ถ้า Sign in ด้วย OpenAI API Key บางฟีเจอร์อย่าง Cloud Threads อาจใช้ไม่ได้

ช่องทาง 2: IDE Extension

รองรับ IDE:

Visual Studio Code
Cursor
Windsurf
Visual Studio Code Insiders

วิธีติดตั้ง:

ค้นหา "Codex" หรือ "openai.chatgpt" ใน Extension Marketplace ของ IDE ที่ใช้
เปิด Codex Panel ในแถบ Sidebar
Sign in แล้วเริ่มงานได้เลย

Codex IDE Extension เริ่มต้นใน Agent Mode — อ่านไฟล์, รันคำสั่ง และแก้ไขโค้ดใน Project ได้เลย

ข้อแนะนำ: สร้าง Git Checkpoint ก่อนและหลังทำงานแต่ละ Task เสมอ เพื่อ Revert ได้ถ้าเกิดปัญหา

ช่องทาง 3: CLI (Command Line Interface)

Codex CLI ทำงานในเทอร์มินัล รองรับ Agent Mode เช่นกัน

ช่องทาง 4: Cloud (Web Browser)

ทำงานในระบบ Cloud ของ Codex โดยตรง เหมาะกับงาน Parallel หรืองานที่ต้องการ Delegate จากเครื่องอื่น

วิธีทบทวนผลงาน (สำหรับ Cloud):
หลังงานเสร็จ รีวิว Diff ที่เสนอมา จากนั้น Accept หรือ Checkout Branch มาทดสอบในเครื่องตัวเอง:

git fetch
git checkout <branch-name>

ราคาและแผน (Pricing)

อ้างอิง: Pricing

หัวข้อนี้คืออะไร

Codex รวมอยู่ในทุก ChatGPT Plan โดยไม่คิดค่าใช้จ่ายเพิ่มเติม มีจำกัดการใช้งานตามแผน

สรุปราคา
แผน	Codex	หมายเหตุ
Free	✅ มี	จำกัดการใช้งาน
Go	✅ มี	จำกัดการใช้งาน
Plus ($20/เดือน)	✅ มี	ใช้ได้มากขึ้น
Pro ($200/เดือน)	✅ มี	ใช้ได้มากขึ้น + gpt-5.3-codex-spark (Preview)
Business / Team	✅ มี	สำหรับทีม
Edu	✅ มี	สำหรับสถาบันการศึกษา
Enterprise	✅ มี	ปรับแต่งได้เต็มที่

นอกจากแผน ChatGPT ยังใช้ Codex ผ่าน API Credits ได้อีกด้วย

การย้าย (Migrate to Codex)

อ้างอิง: Migrate

หัวข้อนี้คืออะไร

ถ้าเคยใช้เครื่องมือ AI Coding อื่นๆ อยู่ ต้องการ Migrate Config, MCP Server, Skills และ Subagents มาที่ Codex สามารถทำได้

สิ่งที่รองรับการ Migrate:
ไฟล์คำสั่ง (Instruction files) เช่น .cursorrules, CLAUDE.md ฯลฯ
MCP Server Configuration
Skills และ Subagents
Concepts — แนวคิดสำคัญใน Codex
Prompting — การสั่งงาน Codex

อ้างอิง: Prompting

หัวข้อนี้คืออะไร

วิธีการสั่งงาน (Prompt) Codex ให้ได้ผลลัพธ์ที่ดีที่สุด ครอบคลุมเรื่อง Threads, Context และ Goal Mode

Prompts

คุณสื่อสารกับ Codex ผ่าน Prompt (ข้อความที่บอกว่าต้องการอะไร) เมื่อส่ง Prompt แล้ว Codex จะทำงานในลูป: เรียก AI Model → ดำเนินการตามที่ AI บอก (อ่านไฟล์, แก้ไขไฟล์, เรียก Tool) วนไปจนกว่างานจะเสร็จหรือคุณยกเลิก

ตัวอย่าง Prompt:

Explain how the transform module works and how other modules use it.

Add a new command-line option `--json` that outputs JSON.


เคล็ดลับการ Prompt:

บอกวิธีตรวจสอบผลงาน — Codex ทำงานได้ดีขึ้นมากเมื่อรู้ว่าต้องทดสอบยังไง บอกขั้นตอน Reproduce, Validate Feature, Linting, Pre-commit Checks
แบ่งงานใหญ่เป็นชิ้นเล็กๆ — งานเล็กทดสอบง่ายและรีวิวได้ง่ายกว่า ถ้าไม่แน่ใจว่าจะแบ่งยังไง ให้ถาม Codex ช่วยวาง Plan
Threads (เธรด)

Thread คือ Session การทำงานหนึ่งครั้ง: Prompt + ผลลัพธ์ + Tool Calls ทั้งหมดที่ตามมา Thread หนึ่งอาจมี Prompt หลายครั้ง (เช่น Prompt แรก implement feature, Prompt ต่อมาเพิ่ม test)

ประเภทของ Thread:

ประเภท	รันที่ไหน	เหมาะกับ
Local Thread	เครื่องของคุณ	งานที่ต้องดูการเปลี่ยนแปลง Real-time ใช้ Tools เดิมที่มี
Cloud Thread	Environment แยกต่างหาก	งาน Parallel หลายงาน หรือ Delegate จาก Device อื่น

หมายเหตุ: Local Threads รันใน Sandbox เพื่อลดความเสี่ยงการเปลี่ยนแปลงนอก Workspace โดยไม่ตั้งใจ

ใน Codex App ยังสร้าง Chat โดยไม่เลือก Project ได้ด้วย Chat ไม่ผูกกับ Repository ใด เหมาะกับงานวิจัย วางแผน หรือ Connected-tool Workflows

Context Window

ข้อมูลทั้งหมดใน Thread ต้องจุอยู่ใน Context Window ของ Model Codex จะ Monitor และรายงาน Space ที่เหลือ สำหรับงานยาวๆ Codex อาจ Compact Context โดย Summarize ข้อมูลที่สำคัญและตัดข้อมูลที่ไม่จำเป็นออก

Goal Mode

Goal Mode ให้ Codex มี เป้าหมายถาวร ที่ต้องทำจนสำเร็จ เหมาะกับงานที่ต้องใช้หลายขั้นตอน

วิธีเริ่ม Goal Mode: พิมพ์ /goal ใน Codex App, IDE Extension หรือ CLI

ถ้า /goal ไม่ปรากฏ ให้เปิดใน config.toml:

[features]
goals = true


ตัวอย่าง Goal ที่ดี:

Migrate this codebase from JavaScript to TypeScript. The app should compile in
strict mode without explicit `any` type definitions.

Reduce the time to interactive of the home page to below 1 second.


เคล็ดลับเขียน Goal ดี: ระบุผลลัพธ์ที่วัดได้ชัดเจน หรือเงื่อนไขทดสอบที่ชัดเจน ถ้ากำหนด Goal ยาก ใช้ /plan ก่อนแล้วให้ Codex ช่วยร่าง Goal

Customization — ปรับแต่งพฤติกรรม Codex

อ้างอิง: Customization

หัวข้อนี้คืออะไร

วิธีปรับให้ Codex ทำงานตรงกับสไตล์และ Workflow ของทีมหรือโปรเจกต์ ครอบคลุมตั้งแต่ AGENTS.md, Rules, Hooks ไปจนถึง MCP

เครื่องมือปรับแต่ง
เครื่องมือ	ใช้ทำอะไร
AGENTS.md	คำสั่งเฉพาะ Repository ที่ Codex อ่านก่อนทำงาน
config.toml	ตั้งค่าพื้นฐาน (Model, Permissions, Features)
Rules	กำหนดว่าคำสั่ง Shell ไหนอนุญาต/ห้าม
Hooks	Script ที่รันอัตโนมัติก่อน/หลังเหตุการณ์บางอย่าง
Skills	ชุดคำสั่ง/ขั้นตอนที่ใช้ซ้ำได้ข้ามโปรเจกต์
MCP	เชื่อมต่อ Server ภายนอกเพื่อขยายความสามารถ
Plugins	Bundle ของ Tools, Skills และ MCP ที่ติดตั้งเพิ่มได้
Subagents	Agent ย่อยที่ Codex สร้างขึ้นมาเพื่อทำงานย่อยๆ
Memories — ความทรงจำข้ามเธรด

อ้างอิง: Memories

หัวข้อนี้คืออะไร

Memories ให้ Codex "จำ" บริบทจาก Thread เก่าๆ และนำมาใช้ใน Thread ใหม่ เช่น สไตล์การเขียนโค้ด, Tech Stack ที่ใช้, Convention ของโปรเจกต์

รายละเอียดสำคัญ
ปิดไว้เป็นค่าเริ่มต้น — ต้องเปิดด้วยตนเอง
ยังไม่รองรับ: สหภาพยุโรป (EEA), สหราชอาณาจักร, และสวิตเซอร์แลนด์
วิธีเปิด Memories

ใน Codex App: ไปที่ Settings → เปิด Memories

ใน config.toml:

[features]
memories = true

วิธีการทำงาน

Codex แปลงบริบทจาก Thread ที่ผ่านมาเป็น Memory Files เก็บไว้ที่ ~/.codex/memories/ โดยอัตโนมัติ

Codex จะ:

ข้ามการบันทึก Session สั้นๆ หรือ Session ที่ยังทำงานอยู่
ลบ Secrets ออกก่อนบันทึก
อัปเดต Memories ในพื้นหลัง ไม่ใช่ทันทีหลัง Thread จบ
Settings ที่เกี่ยวข้อง
Setting	ความหมาย
memories.generate_memories	ควบคุมว่า Thread ใหม่จะถูกบันทึกเป็น Memory Input หรือไม่
memories.use_memories	ควบคุมว่า Codex จะดึง Memory มาใช้ใน Session ใหม่หรือไม่
memories.extract_model	Override Model ที่ใช้ Extract Memory จาก Thread
memories.consolidation_model	Override Model ที่ใช้ Consolidate Memory ทั้งหมด
Chronicle

อ้างอิง: Chronicle

Chronicle เป็น Feature เสริมของ Memories ที่บันทึก Timeline การทำงานของ Codex เช่น ทำงานอะไรไปบ้าง เมื่อไหร่ ผลลัพธ์เป็นอย่างไร

ข้อควรระวัง

อย่าเก็บ Secret ใน Memories แม้ Codex จะ Redact อัตโนมัติ แต่ควรรีวิว Memory Files ก่อนแชร์ Codex Home Directory กับผู้อื่น

Sandboxing — พื้นที่ทำงานที่ปลอดภัย

อ้างอิง: Sandboxing

หัวข้อนี้คืออะไร

Sandbox คือขอบเขตที่ Codex ทำงานได้ โดยไม่ให้ Codex เข้าถึงเครื่องของคุณแบบไม่จำกัด ช่วยให้ทำงาน Autonomous ได้โดยไม่ต้องกดยืนยันทุกคำสั่ง

Sandbox ทำอะไรบ้าง

Sandbox ใช้กับ คำสั่ง Shell ทั้งหมด ไม่ใช่แค่การ Edit ไฟล์โดยตรง ดังนั้น git, npm, pytest และ Tool อื่นๆ ที่ Codex รันก็อยู่ใน Sandbox เช่นกัน

Codex ใช้ Platform-native Enforcement:

macOS: Seatbelt Framework (ใช้ได้เลย ไม่ต้องติดตั้งเพิ่ม)
Windows: Windows Sandbox (ใน PowerShell) หรือ Linux Sandbox (ใน WSL2)
Linux/WSL2: bubblewrap — ต้องติดตั้งก่อน: sudo apt install bubblewrap
Sandbox Modes
Mode	ความหมาย
read-only	Codex อ่านไฟล์ได้ แต่แก้ไขหรือรันคำสั่งต้องขอ Approve
workspace-write	Codex อ่าน แก้ไขใน Workspace และรัน Routine Commands ได้ (ค่าเริ่มต้น)
danger-full-access	Codex รันโดยไม่มีขอบเขต — ไม่มี Filesystem/Network Limit
Approval Policies
Policy	ความหมาย
untrusted	Codex ขอ Approve ก่อนรัน Command ที่ไม่อยู่ใน Trusted List
on-request	Codex ทำงานปกติใน Sandbox แต่ขอ Approve ถ้าต้องออกนอกขอบเขต (ค่าเริ่มต้น)
never	Codex ไม่หยุดขอ Approve เลย
ตัวเลือกผู้ Approve
ค่า	ความหมาย
user	Approve ด้วยตัวเองผ่าน UI (ค่าเริ่มต้น)
auto_review	ให้ AI Reviewer Agent Approve อัตโนมัติ
ตั้งค่าใน config.toml
sandbox_mode = "workspace-write"
approval_policy = "on-request"
approvals_reviewer = "user"


สำหรับ Full Access (ไม่มี Limit):

sandbox_mode = "danger-full-access"
approval_policy = "never"

Auto-review

อ้างอิง: Auto-review

Auto-review คือตัวเลือกที่ให้ AI Agent ตรวจสอบและ Approve การกระทำที่ต้องขออนุญาต โดยอัตโนมัติ แทนที่จะต้องให้คนมากด Approve ทุกครั้ง

เปิดใช้: approvals_reviewer = "auto_review" ใน config.toml

Subagents — การทำงานหลาย Agent พร้อมกัน

อ้างอิง: Subagents

หัวข้อนี้คืออะไร

Subagents คือ Agent ย่อยที่ Codex Main สร้างขึ้นเพื่อทำงานส่วนย่อยๆ ควบคู่กัน ทำให้ Codex ทำงานได้เร็วขึ้นโดยแบ่งงานใหญ่ออกเป็นงานเล็กๆ ที่รันพร้อมกัน

ใช้ทำอะไร
ทดสอบหลายสภาวะพร้อมกัน
Refactor หลาย Module ในคราวเดียว
รัน Script ต่างๆ แบบ Parallel
Workflows — ขั้นตอนการทำงาน

อ้างอิง: Workflows

หัวข้อนี้คืออะไร

Workflows คือรูปแบบการทำงานแนะนำสำหรับ Task ประเภทต่างๆ เช่น การ Debug, การ Refactor, การเพิ่ม Feature ใหม่

ตัวอย่าง Workflow ที่ควรรู้
Understand a codebase: ให้ Codex สรุปโครงสร้างก่อน แล้วถามเรื่องส่วนที่สนใจ
Implement a feature: เริ่มด้วยการให้ Codex ออกแบบ Plan ก่อน ทบทวน แล้วค่อยให้ implement
Fix a bug: ส่ง Error Message + Steps to Reproduce ให้ Codex วิเคราะห์
Refactor: แบ่งเป็น Chunk เล็กๆ ทดสอบทีละส่วน
Models — โมเดล AI ที่ขับเคลื่อน Codex

อ้างอิง: Models

หัวข้อนี้คืออะไร

Codex ใช้หลาย AI Model แต่ละตัวมีจุดเด่นต่างกัน คุณเลือก Model ได้ตามลักษณะงาน

โมเดลแนะนำ
Model	ความสามารถ	ความเร็ว	ช่องทาง
gpt-5.5	สูงสุด — สำหรับงานซับซ้อน, Computer Use, Research	ปานกลาง	App, IDE, CLI, Cloud, API
gpt-5.4	สูงมาก — Flagship สำหรับงาน Professional	ดี	App, IDE, CLI, Cloud, API
gpt-5.4-mini	ดี — เร็ว ประหยัด เหมาะกับงาน Routine	เร็วมาก	App, IDE, CLI, Cloud, API
gpt-5.3-codex	สูงมาก — Industry-leading Coding Model	ปานกลาง	App, IDE, CLI, Cloud, API
gpt-5.3-codex-spark	ดี — Real-time iteration สำหรับ Pro Users	เร็วมาก	App (Pro เท่านั้น)

คำแนะนำจาก OpenAI: เริ่มด้วย gpt-5.5 สำหรับงานทั่วไป ใช้ gpt-5.4-mini เมื่อต้องการความเร็วหรือประหยัดค่าใช้จ่าย

ตั้งค่า Model ใน config.toml
model = "gpt-5.5"

เปลี่ยน Model ชั่วคราวใน CLI
codex -m gpt-5.5


หรือพิมพ์ /model ใน Thread ที่กำลังรันอยู่

วิธีเปลี่ยน Model ใน IDE Extension

ใช้ Model Selector ที่อยู่ใต้ช่อง Input ของ IDE Extension

ข้อจำกัด: ปัจจุบันยังไม่สามารถเปลี่ยน Default Model สำหรับ Cloud Tasks ได้

Cyber Safety — ความปลอดภัยทางไซเบอร์

อ้างอิง: Cyber Safety

หัวข้อนี้คืออะไร

ข้อกำหนดด้านความปลอดภัยเกี่ยวกับสิ่งที่ Codex ทำได้และทำไม่ได้ในด้าน Cybersecurity

สิ่งที่ Codex ไม่ทำ

Codex มีการควบคุม Safety เพื่อป้องกัน Dual-use ทางด้าน Cybersecurity เช่น Codex จะ ไม่ ช่วยพัฒนา:

Malware หรือ Ransomware
Exploit Scripts ที่ใช้โจมตีระบบจริง
Tools สำหรับ Unauthorized Access
สิ่งที่ Codex ทำได้
ช่วย Security Researchers ทำ Legitimate Research
ช่วยวิเคราะห์ Vulnerabilities ใน Codebase ของตัวเอง
Penetration Testing ในสภาวะที่มีการอนุญาต
สรุป: ช่องทางเริ่มต้น Codex
ถ้าคุณ...	ใช้ช่องทาง
ต้องการประสบการณ์ดีที่สุด	Codex App (macOS/Windows)
เขียนโค้ดอยู่ใน VS Code / Cursor	IDE Extension
ชอบทำงานในเทอร์มินัล	CLI
ต้องการรัน Task Parallel หรือจาก Device อื่น	Cloud (Web)
หัวข้อที่ยังไม่ได้เรียบเรียง
หัวข้อ	เหตุผล	ลิงก์
Use Cases ทั้งหมด	รวบรวมได้จากหน้า Use Cases	link
Glossary	อยู่ระหว่างรวบรวม	link
 ก่อนหน้า
ถัดไป
Codex App
```

## Page 2 (หน้า 2 / 3)
```text
Codex
คู่มืออย่างเป็นทางการ
11 เอกสาร
เริ่มต้น
Codex App

อ้างอิง: App Overview ·  12 นาที

หน้า 2 / 3
Codex คู่มือภาษาไทย — ตอนที่ 2: Codex App

อ้างอิงหลัก: Codex App Overview

ภาพรวม Codex App

อ้างอิง: App Overview

หัวข้อนี้คืออะไร

Codex App คือแอปพลิเคชัน Desktop สำหรับทำงานกับ Codex โดยเฉพาะ มีฟีเจอร์ครบครันที่สุดในบรรดาช่องทางทั้งหมด เหมาะสำหรับนักพัฒนาที่ต้องการประสบการณ์ใช้งานที่ดีที่สุด

ใช้ทำอะไรได้บ้าง
รัน Thread หลายงานพร้อมกันแบบ Parallel
ทำงานกับ Git Worktrees ในตัว
ใช้ Computer Use บน macOS (ให้ Codex คลิก/พิมพ์ใน UI จริง)
รีวิว Diff, Commit, Push ตรงจาก App
ตั้ง Automations ที่รันซ้ำตามเวลา
เปิด In-app Browser สำหรับ Web Testing
รองรับ Platform
macOS (Apple Silicon + Intel) — ฟีเจอร์ครบที่สุด
Windows — รองรับ
Linux — รอ Notification ทางอีเมล (ยังไม่เปิด)
Features ของ Codex App

อ้างอิง: App Features

Multitask Across Projects — ทำงานหลายโปรเจกต์พร้อมกัน

Codex App ให้คุณรัน Thread หลายงานพร้อมกัน สลับไปมาระหว่าง Project ได้อย่างรวดเร็ว ไม่ต้องรอให้งานหนึ่งเสร็จก่อนเริ่มอีกงาน

Worktree Support — รัน Branch หลายอันพร้อมกัน

รองรับ Git Worktrees ในตัว ช่วยให้ Codex ทำงานใน Branch หลายอันพร้อมกันโดยไม่กระทบงานหลักที่กำลังทำอยู่ (รายละเอียดใน หัวข้อ Worktrees)

Image Generation — สร้างรูปในงานโค้ด

สร้างหรือแก้ไขรูปภาพใน Thread ขณะทำงานกับโค้ดและ Asset โดยตรง เหมาะกับงาน Frontend หรือ UI Development

Integrated Terminal — Terminal ในแต่ละ Thread

ทุก Thread มี Terminal ของตัวเอง รัน Command Line ได้โดยตรงใน Context ของงานนั้นๆ ใช้เรียก Tool, รัน Test หรือตรวจสอบผลลัพธ์ได้ทันที

Richer Outputs and Artifacts — แสดงผลลัพธ์ครบ

Sidebar แสดง Plans, Sources, Task Summaries และ Preview ไฟล์ที่สร้างใหม่ได้ ติดตามความคืบหน้าของงานได้ชัดเจน

Skills Support — ใช้ Skills ข้ามโปรเจกต์

สนับสนุน Skills ที่ใช้ซ้ำได้ทั้งใน App, CLI และ IDE Extension บันทึก Workflow ครั้งเดียว นำมาใช้ทุกที่

Sync with the IDE Extension — ใช้งานร่วมกับ IDE

เชื่อม Auto Context และ Active Threads ระหว่าง App และ IDE Extension ได้ ทำงานต่อเนื่องไม่ว่าจะอยู่ที่ไหน

Settings — ตั้งค่า Codex App

อ้างอิง: App Settings

หัวข้อนี้คืออะไร

หน้า Settings ใน Codex App ให้ปรับแต่งพฤติกรรม เชื่อมต่อบัญชี เลือก Editor และจัดการ Computer Use

เปิด Settings: Cmd + , หรือคลิก Settings ใน Sidebar

หมวด Settings หลัก
หมวด	ใช้ตั้งค่าอะไร
Account	เข้าสู่ระบบ, เชื่อม GitHub
Model	เลือก Default Model สำหรับ Thread ทั่วไป
Sandbox	Sandbox Mode, Approval Policy
Memories	เปิด/ปิด Memories Feature
Computer Use	ติดตั้ง Computer Use Plugin, จัดการ Allowed Apps
Editor	เลือก Default Editor สำหรับเปิดไฟล์จาก Review Pane
Worktrees	ตั้ง Limit จำนวน Worktree สูงสุด
Storage	ดูและจัดการ Disk Space ที่ Worktrees ใช้
Review — รีวิวและ Commit โค้ดจาก App

อ้างอิง: App Review

หัวข้อนี้คืออะไร

Review Pane คือหน้าต่างที่ให้ดู Diff ทั้งหมดที่ Codex แก้ไข ใส่ Feedback แบบ Inline และตัดสินใจว่าจะ Keep, Stage หรือ Revert อะไร

ข้อกำหนด

Review Pane ทำงานได้เฉพาะ โปรเจกต์ที่อยู่ใน Git Repository ถ้าโปรเจกต์ยังไม่ใช่ Git Repo App จะแนะนำให้สร้างก่อน

สิ่งที่ Review Pane แสดง

Review Pane สะท้อนสถานะ Git Repository จริงๆ คือจะแสดง:

การเปลี่ยนแปลงที่ Codex ทำ
การเปลี่ยนแปลงที่คุณทำเอง
Uncommitted Changes อื่นๆ ใน Repo ทั้งหมด

โหมดที่เลือกได้:

Uncommitted changes (ค่าเริ่มต้น)
All branch changes (Diff กับ Base Branch)
Last turn changes (เฉพาะ Turn ล่าสุด)
การนำทางใน Review Pane
การกระทำ	วิธี
เปิดไฟล์ใน Editor	คลิกชื่อไฟล์
ขยาย/ย่อ Diff	คลิก Background ของชื่อไฟล์
เปิดไฟล์ที่ Line ที่ต้องการ	Cmd + คลิกบรรทัดนั้น
ใส่ Inline Comment	Hover บรรทัด → คลิก + → เขียน Feedback
Inline Comments

เป็นวิธีที่เร็วที่สุดในการให้ Feedback แบบเจาะจงบรรทัด:

เปิด Review Pane
Hover บรรทัดที่ต้องการ Comment
คลิก +
เขียน Feedback แล้ว Submit
ส่ง Message กลับไปบอก Codex เช่น "Address the inline comments and keep the scope minimal."
Code Review ด้วย /review

ถ้าใช้คำสั่ง /review Codex จะแสดง Code Review Comments ตรงใน Review Pane

Pull Request Reviews

ถ้า Codex เข้าถึง GitHub ได้ สามารถเรียกดู PR Feedback จาก Reviewers ใน Sidebar และ Inline ใน Review Pane พร้อม Address Comments ได้เลยจาก Thread เดียวกัน

ต้องการ: GitHub CLI (gh) ติดตั้งและ Login แล้ว

Staging และ Reverting ไฟล์
ระดับ	ทำได้
Entire Diff	Stage all / Revert all
Per File	Stage, Unstage หรือ Revert ทีละไฟล์
Per Hunk	Stage, Unstage หรือ Revert ทีละ Hunk
Automations — กำหนดงานอัตโนมัติตารางเวลา

อ้างอิง: App Automations

หัวข้อนี้คืออะไร

Automations ให้ Codex ทำงาน Recurring (ซ้ำๆ) ในพื้นหลัง โดยอัตโนมัติตามตารางเวลา เช่น รันทุกเช้าตอน 8 โมง ตรวจสอบ PR ทุกชั่วโมง ฯลฯ

ประเภทของ Automation
ประเภท	ใช้ทำอะไร
Standalone Automation	รัน Task ใหม่ทุกครั้งตามตาราง รายงานผลใน Triage Inbox
Thread Automation	รัน "Heartbeat" ใน Thread เดิม เพื่อดูแล Thread ที่ยังทำงานอยู่
วิธีสร้าง Automation
ไปที่ Automations Pane ใน Sidebar
คลิก Create Automation
เขียน Prompt ที่บอกว่าต้องการให้ทำอะไรแต่ละครั้ง
เลือก Schedule (Daily, Weekly, Custom Cron, Minute-based ฯลฯ)
เลือกว่ารันใน Local Project หรือ Worktree (สำหรับ Git Repo)

หรือจะให้ Codex สร้าง Automation แทนก็ได้โดยบอกใน Thread ปกติ เช่น "Create an automation that checks my commits every morning."

Thread Automations ทำอะไรได้บ้าง
รอจนกว่า Long-running Command เสร็จ
Poll Slack, GitHub หรือ Source อื่นๆ ใน Context ของ Thread เดิม
เตือนให้ Codex Continue Review Loop ตามเวลาที่กำหนด
รัน Skill-driven Workflow ผ่าน Plugins เช่น Check PR Status
Triage Inbox

ผลลัพธ์ของ Automation ที่มีสิ่งที่ต้องรายงานจะปรากฏใน Triage Section ใน Sidebar กรองได้ว่าจะดูทั้งหมดหรือเฉพาะ Unread

ตัวอย่าง Automation จริง

ติดตามความเคลื่อนไหวของ Project:

Look at the latest remote origin/main. Then produce an exec briefing
for the last 24 hours of commits.


สร้าง Skill อัตโนมัติจาก Session ที่ผ่านมา:

Scan all of the ~/.codex/sessions files from the past day and if there
have been any issues using particular skills, update the skills.

ข้อควรระวังด้านความปลอดภัย

Automations รันแบบ Unattended จึงต้องระวัง:

read-only mode: คำสั่งที่แก้ไขไฟล์หรือ Network Access จะ Fail
workspace-write mode: ปลอดภัยสำหรับ Background งานทั่วไป (แนะนำ)
danger-full-access mode: มีความเสี่ยงสูงเพราะไม่มีขีดจำกัด ควรหลีกเลี่ยง
Worktrees — ทำงาน Branch หลาย Branch พร้อมกัน

อ้างอิง: App Worktrees

หัวข้อนี้คืออะไร

Worktrees ให้ Codex รัน Task หลายงานใน Project เดียวกันโดยไม่กระทบกัน ใช้หลักการของ Git Worktrees ที่สร้าง "Copy" ของ Repository ให้แต่ละงาน

Worktree ทำงานได้กับ Git Repository เท่านั้น
คำศัพท์สำคัญ
คำ	ความหมาย
Local checkout	Repository ต้นฉบับในเครื่องของคุณ ("Local" ใน App)
Worktree	Git Worktree ที่ Codex App สร้างจาก Local checkout
Handoff	กระบวนการย้าย Thread ระหว่าง Local กับ Worktree
ทำไมต้องใช้ Worktrees
ทำงาน Parallel กับ Codex โดยไม่รบกวน Workspace ปัจจุบัน
Queue งาน Background ในขณะที่ยังโฟกัสกับงานหน้าบ้าน
ย้าย Thread กลับมาที่ Local เมื่อพร้อม Inspect หรือ Test
วิธีเริ่มใช้ Worktree

ขั้นตอน:

ใน New Thread View เลือก Worktree ใต้ Composer
เลือก Git Branch ที่ต้องการเป็นจุดเริ่มต้น (main, Feature Branch ฯลฯ)
ส่ง Prompt แล้ว Codex จะสร้าง Git Worktree โดย Default อยู่ใน Detached HEAD State
ทำงานบน Worktree vs Handoff to Local

Option 1 - ทำงานบน Worktree ตลอด:

กด Create branch here ใน Thread Header เมื่อพร้อม
Commit, Push, Open PR จาก Worktree โดยตรง
เปิด IDE ไปที่ Worktree ด้วยปุ่ม "Open"

ข้อจำกัด Git: ถ้า Worktree ใช้ branch feature/a อยู่แล้ว จะ Checkout branch เดิมใน Local Checkout ไม่ได้พร้อมกัน

Option 2 - Handoff to Local:

คลิก Hand off ใน Thread Header → เลือก Local
เหมาะเมื่อต้องการอ่าน Changes ใน IDE ปกติ หรือรัน Dev Server ที่มีอยู่แล้ว
Codex จัดการ Git Operations ที่ต้องทำให้ครบเพื่อย้าย Thread อย่างปลอดภัย

Files ที่อยู่ใน .gitignore จะไม่ถูกย้ายไปด้วยตอน Handoff

Permanent Worktrees

นอกจาก Codex-managed Worktrees (สร้างชั่วคราวต่อ Thread) ยังสร้าง Permanent Worktree ได้จาก 3-dot Menu ใน Project Sidebar เหมาะกับงาน Long-lived ที่ต้องการ Environment ถาวร

Worktree Cleanup

Codex เก็บ Worktree ล่าสุดไว้สูงสุด 15 อัน (ปรับได้ใน Settings) Codex จะไม่ลบ Worktree ถ้า:

Thread ที่เชื่อมอยู่ถูก Pin
Thread ยังรันอยู่
เป็น Permanent Worktree

ก่อนลบ Codex จะ Save Snapshot ไว้ให้ Restore ในภายหลัง

Local Environments — ตั้ง Environment Script ให้ Worktree

อ้างอิง: Local Environments

หัวข้อนี้คืออะไร

Local Environments คือ Setup Script ที่รันอัตโนมัติเมื่อสร้าง Worktree ใหม่ ให้แน่ใจว่า Dependencies, Tools และ Config ครบถ้วนก่อนที่ Codex จะเริ่มทำงาน

ใช้ทำอะไร
ติดตั้ง npm packages, Python dependencies, Go modules ฯลฯ
ตั้งค่า Environment Variables
รัน Migration หรือ Seed DB ก่อนเริ่มงาน
วิธีตั้งค่า
ไปที่ Project Settings ใน Sidebar
กด Add environment setup
เขียน Shell Script (เช่น npm install, pip install -r requirements.txt)
Script นี้จะรันทุกครั้งที่สร้าง Worktree ใหม่จาก Project นี้
In-App Browser — เบราว์เซอร์ใน App

อ้างอิง: In-app Browser

หัวข้อนี้คืออะไร

In-app Browser ให้เปิดหน้าเว็บ Preview ตรงใน Codex App เหมาะกับการทดสอบ Web App ที่ Codex กำลัง Build โดยไม่ต้องออกไปเปิด Browser แยก

ใช้ทำอะไร
เปิดหน้าเว็บที่ Render แล้ว
ทิ้ง Comment บนหน้าเว็บเพื่อให้ Codex แก้ไข
ให้ Codex ทำ Browser Flows บน Local Web App
ข้อแนะนำ

สำหรับ Web App ที่ Build ในเครื่อง ให้ใช้ In-app Browser ก่อน Computer Use เสมอ เพราะเบราว์เซอร์ใน App ทำงานได้เร็วกว่าและ Scope ชัดเจนกว่า

Chrome Extension — Codex ในเบราว์เซอร์ Chrome

อ้างอิง: Chrome Extension

หัวข้อนี้คืออะไร

Codex มี Chrome Extension ให้ Codex ทำงานร่วมกับ Chrome ได้โดยตรง เช่น Scrape เนื้อหา ตรวจสอบ Web UI หรือทำงานที่ต้องใช้ Browser Context

Computer Use — ควบคุม GUI ด้วย Codex

อ้างอิง: Computer Use

หัวข้อนี้คืออะไร

Computer Use ให้ Codex มองเห็นและควบคุม GUI ของแอปบน macOS ได้ เช่น คลิก พิมพ์ เลื่อน เปิดเมนู ฯลฯ เหมาะกับงานที่ Command Line หรือ Structured Integration ทำไม่ได้

ข้อจำกัด
รองรับเฉพาะ macOS ในปัจจุบัน
ยังไม่รองรับ: EEA, สหราชอาณาจักร, สวิตเซอร์แลนด์
วิธีติดตั้งและตั้งค่า
ไปที่ Codex Settings → Computer Use
คลิก Install เพื่อติดตั้ง Computer Use Plugin
เมื่อ macOS ขอ Permission ให้ Grant:
Screen Recording — เพื่อให้ Codex เห็นแอป
Accessibility — เพื่อให้ Codex คลิก, พิมพ์ และนำทาง
งานที่เหมาะกับ Computer Use
เหมาะมาก	ไม่จำเป็นต้องใช้
ทดสอบ macOS App หรือ iOS Simulator	งานที่มี Plugin/MCP ตรงๆ อยู่แล้ว
ทำ Browser Flow ที่ซับซ้อน	Web App ที่ทดสอบได้ผ่าน In-app Browser
Reproduce Bug ที่เกิดเฉพาะใน GUI	งานที่ทำผ่าน Command Line ได้
เปลี่ยน App Settings ที่ต้องคลิก UI
Workflow ที่ Span หลาย App
วิธีใช้ Computer Use

พิมพ์ @Computer Use หรือ @ชื่อแอป ใน Prompt:

Open the app with computer use, reproduce the onboarding bug, and fix the
smallest code path that causes it.

Open @Chrome and verify the checkout page still works after the latest changes.

Permissions และ Approvals
macOS System Permissions (Screen Recording + Accessibility): ให้ Codex เห็นและควบคุม App
App Approvals ใน Codex: กำหนดว่า App ไหนอนุญาตให้ Codex ใช้ได้
เลือก Always allow ได้สำหรับ App ที่เชื่อถือ Codex
จัดการ "Always allow" list ใน Settings → Computer Use
ข้อควรระวัง Safety

Computer Use มีความสามารถในการ:

ดู Screen Content, ถ่าย Screenshot
Interact กับ Windows, Menus, Keyboard, Clipboard ของ App ที่กำหนด

แนวทางปลอดภัย:

ให้ Target App ชัดเจนทีละ App/Flow
อยู่ใกล้คอมพิวเตอร์สำหรับงาน Sensitive
ปิด App ที่ Sensitive ถ้าไม่จำเป็นต้องใช้
รีวิว App Permission Prompts ก่อนอนุญาต
ถ้า Codex เริ่มทำงานกับ Window ผิด ให้ยกเลิกทันที

สิ่งที่ Computer Use ทำไม่ได้: Automate Terminal Apps หรือ Codex เอง, Authenticate เป็น Admin, Approve Security/Privacy Prompts ของ macOS

Commands และ Keyboard Shortcuts

อ้างอิง: App Commands

Keyboard Shortcuts

General:

Shortcut	Action
Cmd + Shift + P / Cmd + K	Command Menu
Cmd + ,	Settings
Cmd + O	Open Folder
Cmd + [	Navigate Back
Cmd + ]	Navigate Forward
Cmd + + / Cmd + =	Increase Font Size
Cmd + - / Cmd + _	Decrease Font Size
Cmd + B	Toggle Sidebar
Cmd + Option + B	Toggle Diff Panel
Cmd + J	Toggle Terminal
Ctrl + L	Clear Terminal

Thread:

Shortcut	Action
Cmd + N / Cmd + Shift + O	New Thread
Cmd + F	Find in Thread
Cmd + Shift + [	Previous Thread
Cmd + Shift + ]	Next Thread
Ctrl + M	Dictation
Slash Commands

พิมพ์ / ใน Thread Composer เพื่อเข้าถึง:

Slash Command	ทำอะไร
/feedback	เปิด Dialog ส่ง Feedback (พร้อม Log ได้)
/mcp	ดูสถานะ MCP Servers ที่เชื่อมต่ออยู่
/plan-mode	เปิด/ปิด Plan Mode สำหรับวางแผน Multi-step
/review	เริ่ม Code Review Mode
/status	แสดง Thread ID, Context Usage, Rate Limits

Skills: พิมพ์ $ เพื่อเรียก Skill โดยตรง เช่น $skill-name. Skills ที่ Enable แล้วจะปรากฏในรายการ Slash Commands ด้วย

Deeplinks

Codex App ลงทะเบียน URL Scheme codex:// เพื่อเปิด App โดยตรงจาก Link:

Deeplink	เปิดหน้า	Parameters
codex://settings	Settings	ไม่มี
codex://skills	Skills	ไม่มี
codex://automations	Automations	ไม่มี
codex://threads/<thread-id>	Thread ที่ระบุ	UUID เท่านั้น
codex://new	Thread ใหม่	prompt, path, originUrl
Windows Support — รองรับ Windows

อ้างอิง: App Windows

หัวข้อนี้คืออะไร

Codex App รองรับ Windows อย่างเป็นทางการ โดยมีฟีเจอร์ส่วนใหญ่เหมือน macOS แต่มีข้อแตกต่างบางส่วน

วิธีดาวน์โหลด
ดาวน์โหลดจาก Microsoft Store
ความแตกต่างจาก macOS
Sandbox บน Windows ใช้ Windows Sandbox หรือ Linux (ใน WSL2)
Computer Use ยังไม่รองรับ Windows ณ เวลาที่เขียน
Keyboard Shortcuts อาจต่างกันบ้าง (ใช้ Ctrl แทน Cmd)
Troubleshooting — แก้ปัญหาที่พบบ่อย

อ้างอิง: App Troubleshooting

Computer Use ไม่เห็น/ควบคุม App ไม่ได้

สาเหตุ: macOS Permissions ยังไม่ได้อนุมัติ
แก้ไข: ไปที่ System Settings → Privacy & Security → ตรวจสอบ Screen Recording และ Accessibility ให้ Codex มีสิทธิ์

Pull Request Context ไม่แสดงใน Sidebar

สาเหตุ: GitHub CLI (gh) ยังไม่ได้ติดตั้งหรือยังไม่ได้ Login
แก้ไข:

# ติดตั้ง GitHub CLI
brew install gh

# Login
gh auth login

Worktree Error: Branch already in use

สาเหตุ: Branch ถูก Checkout ใน Worktree อื่นแล้ว
แก้ไข: ใช้ Handoff ย้าย Thread กลับมาที่ Local แทนการ Checkout Branch ซ้ำกัน

App ไม่อัปเดต/ค้าง
รีสตาร์ท App
ตรวจสอบว่า Sign in สำเร็จแล้ว (ChatGPT Account หรือ API Key)
ถ้ายังมีปัญหา กด /feedback เพื่อส่ง Logs ให้ OpenAI
สรุปฟีเจอร์ทั้งหมดของ Codex App
ฟีเจอร์	macOS	Windows	หมายเหตุ
Parallel Threads	✅	✅
Git Worktrees	✅	✅	ต้องเป็น Git Repo
Review Pane	✅	✅	ต้องเป็น Git Repo
Automations	✅	✅
In-app Browser	✅	✅
Chrome Extension	✅	✅
Computer Use	✅	❌	ไม่รองรับ EEA/UK/CH
Image Generation	✅	✅
Skills / Plugins	✅	✅
Integrated Terminal	✅	✅
Local Environments	✅	✅
หัวข้อที่ยังต้องตรวจสอบเพิ่ม
หัวข้อ	เหตุผล	ลิงก์
App Settings รายละเอียดเต็ม	ต้องดู UI จริง	link
Appshots	ยังไม่ได้ดึงข้อมูล	link
 ก่อนหน้า
ภาพรวม, เริ่มต้นใช้งาน และ Concepts ทั้งหมด
ถัดไป
IDE Extension, CLI และ Web/Cloud
```

## Page 3 (หน้า 3 / 3)
```text
Codex
คู่มืออย่างเป็นทางการ
11 เอกสาร
เริ่มต้น
IDE Extension, CLI และ Web/Cloud

- ส่วนที่ 1: IDE Extension ·  14 นาที

หน้า 3 / 3
IDE Extension, CLI และ Web/Cloud — คู่มือภาษาไทย

อ้างอิงหลัก: Codex IDE Extension Docs | Codex CLI Docs | Codex Web/Cloud Docs
อัปเดตล่าสุด: มิถุนายน 2026

สารบัญ
ส่วนที่ 1: IDE Extension
1.1 IDE Extension — ภาพรวม
1.2 IDE Extension — ฟีเจอร์
1.3 IDE Extension — การตั้งค่า (Settings)
1.4 IDE Commands — คำสั่งใน IDE
1.5 Slash Commands ใน IDE
ส่วนที่ 2: CLI (Command Line Interface)
2.1 CLI — ภาพรวม
2.2 CLI — ฟีเจอร์หลัก
2.3 CLI — Command Line Options (ตัวเลือกคำสั่ง)
2.4 Slash Commands ใน CLI
ส่วนที่ 3: Web/Cloud
3.1 Web/Cloud — ภาพรวม
3.2 Cloud Environments — สภาพแวดล้อมบนคลาวด์
3.3 Internet Access — การเข้าถึงอินเทอร์เน็ต
ส่วนที่ 1: IDE Extension
1.1 IDE Extension — ภาพรวม

อ้างอิง: Official Docs

IDE Extension คืออะไร

Codex IDE Extension คือส่วนขยายที่ติดตั้งในโปรแกรมเขียนโค้ดยอดนิยม ทำให้คุณใช้งาน Codex ได้โดยตรงภายใน IDE โดยไม่ต้องสลับหน้าต่างไปมา Extension นี้ใช้ agent และ configuration เดียวกันกับ Codex CLI ทำให้พฤติกรรมสอดคล้องกันทั้งสองแพลตฟอร์ม

รองรับ IDE อะไรบ้าง
VS Code — ติดตั้งจาก VS Code Marketplace หรือเปิดลิงก์ vscode:extension/openai.chatgpt ในเบราว์เซอร์
Cursor — ใช้ลิงก์ cursor:extension/openai.chatgpt
Windsurf — ใช้ลิงก์ windsurf:extension/openai.chatgpt
JetBrains IDEs (IntelliJ IDEA, PyCharm, WebStorm ฯลฯ) — ติดตั้ง plugin แยกจาก JetBrains Marketplace
วิธีติดตั้งและเข้าสู่ระบบ
เปิด IDE แล้วไปที่ Extensions/Plugins Marketplace
ค้นหา ChatGPT หรือ OpenAI
ติดตั้ง extension
ลงชื่อเข้าใช้ด้วย ChatGPT account หรือ OpenAI API key (สำหรับ API key ต้องมี credits ใน account)
Extension จะอัปเดตอัตโนมัติเมื่อมีเวอร์ชันใหม่
ข้อควรรู้
Extension ใช้ agent engine เดียวกับ CLI — config ที่ตั้งไว้ใน codex.yaml หรือ AGENTS.md มีผลทั้งคู่
หากมี Codex CLI ติดตั้งอยู่แล้ว extension จะตรวจหาและใช้งานร่วมกันได้
1.2 IDE Extension — ฟีเจอร์

อ้างอิง: Official Docs

ฟีเจอร์หลักของ IDE Extension
@file — อ้างอิงไฟล์ในการสนทนา

พิมพ์ @ ตามด้วยชื่อไฟล์หรือโฟลเดอร์ในช่อง prompt เพื่อแนบเนื้อหาไฟล์นั้นเข้าไปในบริบทของ Codex ทำให้ Codex เข้าใจโครงสร้างโปรเจกต์และเนื้อหาในไฟล์ได้อย่างแม่นยำโดยไม่ต้องคัดลอกโค้ดมาวางเอง

Model Switcher — เปลี่ยนโมเดลได้ทันที

เลือกโมเดล AI ที่ต้องการใช้งานได้จาก UI ใน panel โดยตรง สามารถสลับระหว่างโมเดลต่าง ๆ เพื่อให้เหมาะกับงาน เช่น งานเร็วใช้โมเดลเบา งานซับซ้อนใช้โมเดลที่มี reasoning สูง

Reasoning Effort — ควบคุมความลึกของการคิด
ระดับ	ความหมาย
low	คิดเร็ว ใช้ tokens น้อย เหมาะกับงานง่าย
medium	สมดุลระหว่างความเร็วและความแม่นยำ (ค่าเริ่มต้น)
high	คิดลึกขึ้น ใช้ tokens มากขึ้น เหมาะกับปัญหาซับซ้อน
Approval Mode — ควบคุมระดับสิทธิ์ของ Agent
โหมด	สิทธิ์
Chat	แสดงคำแนะนำเท่านั้น ไม่แก้ไขไฟล์ใด ๆ
Agent (ค่าเริ่มต้น)	อ่านและแก้ไขไฟล์ + รันคำสั่งภายใน working directory
Agent (Full Access)	เหมือน Agent แต่เพิ่มสิทธิ์เข้าถึงเครือข่าย (network access)
Cloud Delegation — ส่งงานขึ้นรันบนคลาวด์จาก IDE

สามารถโอนงานที่กำลังทำอยู่ใน IDE ขึ้นไปรันบน Codex cloud ได้โดยตรง โดยไม่ต้องเริ่มใหม่ วิธีทำ:

ตั้งค่า Cloud Environment ก่อน (ดูส่วน Web/Cloud)
ระหว่างใช้งาน agent ใน IDE เลือก "Run in the cloud"
สามารถเลือกได้ว่าจะเริ่มจาก main branch หรือ local changes ที่มีอยู่
บริบทและ context ทั้งหมดจะถูกส่งต่อไปยัง cloud ได้อย่างไร้รอยต่อ
Cloud Task Follow-up — ติดตามงาน cloud จาก IDE

เมื่อ cloud task รันเสร็จหรือต้องการ review สามารถโหลด cloud task กลับมาใน IDE ได้โดยใช้ slash command /cloud เพื่อดู diff, อนุมัติ, หรือดำเนินการต่อ

Web Search — ค้นหาข้อมูลจากเว็บ
Cached mode (ค่าเริ่มต้น): Codex ค้นหาจาก index ที่ OpenAI ดูแล เร็วและไม่ต้องใช้ network access
Live search (Full Access mode): ค้นหาข้อมูลล่าสุดแบบเรียลไทม์ ต้องใช้ Agent (Full Access)
Image Input — ส่งรูปภาพเข้า prompt

ลากและวางรูปภาพลงในช่อง chat ได้ทันที หากต้องการ drag-and-drop ให้กด Shift ค้างไว้ขณะลาก (บางเวอร์ชัน IDE อาจต้องทำเช่นนี้เพื่อป้องกัน IDE เปิดไฟล์แทน)

1.3 IDE Extension — การตั้งค่า (Settings)

อ้างอิง: Official Docs

วิธีเข้าถึง Settings

ไปที่ File > Preferences > Settings (หรือ Cmd+, / Ctrl+,) แล้วค้นหา "ChatGPT" หรือ "Codex"

ตารางการตั้งค่าทั้งหมด
Setting Key	ประเภท	ค่าเริ่มต้น	คำอธิบาย
chat.fontSize	number	(ค่า system)	ขนาดตัวอักษรใน Chat panel
chat.editor.fontSize	number	(ค่า system)	ขนาดตัวอักษรใน editor ภายใน chat
chatgpt.cliExecutable	string	codex	path ไปยัง Codex CLI binary ที่ต้องการใช้ หากติดตั้ง CLI ไว้ใน path ที่ไม่ปกติ
chatgpt.commentCodeLensEnabled	boolean	true	แสดง CodeLens บน comment เพื่อให้คลิก implement TODO ได้ทันที
chatgpt.localeOverride	string	(ค่าจาก OS)	บังคับให้ UI แสดงภาษาที่กำหนด เช่น th, en, ja
chatgpt.openOnStartup	boolean	false	เปิด Codex panel อัตโนมัติเมื่อ IDE เริ่มต้น
chatgpt.runCodexInWindowsSubsystemForLinux	boolean	false	รัน Codex CLI ผ่าน WSL บน Windows
ข้อควรรู้เกี่ยวกับ CLI Executable

ค่า chatgpt.cliExecutable มีประโยชน์เมื่อ:

คุณมี Codex CLI หลายเวอร์ชันและต้องการระบุเวอร์ชันที่ใช้
ติดตั้ง CLI ผ่าน path ที่ไม่ได้อยู่ใน $PATH ของระบบ
ใช้ virtual environment หรือ container ที่มี CLI อยู่ใน path แยก
1.4 IDE Commands — คำสั่งใน IDE

อ้างอิง: Official Docs

IDE Commands คืออะไร

IDE Commands คือคำสั่งที่เรียกใช้ผ่าน Command Palette ของ VS Code/Cursor/Windsurf (กด Cmd+Shift+P หรือ Ctrl+Shift+P) หรือผ่าน keyboard shortcut ที่กำหนดไว้

ตารางคำสั่งทั้งหมด
Command ID	ชื่อที่แสดง	Shortcut เริ่มต้น	คำอธิบาย
chatgpt.addToThread	Add to Thread	—	เพิ่มโค้ดหรือข้อความที่เลือกอยู่เข้าไปในบทสนทนาปัจจุบัน
chatgpt.addFileToThread	Add File to Thread	—	เพิ่มไฟล์ที่เปิดอยู่ทั้งไฟล์เข้าไปในบทสนทนา
chatgpt.newChat	New Chat	Cmd+N / Ctrl+N	เริ่มบทสนทนาใหม่ (ล้าง context เดิม)
chatgpt.implementTodo	Implement TODO	—	ให้ Codex ดำเนินการตาม comment // TODO ที่ cursor อยู่
chatgpt.newCodexPanel	New Codex Panel	—	เปิด Codex panel ใหม่ในหน้าต่างแยก
chatgpt.openSidebar	Open Sidebar	—	เปิด/แสดง Codex sidebar ในมุมมอง IDE
วิธีกำหนด Keyboard Shortcut เอง
เปิด Keyboard Shortcuts (Cmd+K Cmd+S หรือ Ctrl+K Ctrl+S)
ค้นหาด้วย command ID เช่น chatgpt.newChat
คลิก + เพื่อกำหนดปุ่มที่ต้องการ
1.5 Slash Commands ใน IDE

อ้างอิง: Official Docs

Slash Commands คืออะไร

Slash commands คือคำสั่งพิเศษที่พิมพ์โดยขึ้นต้นด้วย / ในช่อง chat ใน IDE เพื่อเรียกฟีเจอร์หรือโหมดพิเศษของ Codex โดยตรง

ตาราง Slash Commands ทั้งหมด
คำสั่ง	คำอธิบาย
/auto-context	ให้ Codex วิเคราะห์และเลือกไฟล์หรือบริบทที่เกี่ยวข้องกับคำถามโดยอัตโนมัติ โดยไม่ต้อง @mention ทีละไฟล์
/cloud	โหลด cloud task ที่รันอยู่หรือเสร็จแล้วกลับมาใน IDE เพื่อดู diff, review, หรือดำเนินการต่อ
/cloud-environment	เลือกหรือเปลี่ยน cloud environment ที่ต้องการใช้สำหรับการ run บนคลาวด์
/feedback	ส่ง feedback เกี่ยวกับ response ล่าสุดให้ทีม OpenAI โดยตรง
/local	บังคับให้ task รันบนเครื่องแบบ local แทนที่จะขึ้นคลาวด์ (กรณีที่มีการตั้งค่า cloud เป็น default)
/review	ขอให้ Codex ตรวจสอบ diff หรือการเปลี่ยนแปลงล่าสุดในโปรเจกต์และให้ความเห็น
/status	แสดงสถานะของ Codex agent ที่กำลังรันอยู่ รวมถึง cloud tasks ที่ pending
เคล็ดลับการใช้งาน
/auto-context มีประโยชน์มากเมื่อโปรเจกต์มีไฟล์จำนวนมาก ช่วยให้ไม่ต้องระบุไฟล์เองทุกครั้ง
/review เหมาะสำหรับใช้ก่อน commit เพื่อให้ Codex ช่วยตรวจสอบความถูกต้องของโค้ด
/status ช่วยให้รู้ว่า cloud task ที่ delegate ไปแล้วอยู่ในขั้นไหน โดยไม่ต้องเปิด browser
ส่วนที่ 2: CLI (Command Line Interface)
2.1 CLI — ภาพรวม

อ้างอิง: Official Docs

Codex CLI คืออะไร

Codex CLI คือเครื่องมือ command-line แบบ open source ที่พัฒนาด้วยภาษา Rust ทำให้ใช้งาน Codex AI agent ได้โดยตรงจาก terminal โดยไม่ต้องเปิดแอปพลิเคชัน CLI รองรับทั้งโหมด interactive (คุยโต้ตอบได้) และโหมด non-interactive (รันเป็น script อัตโนมัติ)

ระบบปฏิบัติการที่รองรับ
ระบบ	รองรับ
macOS	✅ รองรับเต็มที่
Linux	✅ รองรับเต็มที่
Windows	⚠️ รองรับแบบ experimental — แนะนำให้ใช้ผ่าน WSL (Windows Subsystem for Linux)
วิธีติดตั้ง

ติดตั้งผ่าน npm (แนะนำ):

npm i -g @openai/codex


ติดตั้งผ่าน Homebrew (macOS):

brew install openai-codex

วิธีอัปเดต CLI
npm i -g @openai/codex@latest

วิธีเริ่มใช้งาน
# เปิด interactive mode
codex

# รัน prompt โดยตรง (non-interactive)
codex "แก้ไข bug ในไฟล์ main.py"

# ดู help
codex --help

ซอร์สโค้ด

Codex CLI เป็น open source สามารถดูหรือมีส่วนร่วมได้ที่ GitHub repository ของ OpenAI

2.2 CLI — ฟีเจอร์หลัก

อ้างอิง: Official Docs

Interactive TUI (Text User Interface)

CLI มี UI แบบ text ที่ทำงานใน terminal โดยตรง แสดงบทสนทนา, diff ของการเปลี่ยนแปลง, และสถานะของ agent แบบ real-time มีระบบ scrollback เพื่อดูประวัติการสนทนา และรองรับการกด Ctrl+C เพื่อหยุด task กลางคัน

Model และ Reasoning Control
เลือกโมเดลได้ด้วย --model <model-name> หรือตั้งใน config
ควบคุม reasoning effort ด้วย --reasoning-effort low|medium|high
สลับโมเดลระหว่าง session ได้โดยใช้ slash command /model
Image Input

รองรับการส่งรูปภาพเข้าไปใน prompt ได้โดยตรง โดยระบุ path ของไฟล์รูปหรือ URL โดยใช้ flag --image

Local Code Review

ใช้คำสั่ง /review เพื่อให้ Codex วิเคราะห์ diff ล่าสุดใน git repository และแสดงความเห็นเกี่ยวกับคุณภาพโค้ด, potential bugs, และ security issues

Subagents

Codex CLI รองรับการสร้างและส่งต่องานไปยัง subagent ซึ่งเป็น agent ย่อยที่รันงานคู่ขนานหรือต่อเนื่องกัน ทำให้จัดการงานที่ซับซ้อนที่แบ่งเป็นหลาย task ได้ (ดูรายละเอียดเพิ่มเติมใน 04-configuration.md)

Web Search

เหมือนกับ IDE Extension — รองรับ cached search และ live search ขึ้นกับ approval mode ที่เลือก

Cloud Tasks

สั่งให้ task รันบน Codex cloud ได้โดยตรงจาก CLI ด้วย slash command /cloud หรือ flag ที่เกี่ยวข้อง ผลลัพธ์จะส่งกลับมาให้เมื่อเสร็จ

Scripting / Non-Interactive Mode

รัน CLI แบบไม่โต้ตอบ เหมาะสำหรับการทำงานอัตโนมัติใน CI/CD หรือ shell scripts:

# รันแบบ non-interactive
codex --non-interactive "สร้าง unit tests ให้กับฟังก์ชัน parse_user()"

# ใช้ pipe เพื่อส่ง input
echo "อธิบาย error นี้: $(cat error.log)" | codex

MCP (Model Context Protocol) Support

CLI รองรับการเชื่อมต่อกับ MCP servers ทำให้ขยายความสามารถของ agent ด้วย tools และ data sources จากภายนอก ตั้งค่าใน codex.yaml (ดูส่วน Configuration)

Approval Modes

เหมือนกับ IDE — มีโหมด Chat, Agent, และ Agent (Full Access) ควบคุมด้วย flag --approval-mode หรือตั้งใน config

2.3 CLI — Command Line Options (ตัวเลือกคำสั่ง)

อ้างอิง: Official Docs

โครงสร้างคำสั่งหลัก
codex [OPTIONS] [PROMPT]

Options ที่ใช้บ่อย
Flag	ค่า	คำอธิบาย
--model, -m	<model-name>	เลือกโมเดล เช่น codex-1, o4-mini
--reasoning-effort	low|medium|high	ระดับ reasoning ของโมเดล
--approval-mode	chat|agent|full	โหมดสิทธิ์ของ agent
--non-interactive	—	รัน task แบบไม่มี TUI (สำหรับ scripting)
--image	<path/url>	แนบรูปภาพเข้าไปใน prompt
--config	<path>	ระบุ path ของ config file ที่ต้องการใช้
--no-auto-context	—	ปิด auto-context (ไม่ให้ Codex เลือกไฟล์อัตโนมัติ)
--working-dir, -w	<path>	กำหนด working directory ที่ agent จะทำงานใน
--version	—	แสดงเวอร์ชันของ CLI
--help, -h	—	แสดง help ทั้งหมด
Subcommands

นอกจาก prompt โดยตรง CLI ยังมี subcommands เพิ่มเติม:

Subcommand	คำอธิบาย
codex auth	จัดการการ authenticate กับ OpenAI API
codex config	ดูหรือแก้ไข config ของ CLI
codex update	อัปเดต CLI เป็นเวอร์ชันล่าสุด
ตัวอย่างการใช้งาน
# เปิด interactive session ด้วย high reasoning
codex --reasoning-effort high

# รัน task แบบ non-interactive ด้วยโมเดลที่ระบุ
codex --non-interactive --model codex-1 "เพิ่ม error handling ให้กับ API calls ทั้งหมดในโปรเจกต์นี้"

# แนบรูปภาพใน prompt
codex --image screenshot.png "แก้ไข UI ให้ตรงกับรูปนี้"

# กำหนด working directory
codex --working-dir /path/to/project "เขียน tests ให้ครบ 80% coverage"

Environment Variables สำหรับ CLI
ตัวแปร	คำอธิบาย
OPENAI_API_KEY	API key สำหรับ authentication
CODEX_MODEL	โมเดลเริ่มต้น (override ได้ด้วย --model)
CODEX_REASONING_EFFORT	ค่า reasoning effort เริ่มต้น
NO_COLOR	ปิดสี ANSI ใน terminal output
2.4 Slash Commands ใน CLI

อ้างอิง: Official Docs

Slash Commands ใน CLI คืออะไร

ขณะใช้งานใน interactive mode พิมพ์ / ตามด้วยชื่อคำสั่งได้เลย เพื่อสั่งงานพิเศษโดยไม่ต้องออกจาก session

ตาราง Slash Commands ทั้งหมด
คำสั่ง	คำอธิบาย
/help	แสดงรายการ slash commands ทั้งหมดและวิธีใช้งาน
/model <name>	เปลี่ยนโมเดล AI ระหว่าง session เช่น /model o4-mini
/reasoning <level>	เปลี่ยนระดับ reasoning ระหว่าง session (low, medium, high)
/review	วิเคราะห์ git diff ล่าสุดและให้ความเห็น
/cloud	ส่ง task ปัจจุบันไปรันบน Codex cloud หรือโหลด cloud task กลับมา
/status	แสดงสถานะ agent และ cloud tasks
/clear	ล้างประวัติบทสนทนาในหน้าต่างปัจจุบัน
/exit	ออกจาก CLI session
/auto-context	เปิด/ปิดการให้ Codex เลือกไฟล์ context โดยอัตโนมัติ
/feedback	ส่ง feedback ให้ OpenAI เกี่ยวกับ response ล่าสุด
/mcp	แสดงหรือจัดการ MCP servers ที่เชื่อมต่ออยู่
/subagents	แสดงสถานะ subagents ที่กำลังรันอยู่
/local	บังคับให้ task รันแบบ local แทน cloud
เคล็ดลับ
ใช้ /model เพื่อสลับโมเดลโดยไม่ต้องออกและเปิด session ใหม่ ประหยัดเวลามาก
/review ควรใช้ก่อนทำ commit ทุกครั้งเพื่อตรวจสอบคุณภาพโค้ด
หากงานใช้เวลานาน ใช้ /cloud เพื่อ offload แล้วทำงานอื่นระหว่างรอ
ส่วนที่ 3: Web/Cloud
3.1 Web/Cloud — ภาพรวม

อ้างอิง: Official Docs

Codex Web/Cloud คืออะไร

Codex Web/Cloud คือระบบที่ให้ Codex รัน agent tasks บน server ของ OpenAI แทนที่จะรันบนเครื่องของคุณ ทำให้สามารถส่งงานให้รันใน background ระหว่างที่คุณทำอย่างอื่น รวมถึงรัน tasks แบบ parallel ได้หลาย task พร้อมกัน

ประโยชน์หลัก
ไม่ต้องเปิดเครื่องทิ้งไว้: งานรันบนคลาวด์ ปิดเครื่องหรือปิด IDE ก็ได้
Parallel tasks: รันหลาย task พร้อมกันได้ ไม่ต้องรอทีละงาน
สภาพแวดล้อมสะอาด: แต่ละ task รันใน container ที่ isolated ป้องกัน side effects
วิธีเริ่มต้นใช้งาน
เข้าไปที่ chatgpt.com/codex
เชื่อมต่อ GitHub account (ต้องมีเพื่อ clone repositories)
ตั้งค่า Cloud Environment (ดูหัวข้อถัดไป)
เริ่มสั่งงานได้ทั้งจาก web UI, IDE, หรือ CLI
การเชื่อมต่อกับ GitHub

การเชื่อมต่อ GitHub ทำให้ Codex:

Clone repository ของคุณลงใน cloud environment
สร้าง Pull Request แทนคุณได้
อ่าน Issues และ context จาก repository
3.2 Cloud Environments — สภาพแวดล้อมบนคลาวด์

อ้างอิง: Official Docs

Cloud Environment คืออะไร

Cloud Environment คือการตั้งค่า container ที่ Codex จะใช้รัน tasks บนคลาวด์ ประกอบด้วย: base image, environment variables, secrets, setup scripts, และการตั้งค่าอื่น ๆ สามารถมีหลาย environment และเลือกใช้ต่างกันได้ตามโปรเจกต์

Base Image

Codex ใช้ Universal Image ชื่อ openai/codex-universal เป็น base image เริ่มต้น image นี้รวม runtime และ tools ยอดนิยมไว้แล้ว:

Python, Node.js, Ruby, Go, Rust, Java
Common CLI tools (git, curl, wget, jq ฯลฯ)
Package managers หลักทั้งหมด
Auto Setup — การ setup อัตโนมัติ

Codex ตรวจจับและรัน package manager ที่เหมาะสมโดยอัตโนมัติตาม project files:

ไฟล์ที่ตรวจพบ	คำสั่งที่รันอัตโนมัติ
package.json (lock ของ npm)	npm install
yarn.lock	yarn install
pnpm-lock.yaml	pnpm install
requirements.txt หรือ setup.py	pip install
Pipfile	pipenv install
pyproject.toml (poetry)	poetry install
Manual Setup Script — Script ติดตั้งเอง

นอกจาก auto setup สามารถเขียน bash script เพื่อตั้งค่า environment เองได้ เช่น:

#!/bin/bash
# ติดตั้ง dependencies พิเศษ
apt-get install -y libpq-dev
pip install psycopg2-binary
npm install -g typescript


Setup script รันก่อนที่ agent จะเริ่มทำงาน และมีสิทธิ์เข้าถึงอินเทอร์เน็ต เสมอ

Environment Variables vs Secrets
	Environment Variables	Secrets
วัตถุประสงค์	ค่าทั่วไป config	ข้อมูลลับ (API keys, passwords)
การเข้ารหัส	ปกติ	เข้ารหัสพิเศษ (extra encryption)
เข้าถึงได้เมื่อ	ตลอดทั้ง task	เฉพาะ setup phase เท่านั้น
ช่วง agent phase	✅ เข้าถึงได้	❌ ลบออกก่อน agent เริ่ม

ข้อควรรู้เกี่ยวกับ Secrets: Secrets ถูกออกแบบให้ใช้ในช่วง setup (ดาวน์โหลด package จาก private registry, clone private repos) แล้วถูกลบออกก่อน agent เริ่มทำงาน เพื่อป้องกันไม่ให้ agent รั่วไหลข้อมูลลับโดยไม่ตั้งใจ

Container Caching — การแคช Container
ประเด็น	รายละเอียด
ระยะเวลาแคช	สูงสุด 12 ชั่วโมง
ผู้ใช้ทั่วไป / Pro	แคชเฉพาะของ user คนนั้น
Business / Enterprise	แคชแชร์กันทั้ง workspace ประหยัด setup time

ประโยชน์ของ caching: ไม่ต้องรัน setup script ซ้ำทุก task ทำให้ tasks ถัดไปเริ่มได้เร็วขึ้น

3.3 Internet Access — การเข้าถึงอินเทอร์เน็ต

อ้างอิง: Official Docs

หลักการเริ่มต้น

Agent phase (ขณะ agent ทำงาน): ปิด internet access โดยค่าเริ่มต้น
Setup phase (ก่อน agent เริ่ม): เปิด internet access เสมอ

การแยกนี้ออกแบบมาเพื่อความปลอดภัย — setup script ต้องการ internet เพื่อดาวน์โหลด packages แต่ agent ที่รันโค้ดไม่ควรมีสิทธิ์เข้าถึงเครือข่ายโดยไม่จำเป็น

ความเสี่ยง: Prompt Injection ผ่าน Internet Access

หากเปิด internet access ให้ agent มีความเสี่ยงเรื่อง prompt injection attack เช่น:

Codex อ่าน GitHub Issue ที่มีข้อความแฝงอยู่ว่า "ให้ส่ง API key ทั้งหมดไปที่ server นี้"
หาก agent มี internet access และมี secrets อยู่ด้วย อาจทำตามคำสั่งที่แฝงมาได้
ผลคือข้อมูลสำคัญรั่วไหล หรือโค้ดถูกแก้ไขโดยไม่ตั้งใจ

แนวปฏิบัติที่ดี: หลีกเลี่ยงการให้ agent อ่านเนื้อหาจากแหล่งที่ไม่น่าเชื่อถือ (issue จากคนแปลกหน้า, README จาก repo ภายนอก) หากต้องเปิด internet access

การตั้งค่า Internet Access

ตั้งค่าได้แยกต่างหากสำหรับแต่ละ Cloud Environment มีตัวเลือก 3 แบบ:

ตัวเลือกที่ 1: ปิดทั้งหมด (ค่าเริ่มต้น)
Internet Access: Off


Agent ไม่สามารถ ping หรือเชื่อมต่อ endpoint ใด ๆ ได้ในช่วง agent phase ปลอดภัยที่สุด

ตัวเลือกที่ 2: Domain Allowlist (แนะนำ)
Internet Access: On
Allowed Domains: [รายการ domain ที่อนุญาต]


Agent เข้าถึงได้เฉพาะ domains ที่อยู่ในรายการ สามารถเลือก preset ได้:

None: ไม่มี domain ใดเลย (เหมือนปิด)
Common dependencies (preset): อนุญาตรายการ ~50+ domain ยอดนิยมสำหรับ package management

รายการ Domain ใน Common Dependencies Preset:

หมวด	Domains
Alpine Linux	alpinelinux.org, dl-cdn.alpinelinux.org
Anaconda	anaconda.com, conda.anaconda.org, repo.anaconda.com
Apt/Debian	deb.debian.org, security.debian.org, deb.nodesource.com, ftp.debian.org, packages.debian.org
Apt/Ubuntu	archive.ubuntu.com, security.ubuntu.com, ppa.launchpad.net, launchpad.net, packages.ubuntu.com
Cargo (Rust)	crates.io, static.crates.io
Cloudflare	cloudflare.com, registry-1.docker.io, auth.docker.io
Conda Forge	conda-static.anaconda.org, conda.anaconda.org/conda-forge
GitHub	github.com, raw.githubusercontent.com, objects.githubusercontent.com, api.github.com, codeload.github.com
Go	proxy.golang.org, sum.golang.org, storage.googleapis.com
Gradle	plugins.gradle.org, jcenter.bintray.com, services.gradle.org, downloads.gradle.org
Java/Maven	repo.maven.apache.org, central.maven.org, repo1.maven.org
JetBrains	plugins.jetbrains.com, download.jetbrains.com
npm	registry.npmjs.org, npmjs.com, yarnpkg.com, registry.yarnpkg.com
PyPI	pypi.org, files.pythonhosted.org, bootstrap.pypa.io, pypi.python.org
RubyGems	rubygems.org, production.cloudfront.net
Other	keybase.io, keys.openpgp.org, keyserver.ubuntu.com
All unrestricted: ไม่มีข้อจำกัด domain (ความเสี่ยงสูงสุด)
ตัวเลือกที่ 3: HTTP Method Restriction

นอกจาก domain allowlist ยังสามารถจำกัด HTTP method ได้:

อนุญาตเฉพาะ GET (อ่านได้แต่ไม่ส่งข้อมูลออก)
อนุญาต GET, POST (ส่งข้อมูลได้บางส่วน)
อนุญาตทุก method
ตัวอย่าง config สำหรับ Internet Access
# ตัวอย่าง config ใน Cloud Environment
internet_access:
  enabled: true
  preset: common_dependencies
  extra_domains:
    - api.mycompany.com
    - internal.registry.io
  allowed_methods:
    - GET
    - POST

สรุปแนวปฏิบัติที่ดี
ใช้ Common dependencies preset สำหรับงาน development ทั่วไป
ใช้ Off (ค่าเริ่มต้น) เมื่อ task ไม่ต้องการ network เพิ่มความปลอดภัย
ระวังไม่ให้ agent อ่าน untrusted content เช่น GitHub issues จากบุคคลภายนอก เมื่อเปิด internet access
หากต้องการ secrets และ internet ในเวลาเดียวกัน ให้ตรวจสอบ input ของ task อย่างละเอียดก่อน
หัวข้อที่ยังไม่ได้เรียบเรียง
หัวข้อ	เหตุผล	ลิงก์
CLI Features (ละเอียด)	ไฟล์ต้นฉบับขนาดใหญ่ (53KB) เกินขีดจำกัด	link
CLI Reference (ละเอียด)	ไฟล์ต้นฉบับขนาดใหญ่ (82KB) เกินขีดจำกัด — ครอบคลุม flags ทุกตัว	link
CLI Slash Commands (ละเอียด)	ไฟล์ต้นฉบับขนาดใหญ่ (64KB) เกินขีดจำกัด	link

หมายเหตุ: เนื้อหาในส่วน CLI ด้านบนครอบคลุมทุก concept และ feature หลักจาก Official Docs แล้ว หากต้องการรายละเอียด flag หรือ slash command เฉพาะตัว สามารถอ้างอิงลิงก์ด้านบนโดยตรงได้

ไฟล์ถัดไป: 04-configuration.md — Config File, Permissions, Rules, Hooks, AGENTS.md, MCP, Plugins, Skills

 ก่อนหน้า
Codex App
ถัดไป
การตั้งค่า (Configuration)
```

## Page 4 (หน้า 1 / 6)
```text
Codex
คู่มืออย่างเป็นทางการ
11 เอกสาร
ระดับกลาง
การตั้งค่า (Configuration)

อ้างอิง: Config Basics ·  17 นาที

หน้า 1 / 6
คู่มือ Codex ภาษาไทย — ตอนที่ 4: การตั้งค่า (Configuration)

อ้างอิง Official Docs: Codex Configuration

แผนผังเนื้อหาในไฟล์นี้
หมวด	หัวข้อ	สถานะ
Config File	Config Basics	เรียบเรียงแล้ว
Config File	Advanced Config	เรียบเรียงแล้ว (ย่อ)
Config File	Config Reference	ต้องตรวจสอบเพิ่ม
Config File	Environment Variables	ต้องตรวจสอบเพิ่ม
Config File	Sample Config	ต้องตรวจสอบเพิ่ม
Configuration	Permissions	เรียบเรียงแล้ว (ย่อ)
Configuration	Speed	เรียบเรียงแล้ว
Configuration	Rules	เรียบเรียงแล้ว
Configuration	Hooks	เรียบเรียงแล้ว
Configuration	AGENTS.md	เรียบเรียงแล้ว
Configuration	MCP	เรียบเรียงแล้ว
Configuration	Plugins Overview	เรียบเรียงแล้ว
Configuration	Build Plugins	เรียบเรียงแล้ว
Configuration	Sites	เรียบเรียงแล้ว
Configuration	Skills	เรียบเรียงแล้ว
Configuration	Subagents	ต้องตรวจสอบเพิ่ม
1. Config Basics — พื้นฐานการตั้งค่า

อ้างอิง: Config Basics

หัวข้อนี้คืออะไร

Config Basics อธิบายวิธีตั้งค่า Codex ผ่านไฟล์ config.toml ซึ่งเป็นหัวใจหลักของการปรับพฤติกรรม Codex ในระดับ user และ project

ตำแหน่งไฟล์ Config

Codex อ่านการตั้งค่าจากหลายระดับ:

ระดับ	ตำแหน่ง	ความหมาย
User Config	~/.codex/config.toml	ค่าเริ่มต้นส่วนตัวของผู้ใช้
Project Config	.codex/config.toml (ที่ root ของ project)	ค่าเฉพาะ project นั้น
System Config	/etc/codex/config.toml	ค่าจากผู้ดูแลระบบ (enterprise)
ลำดับความสำคัญ (Precedence)

เมื่อค่าเดียวกันมีอยู่หลายที่ Codex ใช้ลำดับดังนี้:

CLI flags  >  project config  >  profile  >  user config  >  system config  >  defaults


ค่าที่กำหนดผ่าน CLI flag จะ override ทุกอย่างเสมอ

ตัวเลือกหลักที่ใช้บ่อย
ตัวเลือก	ประเภท	ความหมาย
model	string	โมเดลที่ใช้งาน เช่น "gpt-4.1"
approval_policy	string	โหมดอนุมัติ: "untrusted" / "on-request" / "never"
sandbox_mode	string	โหมด sandbox สำหรับความปลอดภัย
web_search	string	การค้นหาเว็บ: "cached" / "live" / "disabled"
model_reasoning_effort	string	ความลึกของ reasoning: "low" / "medium" / "high"
personality	string	รูปแบบการตอบสนองของ Codex
tui_keymap	string	keyboard layout ใน TUI
shell_environment_policy	string	นโยบาย environment ของ shell
log_dir	string	โฟลเดอร์เก็บ log
ตัวอย่างไฟล์ Config เบื้องต้น
# ~/.codex/config.toml

model = "gpt-4.1"
approval_policy = "on-request"
web_search = "live"
model_reasoning_effort = "medium"

Feature Flags

Codex มี feature flags ที่ควบคุมฟีเจอร์ต่างๆ ใน [features] section:

Feature Flag	ค่าเริ่มต้น	ความสมบูรณ์
hooks	false	Stable
memories	false	Stable
multi_agent	false	Stable
shell_snapshot	false	Stable
undo	false	Stable
fast_mode	false	Stable
apps	false	Experimental
codex_git_commit	false	Experimental

ตัวอย่างการเปิด hooks:

[features]
codex_hooks = true

สรุปสั้นๆ

ไฟล์ config.toml คือศูนย์กลางของการปรับแต่ง Codex ตั้งแต่เลือกโมเดล กำหนดนโยบายอนุมัติ ไปจนถึงเปิด feature ใหม่ๆ ค่าที่ตั้งไว้ใน project จะ override ค่าของผู้ใช้ และ CLI flags จะ override ทุกอย่าง

2. Advanced Config — การตั้งค่าขั้นสูง

อ้างอิง: Advanced Config

หัวข้อนี้คืออะไร

Advanced Config ครอบคลุมการตั้งค่าเชิงลึก เช่น profiles หลายชุด การค้นพบ project instructions และการตั้งค่า shell environment

Profiles

Profiles คือชุดการตั้งค่าที่มีชื่อ ทำให้สามารถสลับระหว่างการตั้งค่าต่างๆ ได้ง่าย เช่น profile สำหรับงาน security review กับ profile สำหรับงาน refactor ทั่วไป

[profile.strict]
approval_policy = "untrusted"
model_reasoning_effort = "high"

[profile.quick]
approval_policy = "never"
model_reasoning_effort = "low"


เรียกใช้ profile ด้วย: codex --profile strict

Project Instructions Discovery

Codex มีระบบค้นหา instruction files อัตโนมัติผ่าน parameter ต่อไปนี้:

ตัวเลือก	ความหมาย
project_doc_max_bytes	ขนาดสูงสุดของ instruction files รวม (default: 32KiB)
project_doc_fallback_filenames	ชื่อไฟล์สำรองนอกจาก AGENTS.md

ตัวอย่าง:

project_doc_fallback_filenames = ["TEAM_GUIDE.md", ".agents.md"]
project_doc_max_bytes = 65536

Shell Environment Policy

กำหนดว่า Codex จะ inherit environment variables จาก shell อย่างไร โดยสามารถเลือกให้ inherit ทั้งหมด เฉพาะบางส่วน หรือไม่ inherit เลย

ข้อควรระวัง

หน้า Advanced Config มีเนื้อหาขนาดใหญ่มาก ขอแนะนำให้อ่านเพิ่มเติมโดยตรงจาก Official Docs เพื่อรายละเอียดครบถ้วน

3. Config Reference, Environment Variables & Sample Config

อ้างอิง: Config Reference | Environment Variables | Sample Config

Config Reference

เป็นเอกสาร reference สำหรับทุก key ที่รองรับใน config.toml พร้อม type, ค่าเริ่มต้น และคำอธิบาย ควรใช้ร่วมกับ Config Basics และ Advanced Config

Environment Variables ที่สำคัญ

Codex รองรับการตั้งค่าบางอย่างผ่าน environment variables:

Variable	ความหมาย
OPENAI_API_KEY	API Key สำหรับเชื่อมต่อ OpenAI
CODEX_HOME	เปลี่ยนตำแหน่ง home directory ของ Codex (แทน ~/.codex)
CODEX_QUIET_MODE	ลดการแสดงผลให้เงียบลง
ข้อควรทราบ

ดู config ตัวอย่างครบถ้วนได้ที่ Sample Config ซึ่งเป็น template ที่สามารถ copy ไปปรับใช้ได้ทันที

4. Permissions — การกำหนดสิทธิ์

อ้างอิง: Permissions

หัวข้อนี้คืออะไร

Permissions ควบคุมว่า Codex สามารถเข้าถึงไฟล์ระบบ เครือข่าย และเรียกใช้คำสั่งอะไรได้บ้าง

Named Permission Profiles

Codex มี named profiles สำเร็จรูปให้เลือกใช้:

Profile	ความหมาย
:read-only	อ่านไฟล์ได้อย่างเดียว ห้ามแก้ไขหรือรัน
:workspace	ทำงานได้ภายใน working directory
:danger-full-access	เข้าถึงได้เต็มที่รวมถึง network

ใช้ใน CLI: codex --permissions :read-only "อ่านไฟล์ src/ ทั้งหมด"

Custom Permission Profiles

สร้าง profile เองใน config.toml:

[permissions.my-profile]
# กำหนด filesystem และ network access ตามต้องการ

ข้อควรระวัง

หน้า Permissions มีรายละเอียดจำนวนมากเกี่ยวกับ filesystem scope และ network access control ขอแนะนำให้อ่านโดยตรงจาก Official Docs สำหรับข้อมูลครบถ้วน

5. Speed — การเพิ่มความเร็ว

อ้างอิง: Speed

หัวข้อนี้คืออะไร

Speed อธิบายวิธีเพิ่มความเร็วในการทำงานของ Codex โดยไม่เสียประสิทธิภาพมากนัก

Fast Mode

Fast Mode เพิ่มความเร็วของโมเดลที่รองรับขึ้น 1.5x แลกกับการใช้ credits สูงขึ้น

โมเดลที่รองรับ:

โมเดล	อัตราการใช้ Credits ใน Fast Mode
GPT-5.5	2.5x เทียบกับ Standard
GPT-5.4	2x เทียบกับ Standard

วิธีเปิดใช้:

ใน CLI — ใช้ slash commands:

/fast on      # เปิด Fast Mode
/fast off     # ปิด Fast Mode
/fast status  # ดูสถานะปัจจุบัน


ใน Config ถาวร:

service_tier = "fast"

[features]
fast_mode = true


ใช้ได้ใน: Codex IDE Extension, Codex CLI, Codex App (เมื่อล็อกอินด้วย ChatGPT)

ไม่รองรับ: เมื่อใช้ API key โดยตรง (ใช้ standard API pricing แทน)

Codex-Spark

GPT-5.3-Codex-Spark เป็นโมเดลแยกต่างหาก (ไม่ใช่ Fast Mode) ที่ออกแบบมาสำหรับการ iteration โค้ดแบบ real-time ที่รวดเร็วมาก

ความสามารถน้อยกว่า GPT-5.4/5.5 แต่ตอบสนองเกือบทันที
ปัจจุบันใช้ได้เฉพาะสมาชิก ChatGPT Pro เท่านั้น (Research Preview)
มี usage limits แยกต่างหาก
สรุปสั้นๆ

Fast Mode เหมาะสำหรับงานที่ต้องการความเร็วและยอมแลกค่าใช้จ่ายเพิ่มขึ้น ส่วน Codex-Spark เหมาะสำหรับ iteration loop รวดเร็วที่ไม่ต้องการความสมบูรณ์สูงมาก

6. Rules — กฎการควบคุมพฤติกรรม

อ้างอิง: Rules

หัวข้อนี้คืออะไร

Rules ช่วยให้กำหนดกฎว่า Codex อนุญาต ห้าม หรือต้องขออนุมัติก่อนรันคำสั่ง shell ใด

ภาษา Starlark และ prefix_rule()

ไฟล์ .rules ใช้ภาษา Starlark (subset ของ Python) กำหนดกฎด้วยฟังก์ชัน prefix_rule():

prefix_rule(
    pattern = "rm -rf",
    decision = "forbidden",
    justification = "ห้ามลบไฟล์แบบ recursive โดยไม่ได้รับอนุมัติ",
    match = ["rm -rf /tmp"],
    not_match = ["rm -rf /nonexistent"]
)


ฟิลด์ของ prefix_rule():

ฟิลด์	ความหมาย
pattern	prefix ของคำสั่งที่ต้องการจับ
decision	"allow" / "prompt" / "forbidden"
justification	เหตุผลที่แสดงให้ผู้ใช้เห็น
match	ตัวอย่างคำสั่งที่ควร match
not_match	ตัวอย่างคำสั่งที่ไม่ควร match
การตัดสินใจ (Decisions)
Decision	ความหมาย
allow	อนุญาตทันทีโดยไม่ถามผู้ใช้
prompt	ขออนุมัติจากผู้ใช้ก่อนรัน
forbidden	ห้ามรันโดยสิ้นเชิง
Shell Compound Commands

Codex แยกคำสั่งที่ต่อกันด้วย &&, ||, ; ออกเป็นส่วนๆ ก่อนตรวจสอบกฎ เช่น:

npm test && rm -rf ./dist


Codex จะตรวจสอบ npm test และ rm -rf ./dist แยกกัน ดังนั้นกฎที่จับ rm -rf จะยังทำงานได้แม้อยู่ในคำสั่งซับซ้อน

ทดสอบกฎ
codex execpolicy check "rm -rf /tmp/test"


ใช้คำสั่งนี้เพื่อตรวจสอบว่ากฎที่เขียนทำงานตามที่คาดหวังหรือไม่

สรุปสั้นๆ

Rules ช่วยป้องกันการรันคำสั่งอันตรายโดยอัตโนมัติ เหมาะมากสำหรับทีมที่ต้องการ safety net ก่อน deploy หรือทำงานบน production environment

7. Hooks — เหตุการณ์อัตโนมัติ

อ้างอิง: Hooks

หัวข้อนี้คืออะไร

Hooks คือ event handlers ที่ทำงานอัตโนมัติเมื่อ Codex ทำเหตุการณ์ต่างๆ เช่น เริ่ม session, ก่อน/หลัง tool call, หรือเมื่อ agent หยุดทำงาน

เปิดใช้งาน Hooks

ต้องเปิด feature flag ก่อน:

[features]
codex_hooks = true


หมายเหตุ: Hooks ไม่รองรับบน Windows

โครงสร้าง hooks.json

สร้างไฟล์ ~/.codex/hooks.json หรือ .codex/hooks.json ใน project:

{
  "hooks": [
    {
      "event": "PreToolUse",
      "matcher": {
        "tool_name": "shell"
      },
      "command": ["./scripts/log-tool-use.sh"]
    }
  ]
}

Events ที่รองรับ
Event	เมื่อไหร่ทำงาน
SessionStart	เมื่อเริ่ม session ใหม่
PreToolUse	ก่อน Codex เรียกใช้ tool
PostToolUse	หลัง Codex เรียกใช้ tool เสร็จ
UserPromptSubmit	เมื่อผู้ใช้ส่ง prompt
Stop	เมื่อ agent หยุดทำงาน
Matcher Patterns

ใช้ matcher เพื่อกรอง event เฉพาะบาง tool:

{
  "matcher": {
    "tool_name": "shell"
  }
}


หรือ match ชื่อคำสั่ง:

{
  "matcher": {
    "command_prefix": "npm"
  }
}

Input/Output ของ Hook

Input (ส่งให้ hook script): JSON object มี event type, tool name, arguments, timestamp

Output (อ่านจาก hook script): JSON object ที่ hook ส่งกลับ ใช้ modifier เช่น block, replace สำหรับ PreToolUse

Concurrent Hooks

Hooks หลายอันที่ subscribe event เดียวกันจะทำงาน พร้อมกัน (concurrent) ดังนั้นออกแบบ hook ให้ทำงานอิสระจากกันได้

Timeout

หาก hook ไม่ตอบกลับภายใน timeout ที่กำหนด Codex จะถือว่า hook นั้น pass และดำเนินงานต่อ

สรุปสั้นๆ

Hooks เหมาะสำหรับ logging, audit trail, แจ้งเตือนทีม, หรือ block การกระทำบางอย่างแบบ programmatic ต้องเปิด feature flag และไม่ทำงานบน Windows

8. AGENTS.md — คำแนะนำแบบ Persistent สำหรับ Project

อ้างอิง: AGENTS.md

หัวข้อนี้คืออะไร

AGENTS.md เป็นไฟล์ที่ Codex อ่านก่อนเริ่มทำงานทุกครั้ง ช่วยให้กำหนด working agreements, conventions, และข้อมูล project ที่ Codex ควรรู้ไว้ตลอด

การค้นพบ AGENTS.md (Discovery)

Codex สร้าง "instruction chain" เมื่อเริ่มแต่ละ run ตามลำดับความสำคัญ:

Global scope: ค้นหาใน ~/.codex/ (หรือ $CODEX_HOME/)
อ่าน AGENTS.override.md ก่อน ถ้าไม่มีจึงอ่าน AGENTS.md
Project scope: เริ่มจาก Git root เดินลงมาถึง current directory
แต่ละโฟลเดอร์ตรวจสอบตามลำดับ: AGENTS.override.md → AGENTS.md → fallback filenames
อ่านได้สูงสุด 1 ไฟล์ต่อ 1 โฟลเดอร์
Merge: ต่อไฟล์จาก root ลงมา โดยไฟล์ที่อยู่ใกล้ current directory มากกว่าจะ override ค่าก่อนหน้า

ขนาดสูงสุดรวม: 32KiB (ปรับได้ผ่าน project_doc_max_bytes)

สร้าง Global Guidance
mkdir -p ~/.codex


สร้าง ~/.codex/AGENTS.md:

# ~/.codex/AGENTS.md

## Working agreements

- Always run `npm test` after modifying JavaScript files.
- Prefer `pnpm` when installing dependencies.
- Ask for confirmation before adding new production dependencies.


ทดสอบ:

codex --ask-for-approval never "Summarize the current instructions."

Layer Project Instructions

สร้าง AGENTS.md ที่ root ของ repository:

# AGENTS.md

## Repository expectations

- Run `npm run lint` before opening a pull request.
- Document public utilities in `docs/` when you change behavior.


เพิ่ม override เฉพาะในโฟลเดอร์ย่อยเมื่อต้องการกฎพิเศษ:

# services/payments/AGENTS.override.md

## Payments service rules

- Use `make test-payments` instead of `npm test`.
- Never rotate API keys without notifying the security channel.

ลำดับการอ่านไฟล์
~/.codex/AGENTS.md (Global)
    ↓
AGENTS.md (Repository root)
    ↓
services/AGENTS.md (ถ้ามี)
    ↓
services/payments/AGENTS.override.md (Override)  ← อ่านสุดท้าย = override ทุกอย่าง

Fallback Filenames

ถ้า project ใช้ชื่อไฟล์อื่น ตั้งค่า fallback:

# ~/.codex/config.toml
project_doc_fallback_filenames = ["TEAM_GUIDE.md", ".agents.md"]


Codex จะตรวจสอบ: AGENTS.override.md → AGENTS.md → TEAM_GUIDE.md → .agents.md

CODEX_HOME

เปลี่ยน home directory ของ Codex เพื่อใช้ profile ที่แตกต่าง:

CODEX_HOME=$(pwd)/.codex codex exec "List active instruction sources"

Troubleshooting
ปัญหา	วิธีแก้
ไม่โหลดอะไรเลย	ตรวจสอบว่า Codex อยู่ใน repository ที่ถูกต้อง และไฟล์มีเนื้อหา
โหลด guidance ผิด	ค้นหา AGENTS.override.md ใน parent directory
Codex ไม่รับ fallback name	ตรวจสอบ typo ใน project_doc_fallback_filenames แล้ว restart
เนื้อหาถูกตัด	เพิ่ม project_doc_max_bytes หรือแบ่งไฟล์ไปไว้ในโฟลเดอร์ย่อย
สรุปสั้นๆ

AGENTS.md คือวิธีกำหนด "คำแนะนำถาวร" ให้ Codex จำสำหรับทุก task ใน project โดยไม่ต้องพิมพ์ซ้ำทุกครั้ง ยิ่ง layer กันมากเท่าไหร่ ยิ่งปรับพฤติกรรมได้ละเอียดตามแต่ละส่วนของ codebase

9. MCP — Model Context Protocol

อ้างอิง: MCP

หัวข้อนี้คืออะไร

MCP (Model Context Protocol) ช่วยให้ Codex เชื่อมต่อกับ external services และ tools ผ่านมาตรฐาน MCP ทั้งแบบ local process (STDIO) และ remote server (HTTP)

ประเภทของ MCP Server
ประเภท	วิธีเชื่อมต่อ	เหมาะสำหรับ
STDIO	ผ่าน process บนเครื่อง	Tools แบบ local เช่น file system, local database
Streamable HTTP	ผ่าน URL	Remote services, cloud APIs
ตั้งค่าใน config.toml

STDIO Server:

[mcp_servers.context7]
command = "npx"
args = ["-y", "@upstash/context7-mcp"]


HTTP Server:

[mcp_servers.figma]
url = "https://figma.com/mcp"
headers = { "X-Api-Key" = "your-key" }

เพิ่ม MCP Server ผ่าน CLI
codex mcp add


คำสั่งนี้ช่วย interactive เพิ่ม MCP server โดยไม่ต้องแก้ไข config.toml ด้วยมือ

OAuth Authentication

สำหรับ MCP server ที่ต้องการ OAuth:

codex mcp login <server-name>


Port สำหรับ OAuth callback:

mcp_oauth_callback_port = 8085

กรองเครื่องมือ (Tool Filtering)

เลือกเฉพาะบาง tools จาก MCP server:

[mcp_servers.figma]
url = "https://figma.com/mcp"
enabled_tools = ["get_file", "get_component"]  # เปิดเฉพาะ tools เหล่านี้
# หรือ
disabled_tools = ["delete_file"]               # ปิด tools เหล่านี้

ตัวอย่าง MCP Servers ที่ใช้บ่อย
Server	ใช้ทำอะไร
Context7	ดึงข้อมูลจาก documentation ของ libraries
Figma MCP	ทำงานกับ Figma designs โดยตรง
Chrome DevTools	inspect browser state
GitHub MCP	อ่าน/เขียน GitHub issues, PRs
สรุปสั้นๆ

MCP ช่วยให้ Codex มี "ตา" และ "มือ" เพิ่มเติมผ่านการเชื่อมต่อกับ external services ทั้ง local และ remote ทำให้ Codex ทำงานกับ ecosystem ที่กว้างขึ้นโดยไม่ต้องเขียน custom integration

10. Plugins — ปลั๊กอินสำเร็จรูป

อ้างอิง: Plugins Overview

หัวข้อนี้คืออะไร

Plugins คือแพ็กเกจที่รวม Skills, App integrations, และ MCP servers เข้าด้วยกันในรูปแบบที่ติดตั้งและแชร์ได้ง่าย

Plugins ประกอบด้วยอะไร
ส่วนประกอบ	คืออะไร
Skills	คำแนะนำ (instructions) สำหรับงานเฉพาะด้าน Codex โหลดมาเมื่อจำเป็น
Apps	การเชื่อมต่อกับ tools เช่น GitHub, Slack, Google Drive
MCP Servers	Services ที่ให้ Codex เข้าถึงข้อมูลหรือ tools เพิ่มเติม
Plugin Directory

ใน Codex App: เปิด Plugins ในแถบด้านซ้าย → เลือกจาก 3 หมวด:

Curated by OpenAI — plugins ที่ OpenAI คัดมาให้
Shared with you — plugins จากสมาชิกใน workspace
Created by you — plugins ที่สร้างเอง

ใน CLI:

/plugins

วิธีติดตั้งและใช้งาน Plugin
เปิด Plugin Directory → ค้นหา Plugin ที่ต้องการ
กด Add to Codex (App) หรือ Install plugin (CLI)
เชื่อมต่อ external app ถ้า plugin ต้องการ (เช่น Gmail OAuth)
เริ่ม thread ใหม่ แล้วพิมพ์ task ที่ต้องการ

วิธีเรียกใช้ plugin:

# อธิบาย task โดยตรง
"Summarize unread Gmail threads from today"

# เรียก plugin โดยตรง (พิมพ์ @)
@Gmail "show me emails from last week about the project"

ปิด Plugin โดยไม่ถอนติดตั้ง
# ~/.codex/config.toml
[plugins."gmail@openai-curated"]
enabled = false

สรุปสั้นๆ

Plugins คือวิธีที่เร็วที่สุดในการขยายความสามารถของ Codex ด้วย workflow สำเร็จรูปจาก community หรือ OpenAI เหมาะสำหรับงานที่ต้องการเชื่อมต่อกับ external services โดยไม่ต้องตั้งค่า MCP ด้วยมือ

11. Build Plugins — สร้าง Plugin เอง

อ้างอิง: Build Plugins

หัวข้อนี้คืออะไร

Build Plugins อธิบายวิธีสร้าง, ทดสอบ และแจกจ่าย plugin ให้คนอื่นในทีมหรือ community

สร้าง Plugin ด้วย $plugin-creator

วิธีเร็วที่สุด:

$plugin-creator


Skill นี้จะช่วย scaffold ไฟล์ manifest .codex-plugin/plugin.json และสร้าง local marketplace สำหรับทดสอบ

โครงสร้าง Plugin
my-plugin/
├── .codex-plugin/
│   └── plugin.json          # Required: manifest
├── skills/
│   └── my-skill/
│       └── SKILL.md         # Optional: skill instructions
├── .app.json                # Optional: app/connector config
├── .mcp.json                # Optional: MCP server config
└── assets/                  # Optional: icons, logos

Plugin Manifest (.codex-plugin/plugin.json)

Minimal:

{
  "name": "my-first-plugin",
  "version": "1.0.0",
  "description": "Reusable greeting workflow",
  "skills": "./skills/"
}


Full:

{
  "name": "my-plugin",
  "version": "0.1.0",
  "description": "Bundle reusable skills and app integrations.",
  "author": {
    "name": "Your team",
    "email": "team@example.com"
  },
  "skills": "./skills/",
  "mcpServers": "./.mcp.json",
  "apps": "./.app.json",
  "interface": {
    "displayName": "My Plugin",
    "shortDescription": "Reusable skills and apps",
    "category": "Productivity",
    "brandColor": "#10A37F",
    "composerIcon": "./assets/icon.png"
  }
}

Marketplace

Marketplace คือ JSON catalog ที่ Codex ใช้ค้นหาและติดตั้ง plugins

Repo marketplace: $REPO_ROOT/.agents/plugins/marketplace.json
Personal marketplace: ~/.agents/plugins/marketplace.json

{
  "name": "local-example-plugins",
  "interface": {
    "displayName": "Local Example Plugins"
  },
  "plugins": [
    {
      "name": "my-plugin",
      "source": {
        "source": "local",
        "path": "./plugins/my-plugin"
      },
      "policy": {
        "installation": "AVAILABLE",
        "authentication": "ON_INSTALL"
      },
      "category": "Productivity"
    }
  ]
}


Policy options:

installation: "AVAILABLE" / "INSTALLED_BY_DEFAULT" / "NOT_AVAILABLE"
authentication: "ON_INSTALL" / "ON_FIRST_USE"
ติดตั้ง Plugin ที่ Repo
# คัดลอก plugin ไปไว้ใน repo
cp -R /path/to/my-plugin ./plugins/my-plugin

# เพิ่มใน marketplace.json
# แล้ว restart Codex

Codex ติดตั้ง Plugin ไว้ที่ไหน
~/.codex/plugins/cache/$MARKETPLACE_NAME/$PLUGIN_NAME/$VERSION/


สำหรับ local plugins ใช้ $VERSION = "local"

ข้อควรระวัง
ใช้ kebab-case สำหรับ name เพราะ Codex ใช้เป็น identifier
source.path ต้องขึ้นต้นด้วย ./ และ relative กับ marketplace root
การ publish ไปยัง Official Plugin Directory ยัง "coming soon"
สรุปสั้นๆ

Build Plugins เหมาะสำหรับทีมที่ต้องการ standardize workflows, แชร์ skills ข้าม repositories หรือ bundle MCP configs พร้อม app integrations ในที่เดียว

12. Sites — สร้างและ Deploy เว็บไซต์

อ้างอิง: Sites

หัวข้อนี้คืออะไร

Sites เป็น plugin ที่ให้ Codex สร้าง, บันทึก, deploy, และจัดการ websites, web apps, และ games ที่ host โดย OpenAI โดยตรงจาก Codex โดยไม่ต้องตั้งค่า deployment pipeline เอง

ข้อจำกัดการเข้าถึง

Sites อยู่ใน preview และ:

ChatGPT Business: ใช้ได้เลย (default)
ChatGPT Enterprise: admin ต้องเปิดใน RBAC settings ก่อน
วิธีเริ่มต้น
เปิด Sites plugin จาก Plugin Directory ถ้ายังไม่มี
เริ่ม thread ใหม่ แล้วพิมพ์ task เช่น:
@Sites Build a project request dashboard for my operations team.
Let team members submit requests, see who owns each one,
update the status, and filter the list.

ตรวจสอบ build → บอก Codex ให้ save version หรือ deploy
Two-Stage Publishing

Sites แยก publish เป็น 2 ขั้น:

Save a version — build และเชื่อมกับ Git commit นั้น ใช้สำหรับ review
Deploy a version — publish version ที่เลือกไปเป็น production URL

ทุก deployment URL คือ production ดังนั้นควร review ให้ดีก่อน deploy

รูปแบบ Site ที่รองรับ
ความต้องการ	ขอให้ Sites สร้าง
Landing page หรือ content site	Site ไม่มี persistent state
บันทึกข้อมูล, user progress	D1 (relational database)
รูปภาพ, ไฟล์, video uploads	R2 (object storage)
ไฟล์ + searchable metadata	D1 + R2 รวมกัน
Site ที่ต้อง login ด้วย workspace account	Workspace-authenticated user identity
Access Control
โหมด	ใครเข้าได้
admins_only	เจ้าของ + workspace admins
workspace_all	ทุกคนใน workspace
custom	เลือก users/groups เฉพาะ

ตัวอย่าง:

@Sites Change this deployed site's access to everyone in my workspace.

ไฟล์ .openai/hosting.json

Codex เก็บ linkage ของ project ไว้ที่ .openai/hosting.json:

{
  "project_id": "<project-id>",
  "d1": "DB",
  "r2": null
}

Runtime Secrets

เพิ่ม environment variables / secrets ผ่าน Sites panel ใน app sidebar (ห้ามเก็บลง git)

Checklist ก่อน Deploy
ตรวจสอบ source changes ใน Review Pane
ยืนยัน build สำเร็จ
ตั้ง access control ถูกต้อง
ตรวจสอบว่าไม่ commit secrets ไว้ใน source files
สรุปสั้นๆ

Sites ช่วยให้ deploy web project ได้เร็วขึ้นมากโดยไม่ต้องตั้งค่า CI/CD เอง เหมาะสำหรับ internal tools, dashboards, และ prototypes ที่ต้องการ URL ทันที

13. Skills — ทักษะ Agent

อ้างอิง: Agent Skills

หัวข้อนี้คืออะไร

Skills คือ "ทักษะ" ที่สอน Codex วิธีทำงานเฉพาะด้าน เช่น วิธี run test suite ของ project นั้น, วิธีสร้าง PR ตาม convention ทีม, หรือวิธีใช้ toolchain เฉพาะ

Skills คือ format สำหรับเขียน workflow ส่วน Plugins คือ unit สำหรับ distribute skills เหล่านั้น

Progressive Disclosure

Codex จัดการ context ผ่าน progressive disclosure:

เริ่มต้น: Codex รู้แค่ชื่อ, description, และ path ของ skills ที่มีอยู่
เมื่อเลือกใช้: Codex โหลด SKILL.md เต็มๆ ของ skill นั้น

Budget เริ่มต้น: ~2% ของ context window (หรือ 8,000 chars เมื่อไม่รู้ขนาด) สำหรับแสดงรายชื่อ skills

โครงสร้าง Skill
my-skill/
├── SKILL.md           # Required: instructions + metadata
├── scripts/           # Optional: executable code
├── references/        # Optional: documentation
├── assets/            # Optional: templates, resources
└── agents/
    └── openai.yaml    # Optional: UI metadata + policy

SKILL.md
---
name: skill-name
description: Explain exactly when this skill should and should not trigger.
---

Skill instructions for Codex to follow.

วิธีที่ Codex เรียกใช้ Skill
Explicit — พิมพ์ชื่อ skill โดยตรง: $skill-name หรือ /skills เพื่อเลือก
Implicit — Codex เลือก skill เองจาก description ที่ตรงกับ task
ตำแหน่งบันทึก Skills
Scope	ตำแหน่ง	เหมาะสำหรับ
REPO (CWD)	$CWD/.agents/skills	Skills เฉพาะ working directory
REPO (root)	$REPO_ROOT/.agents/skills	Skills สำหรับทุกคนใน repo
USER	$HOME/.agents/skills	Skills ส่วนตัวข้าม repos ทั้งหมด
ADMIN	/etc/codex/skills	Skills จาก admin สำหรับทุก user บนเครื่อง
SYSTEM	Built-in ใน Codex	Skills มาตรฐานจาก OpenAI
สร้าง Skill

วิธีเร็วที่สุด:

$skill-creator


วิธี manual:

mkdir -p ~/.agents/skills/my-skill
cat > ~/.agents/skills/my-skill/SKILL.md << 'EOF'
---
name: my-skill
description: ใช้สำหรับ...อธิบาย trigger ที่ชัดเจน
---

ขั้นตอนที่ Codex ต้องทำ...
EOF

ติดตั้ง Curated Skills
$skill-installer linear    # ติดตั้ง Linear skill


Skill ติดตั้งจะแสดงใน Codex อัตโนมัติ ถ้าไม่ขึ้น restart Codex

ปิด Skill โดยไม่ลบ
# ~/.codex/config.toml
[[skills.config]]
path = "/path/to/skill/SKILL.md"
enabled = false

Optional Metadata (agents/openai.yaml)
interface:
  display_name: "Optional user-facing name"
  short_description: "Optional description"
  icon_small: "./assets/small-logo.svg"
  brand_color: "#3B82F6"
  default_prompt: "Optional surrounding prompt"

policy:
  allow_implicit_invocation: false  # ปิด implicit matching

dependencies:
  tools:
    - type: "mcp"
      value: "openaiDeveloperDocs"
      description: "OpenAI Docs MCP server"
      transport: "streamable_http"
      url: "https://developers.openai.com/mcp"


allow_implicit_invocation: false หมาย Codex จะไม่เรียก skill นี้โดยอัตโนมัติ ต้องพิมพ์ $skill-name เท่านั้น

Best Practices
ให้ skill ทำงานเดียวดีๆ อย่าพยายามทำหลายอย่างใน skill เดียว
เขียน description ชัดเจนว่า "เมื่อไหร่ควรใช้" และ "เมื่อไหร่ไม่ควรใช้"
ใช้ instructions แทน scripts ยกเว้นต้องการ deterministic behavior
เขียนเป็น imperative steps พร้อม inputs/outputs ชัดเจน
สรุปสั้นๆ

Skills คือวิธีที่ดีที่สุดในการสอน Codex ให้ทำงานตาม convention ของ project หรือทีม เริ่มจาก $skill-creator เพื่อ scaffold ได้เลย

14. Subagents — Agent ย่อย

อ้างอิง: Subagents

หัวข้อนี้คืออะไร

Subagents คือ agent ย่อยที่ Codex สามารถ spawn ขึ้นมาทำงานแบบ parallel เพื่อแก้ปัญหาที่ต้องการ multi-agent coordination หรืองานที่แบ่งเป็นส่วนๆ ได้

รายละเอียดสำคัญ

Subagents configuration มีเนื้อหาครอบคลุมการตั้งค่า custom agents, กำหนด model, permissions, และ workflow ของ subagent ในหน้า config ซึ่งมีขนาดใหญ่ ขอแนะนำอ่านเพิ่มเติมที่ Official Docs — Subagents

ข้อมูลเบื้องต้นเกี่ยวกับ Subagents concept อยู่ใน 01-overview-concepts.md หมวด Concepts

หัวข้อที่ยังไม่ได้เรียบเรียงครบถ้วน
หัวข้อ	เหตุผล	ลิงก์
Config Reference (full)	หน้าขนาดใหญ่ เป็น reference table ควรดูจาก Official Docs โดยตรง	Config Reference
Environment Variables (full)	ข้อมูลที่อาจเปลี่ยนแปลงบ่อย ควรตรวจสอบจาก Official Docs	Environment Variables
Sample Config (full)	Template สำเร็จรูป ดีที่สุดเมื่อเปิดจาก Official Docs โดยตรง	Sample Config
Permissions (full)	หน้าขนาดใหญ่ (61KB) ครอบคลุม filesystem/network rules ละเอียด	Permissions
Advanced Config (full)	หน้าขนาดใหญ่ (53KB) มี profiles, shell policy details เพิ่มเติม	Advanced Config
Subagents config (full)	หน้าขนาดใหญ่ ครอบคลุม custom agent definitions	Subagents
 ก่อนหน้า
IDE Extension, CLI และ Web/Cloud
ถัดไป
Integrations & Codex Security
```

## Page 5 (หน้า 2 / 6)
```text
Codex
คู่มืออย่างเป็นทางการ
11 เอกสาร
ระดับกลาง
Integrations & Codex Security

- 1. การเชื่อมต่อ GitHub (Code Review) ·  14 นาที

หน้า 2 / 6
Codex คู่มือภาษาไทย — ตอนที่ 5: Integrations & Codex Security

ไฟล์นี้ครอบคลุม: GitHub Integration, Slack Integration, Linear Integration, Codex Security Overview, Codex Security Plugin, Codex Security Cloud Setup, Improving the Threat Model, FAQ

สารบัญ
1. การเชื่อมต่อ GitHub (Code Review)
2. การใช้ Codex ใน Slack
3. การใช้ Codex ใน Linear
4. Codex Security — ภาพรวม
5. Codex Security Plugin
6. Codex Security Cloud — การตั้งค่า
7. การปรับปรุง Threat Model
8. Codex Security FAQ
1. การเชื่อมต่อ GitHub (Code Review)

อ้างอิง: Official Docs

หัวข้อนี้คืออะไร

ฟีเจอร์ Codex Code Review ใน GitHub ช่วยให้ Codex ทำหน้าที่เป็น reviewer คนหนึ่งบน Pull Request ของ GitHub โดยอัตโนมัติ Codex จะวิเคราะห์ diff ของ PR ตามแนวทางที่คุณกำหนดใน AGENTS.md แล้วโพสต์ GitHub code review ที่เน้นปัญหาสำคัญ

ข้อกำหนดเบื้องต้น

ก่อนเริ่มใช้งาน ต้องมี:

ตั้งค่า Codex cloud สำหรับ repository ที่ต้องการ review
เข้าถึง Codex code review settings ได้
มีไฟล์ AGENTS.md ถ้าต้องการให้ Codex ทำตาม review guideline เฉพาะของ repository
วิธีตั้งค่า Codex Code Review
ตั้งค่า Codex cloud สำหรับ repository ที่ต้องการ
ไปที่ Codex settings
เปิดสวิตช์ Code review สำหรับ repository นั้น
วิธีขอให้ Codex Review

ในหน้า Pull Request บน GitHub ให้พิมพ์ comment ว่า:

@codex review


Codex จะแสดงไอคอน 👀 เพื่อบอกว่ากำลังทำงาน แล้วโพสต์ review ใน PR เหมือนที่ teammate คนหนึ่งจะทำ โดย Codex จะแจ้งเฉพาะ P0 และ P1 เท่านั้น เพื่อให้ review comment มุ่งเน้นเฉพาะปัญหาสำคัญ

การเปิด Automatic Reviews

ถ้าต้องการให้ Codex review ทุก PR โดยอัตโนมัติ ให้เปิด Automatic reviews ใน Codex settings Codex จะ review ทุกครั้งที่มีการเปิด PR ใหม่ โดยไม่ต้องพิมพ์ @codex review

การกำหนดสิ่งที่ให้ Codex Review

Codex ค้นหาไฟล์ AGENTS.md ใน repository แล้วทำตาม Review guidelines ที่คุณกำหนดไว้

วิธีเพิ่ม review guidelines:

## Review guidelines

- ห้าม log ข้อมูลส่วนตัว (PII)
- ตรวจสอบว่า authentication middleware ครอบ route ทุกตัว


Codex ใช้ AGENTS.md ที่ใกล้กับไฟล์ที่เปลี่ยนแปลงที่สุด คุณสามารถวาง instructions ที่เฉพาะเจาะจงลึกลงไปใน directory tree ได้สำหรับ package ที่ต้องการตรวจสอบพิเศษ

สำหรับการ review เฉพาะครั้ง ให้เพิ่ม focus ใน comment:

@codex review for security regressions

การแก้ไขปัญหาที่พบ

หลังจาก Codex โพสต์ review แล้ว สามารถขอให้แก้ปัญหาได้ทันทีใน PR เดียวกัน:

@codex fix the P1 issue


Codex จะสร้าง cloud task โดยใช้ context ของ PR แล้วสามารถ push การแก้ไขกลับไปที่ branch ได้ถ้ามีสิทธิ์

การให้ Codex ทำงานอื่น

ถ้าพิมพ์ @codex ใน comment พร้อมข้อความอื่นที่ไม่ใช่ review Codex จะเริ่ม cloud task โดยใช้ PR เป็น context เช่น:

@codex fix the CI failures

การแก้ปัญหาเบื้องต้น

ถ้า Codex ไม่ตอบสนองหรือไม่โพสต์ review ให้ตรวจสอบ:

เปิด Code review สำหรับ repository นั้นใน Codex settings แล้วหรือยัง
PR นั้นอยู่ใน repository ที่ตั้งค่า Codex cloud ไว้แล้วหรือยัง
ใช้ @codex review ที่ถูกต้องใน PR comment
สำหรับ automatic reviews ตรวจสอบว่าเปิด Automatic reviews ไว้แล้ว
สรุป

Codex Code Review ใน GitHub คือเครื่องมือที่ช่วยให้ทีมได้รับการ review คุณภาพสูงโดยอัตโนมัติ ใช้ @codex review เพื่อ trigger ด้วยตนเอง หรือเปิด automatic reviews เพื่อให้ Codex review ทุก PR อัตโนมัติ ปรับแต่งด้วย AGENTS.md เพื่อให้ Codex เข้าใจบริบทและข้อกำหนดของ project

2. การใช้ Codex ใน Slack

อ้างอิง: Official Docs

หัวข้อนี้คืออะไร

Codex ใน Slack ช่วยให้ทีมสั่งงาน Codex ได้โดยตรงจาก Slack channels และ threads แค่ mention @Codex พร้อม prompt Codex จะสร้าง cloud task และตอบกลับพร้อมผลลัพธ์

ข้อกำหนดเบื้องต้น

ต้องมี:

แผน Plus, Pro, Business, Enterprise หรือ Edu
เชื่อมต่อ GitHub account แล้ว
มี environment อย่างน้อย 1 รายการใน Codex cloud
วิธีตั้งค่า Slack App
ตั้งค่า Codex cloud tasks ก่อน
ไปที่ Codex settings แล้วติดตั้ง Slack app สำหรับ workspace ของคุณ (อาจต้องให้ admin ของ Slack workspace อนุมัติก่อน)
เพิ่ม @Codex เข้า channel ที่ต้องการ
วิธีเริ่มงาน
ใน channel หรือ thread ให้ mention @Codex พร้อม prompt ที่ต้องการ — Codex สามารถอ่าน context จาก messages ก่อนหน้าใน thread ได้ จึงไม่จำเป็นต้องพิมพ์ context ซ้ำ
(ไม่บังคับ) ระบุ environment หรือ repository เช่น: @Codex fix the above in openai/codex
รอให้ Codex แสดงไอคอน 👀 แล้วตอบกลับด้วยลิงก์ไปยัง task เมื่อเสร็จจะโพสต์ผลใน thread
วิธีที่ Codex เลือก Environment และ Repo
Codex ดู environments ที่คุณมีสิทธิ์เข้าถึงและเลือกที่เหมาะที่สุดกับคำร้องขอ ถ้าไม่ชัดเจน จะใช้ environment ล่าสุดที่เคยใช้
Task จะทำงานบน default branch ของ repo แรกใน repo map ของ environment นั้น
ถ้าไม่มี environment หรือ repo ที่เหมาะสม Codex จะตอบใน Slack พร้อมวิธีแก้ไข
การควบคุมข้อมูล (Enterprise)

โดยค่าเริ่มต้น Codex จะตอบใน thread พร้อมผลลัพธ์ที่อาจรวมข้อมูลจาก environment สำหรับ Enterprise admin สามารถปิดการตอบนี้ได้ใน ChatGPT workspace settings โดยปิด Allow Codex Slack app to post answers on task completion — เมื่อปิดแล้ว Codex จะตอบเฉพาะลิงก์ task เท่านั้น

เรื่องข้อมูลส่วนตัวและความปลอดภัย

เมื่อ mention @Codex Codex จะรับ message และประวัติ thread เพื่อสร้าง task การจัดการข้อมูลเป็นไปตาม Privacy Policy และ Terms of Use ของ OpenAI

เคล็ดลับและการแก้ปัญหา
ไม่เชื่อมต่อ: ถ้า Codex ยืนยัน Slack หรือ GitHub connection ไม่ได้ จะตอบพร้อมลิงก์สำหรับ reconnect
เลือก environment ผิด: ตอบใน thread ระบุ environment ที่ต้องการ เช่น Please run this in openai/openai (applied) แล้ว mention @Codex ใหม่
Thread ยาวหรือซับซ้อน: สรุป context สำคัญใน message ล่าสุด เพื่อไม่ให้ Codex พลาดข้อมูลที่ฝังอยู่ด้านบน
สรุป

Codex ใน Slack ช่วยให้ทีมสั่งงาน coding ได้โดยตรงจาก conversation โดยไม่ต้องเปิดหน้า ChatGPT ใหม่ เหมาะมากสำหรับทีมที่ทำงานบน Slack เป็นหลัก

3. การใช้ Codex ใน Linear

อ้างอิง: Official Docs

หัวข้อนี้คืออะไร

Codex ใน Linear ช่วยให้มอบหมายงานให้ Codex ได้โดยตรงจาก Linear issues เพียงแค่ assign issue ให้ Codex หรือ mention @Codex ใน comment Codex จะสร้าง cloud task และตอบกลับพร้อมความคืบหน้าและผลลัพธ์

Codex ใน Linear ใช้ได้บนแผน Pro ขึ้นไป — สำหรับ Enterprise ต้องให้ ChatGPT workspace admin เปิด Codex cloud tasks ใน workspace settings และเปิด Codex for Linear ใน connector settings

วิธีตั้งค่า Linear Integration
ตั้งค่า Codex cloud tasks โดย connect GitHub และสร้าง environment สำหรับ repository ที่ต้องการ
ไปที่ Codex settings แล้วติดตั้ง Codex for Linear
เชื่อมต่อ Linear account โดย mention @Codex ใน comment thread ของ Linear issue
วิธีมอบหมายงานให้ Codex

มี 2 วิธี:

วิธีที่ 1: Assign Issue ให้ Codex

หลังติดตั้ง integration แล้ว assign issue ให้ Codex ได้เหมือนกับการ assign ให้ teammate คนอื่น Codex จะเริ่มทำงานและโพสต์ update กลับมาใน issue

วิธีที่ 2: Mention @Codex ใน Comments

พิมพ์ @Codex ใน comment thread เพื่อมอบหมายงานหรือถามคำถาม หลัง Codex ตอบกลับแล้ว สามารถ follow up ใน thread เดิมได้เพื่อดำเนินการต่อใน session เดียวกัน

เพื่อ pin repository เฉพาะ ให้ระบุใน comment เช่น: @Codex fix this in openai/codex

การติดตามความคืบหน้า
เปิด Activity ใน issue เพื่อดู progress updates
เปิดลิงก์ task เพื่อติดตามรายละเอียด

เมื่อ task เสร็จ Codex จะโพสต์สรุปและลิงก์ไปยัง completed task เพื่อให้สร้าง PR ได้

วิธีที่ Codex เลือก Environment และ Repo
Linear จะแนะนำ repository ตาม context ของ issue Codex จะเลือก environment ที่เหมาะสม ถ้าไม่ชัดเจนจะใช้ environment ล่าสุด
Task ทำงานบน default branch ของ repo แรกใน repo map ของ environment
ถ้าไม่มี environment หรือ repo ที่เหมาะสม Codex จะตอบใน Linear พร้อมวิธีแก้ไข
การ Assign Issues ให้ Codex อัตโนมัติ

ใช้ triage rules ใน Linear เพื่อ assign issues ให้ Codex โดยอัตโนมัติ:

ไปที่ Settings ใน Linear
ภายใต้ Your teams เลือก team
เปิด Triage ใน workflow settings
ใน Triage rules สร้าง rule และเลือก Delegate → Codex

Linear จะ assign issues ใหม่ที่เข้า triage ให้ Codex โดยอัตโนมัติ — task จะทำงานใน account ของ issue creator

เชื่อมต่อ Linear สำหรับ Local Tasks (MCP)

ถ้าใช้ Codex app, CLI หรือ IDE Extension และต้องการให้ Codex เข้าถึง Linear issues ในเครื่อง ต้องตั้งค่า Linear MCP server

วิธีเพิ่มผ่าน CLI (แนะนำ):

codex mcp add linear --url https://mcp.linear.app/mcp


วิธีตั้งค่าด้วยตนเอง — เปิด ~/.codex/config.toml แล้วเพิ่ม:

[mcp_servers.linear]
url = "https://mcp.linear.app/mcp"


จากนั้นรัน:

codex mcp login linear

เรื่องข้อมูลส่วนตัวและความปลอดภัย

เมื่อ mention @Codex หรือ assign issue ให้ Codex Codex จะรับเนื้อหา issue เพื่อสร้าง task การจัดการข้อมูลเป็นไปตาม Privacy Policy ของ OpenAI

เคล็ดลับและการแก้ปัญหา
ไม่เชื่อมต่อ: Codex จะตอบใน issue พร้อมลิงก์สำหรับเชื่อมต่อ account
เลือก environment ผิด: ตอบใน thread ระบุ environment เช่น @Codex please run this in openai/codex
โค้ดผิดส่วน: เพิ่ม context ใน issue หรือให้คำแนะนำเฉพาะเจาะจงใน comment
สรุป

Codex ใน Linear ช่วยให้ทีมที่ใช้ Linear ในการจัดการงานมอบหมายงาน coding ให้ Codex ได้โดยตรง ไม่ว่าจะเป็นการ assign issue หรือ mention ใน comment รวมถึงสามารถ automate ด้วย triage rules ได้ด้วย

4. Codex Security — ภาพรวม

อ้างอิง: Official Docs

หัวข้อนี้คืออะไร

Codex Security คือชุดเครื่องมือวิเคราะห์ความปลอดภัยของโค้ดที่ขับเคลื่อนด้วย AI ช่วยให้ทีม developer และ security ค้นพบและแก้ไขช่องโหว่ได้อย่างมีประสิทธิภาพ

มี 2 รูปแบบหลัก:

Codex Security Plugin — ทำงานใน Codex thread ของคุณ ใช้สำหรับ repository หรือ diff ที่คุณมีสิทธิ์เข้าถึง
Codex Security Cloud — สแกน GitHub repositories ที่เชื่อมต่อผ่าน Codex Web (ปัจจุบันอยู่ใน research preview)
Codex Security Cloud ทำงานอย่างไร

Codex Security Cloud สแกน repositories ที่เชื่อมต่อแบบ commit by commit โดย:

สร้าง scan context จาก repository — ทำความเข้าใจโครงสร้างและ architecture
ตรวจสอบช่องโหว่ที่น่าสงสัย เทียบกับ context นั้น
ยืนยัน high-signal issues ในสภาพแวดล้อม isolated ก่อนแสดงผล

ผลลัพธ์ที่ได้คือ workflow ที่เน้น:

Context เฉพาะของ repository แทนที่จะใช้ generic signatures
หลักฐานการยืนยันเพื่อลด false positives
Suggested fixes ที่สามารถ review ได้ใน GitHub
สิทธิ์การเข้าถึง Codex Security Cloud

Codex Security ใช้ได้สำหรับผู้ใช้ ChatGPT Enterprise, Edu, Business และ Pro โดยต้องทำงานกับ GitHub repositories ที่เชื่อมต่อผ่าน Codex Web

ความแตกต่างระหว่าง Plugin กับ Cloud
ลักษณะ	Plugin	Cloud
ที่ทำงาน	Codex thread	Codex Web
เป้าหมาย	Repository/diff ที่คุณมีสิทธิ์	GitHub repos ที่เชื่อมต่อ
การ trigger	คุณสั่งเอง	อัตโนมัติ commit by commit
สถานะ	พร้อมใช้งาน	Research Preview
สรุป

Codex Security คือเครื่องมือช่วยทีมด้านความปลอดภัยของโค้ด ด้วยการใช้ AI วิเคราะห์เชิง semantic แทน pattern matching แบบเก่า ลด false positives และเสนอ patch ให้ตรวจสอบก่อน merge เสมอ

5. Codex Security Plugin

อ้างอิง: Official Docs

หัวข้อนี้คืออะไร

Codex Security Plugin เพิ่ม security-review workflows เข้า Codex thread ของคุณ ใช้สำหรับสแกน repository ตรวจสอบ diff ก่อน merge ยืนยัน findings และเตรียม fixes ที่ผ่านการตรวจสอบแล้ว

การติดตั้ง Plugin

วิธีติดตั้งบน Codex App:
ไปที่ Plugin Directory ใน Codex App และค้นหา "Codex Security"

วิธีติดตั้งบน Codex CLI:

codex plugins install codex-security


หลังติดตั้งแล้วให้เริ่ม thread ใหม่ใน repository ที่ต้องการสแกน

เลือก Security Workflow ที่เหมาะสม

ควรเลือก workflow ที่แคบที่สุดที่ตอบคำถามของคุณ:

เป้าหมาย	Skill	ขอบเขตและผลลัพธ์
Review repository หรือ path เฉพาะ	$codex-security:security-scan	ทำ threat modeling, finding discovery, validation, attack-path analysis แล้วสร้างรายงาน Markdown และ HTML
Audit แบบ high-recall	$codex-security:deep-security-scan	ทำ repository-wide discovery ซ้ำด้วย workers แบบ delegate ก่อน validation และ reporting — ใช้กับ repository ทั้งหมดเท่านั้น
Review change ก่อน merge	$codex-security:security-diff-scan	ตรวจสอบ PR, commit, branch diff หรือ working-tree patch แล้วสร้างรายงาน Markdown
แก้ไข 1 finding	$codex-security:fix-finding	ยืนยันหรือ reproduce 1 finding แล้วทำ fix ที่ minimal
ตัวอย่าง Prompts

สแกน repository ทั้งหมด:

Use $codex-security:security-scan to scan this repository for security
vulnerabilities. Keep the scan grounded in code evidence, validate plausible
findings where feasible, and return the final report paths. Do not modify code.


ตรวจสอบ changes ปัจจุบัน:

Use $codex-security:security-diff-scan to review the current branch diff for
security regressions. Keep the review scoped to changed code and directly
supporting files. Do not modify code.

ขั้นตอนการสแกน Repository

Repository scans ใช้ staged workflow:

Threat modeling — ระบุ entry points, trust boundaries, sensitive actions และ risky components
Finding discovery — ค้นหา source-to-sink paths หรือ broken controls ใน scope ที่กำหนด
Validation — ทดสอบหรือยืนยัน plausible findings แล้วบันทึกหลักฐานหรือช่องว่างของหลักฐาน
Attack-path analysis — ติดตาม exploitable paths และให้คะแนน severity สำหรับ findings ที่ผ่านการ validate แล้ว
Reporting — เขียน findings, locations, validation evidence, remediation guidance ลงไฟล์

การสแกนจะสร้างไฟล์ report.md และ report.html ที่อ่านได้ใน scan directory ของตัวเอง

การแก้ไข Findings

เมื่อ finding เป็น actionable ให้ขอ fix ที่มีขอบเขตชัดเจน:

Use $codex-security:fix-finding to fix finding [finding ID หรือ report reference].
Add focused regression coverage, verify legitimate behavior still works,
and show that the original issue no longer reproduces.
Do not broaden the change beyond this finding.

ข้อควรระวังด้านความปลอดภัย
สแกนเฉพาะ repository ที่คุณเป็นเจ้าของหรือองค์กรอนุมัติให้ตรวจสอบ
Finding คือ input สำหรับ review ไม่ใช่คำสั่งให้ merge code หรือ test เป้าหมายอื่น
การสแกนครั้งแรกควรเป็น read-only เสมอ จนกว่าจะขอให้ Codex เตรียม fix
Review คำสั่ง build, run หรือ reproduce ก่อน approve เสมอ โดยเฉพาะใน repository ที่ไม่คุ้นเคย
Review patch และ validation result ทุกตัวก่อน merge
สรุป

Codex Security Plugin คือชุดเครื่องมือตรวจสอบความปลอดภัยที่ทำงานภายใน Codex thread ใช้ workflow ที่เหมาะสมกับงาน เพื่อประสิทธิภาพสูงสุดและการ review ที่ง่ายขึ้น

6. Codex Security Cloud — การตั้งค่า

อ้างอิง: Official Docs

หัวข้อนี้คืออะไร

หน้านี้อธิบายขั้นตอนตั้งแต่การ setup เบื้องต้นจนถึงการ review findings และสร้าง remediation pull requests ด้วย Codex Security Cloud

ขั้นตอนที่ 1: ยืนยัน Access และ Environment

ต้องตั้งค่า Codex Cloud ก่อน — ดู Codex Cloud

Codex Security สแกน GitHub repositories ที่เชื่อมต่อผ่าน Codex Cloud จากนั้น:

ยืนยันว่า workspace ของคุณมีสิทธิ์เข้าถึง Codex Security
ยืนยันว่า repository ที่ต้องการสแกนอยู่ใน Codex Cloud

ไปที่ Codex environments และตรวจสอบว่า repository มี environment อยู่แล้ว ถ้ายังไม่มีให้สร้างใหม่ก่อน

ขั้นตอนที่ 2: สร้าง Security Scan ใหม่

ไปที่ Create a security scan แล้วเลือก repository

Codex Security สแกน repository จาก commits ใหม่สุดย้อนหลัง โดยสร้างและ refresh scan context เมื่อมี commits ใหม่เข้ามา

ขั้นตอนการ configure:

เลือก GitHub organization
เลือก repository
เลือก branch ที่ต้องการสแกน
เลือก environment
เลือก history window — window ยาวกว่าจะให้ context มากกว่า แต่ใช้เวลา backfill นานกว่า
คลิก Create
ขั้นตอนที่ 3: รอการสแกนเริ่มต้น

เมื่อสร้าง scan Codex Security จะรัน commit-level security pass ทั่ว history window ที่เลือก การ backfill เริ่มต้นอาจใช้เวลาหลายชั่วโมง โดยเฉพาะสำหรับ repository ขนาดใหญ่

สำคัญ: ถ้า findings ยังไม่แสดงทันที ถือว่าเป็นเรื่องปกติ รอให้ initial scan เสร็จก่อนจึงทำการ troubleshoot

ขั้นตอนที่ 4: ตรวจสอบ Scans และ Threat Model

เมื่อ initial scan เสร็จแล้ว ให้เปิด scan และตรวจสอบ threat model ที่สร้างขึ้น

หลังจาก findings ปรากฏครั้งแรก ควรอัปเดต threat model ให้สอดคล้องกับ architecture, trust boundaries และ business context จริง เพื่อช่วยให้ Codex Security จัดอันดับ issues ได้ถูกต้อง

ดูรายละเอียดเพิ่มเติมที่ Improving the threat model

ขั้นตอนที่ 5: ตรวจสอบ Findings และสร้าง Patch

หลัง initial backfill เสร็จ ตรวจสอบ findings จาก Findings view ใน Codex Security

มี 2 มุมมอง:

Recommended Findings — top 10 issues ที่สำคัญที่สุดใน repository (อัปเดตต่อเนื่อง)
All Findings — ตารางทั้งหมดที่ filter และ sort ได้

คลิก finding เพื่อดูรายละเอียดที่ประกอบด้วย:

คำอธิบายสั้นของปัญหา
metadata เช่น commit details และ file paths
reasoning เกี่ยวกับ impact
code excerpts ที่เกี่ยวข้อง
call-path หรือ data-flow context (ถ้ามี)
validation steps และ validation output

สามารถ review finding และสร้าง PR ได้โดยตรงจาก finding detail page

สรุป

Codex Security Cloud Setup เป็นกระบวนการ 5 ขั้นตอน: ยืนยัน access → สร้าง scan → รอ initial scan → ปรับ threat model → review findings และสร้าง PR เพื่อแก้ไข

7. การปรับปรุง Threat Model

อ้างอิง: Official Docs

หัวข้อนี้คืออะไร

Threat Model คือสรุปความปลอดภัยของ repository สำหรับ Codex Security ใช้เป็น scan context สำหรับการสแกนในอนาคต การจัดลำดับความสำคัญ และการ review

Codex Security สร้าง draft แรกจากโค้ดอัตโนมัติ แต่ถ้า findings ดูไม่ตรงกับความเป็นจริง นั่นคือสัญญาณว่าต้องแก้ไข threat model

Threat Model ที่ดีควรมีอะไร
Entry points และ untrusted inputs — ข้อมูลเข้าจากที่ไหนบ้าง
Trust boundaries และ auth assumptions — ส่วนไหนเชื่อใจกันได้แค่ไหน
Sensitive data paths หรือ privileged actions — ข้อมูลสำคัญไหลผ่านที่ไหน
พื้นที่ที่ทีมต้องการตรวจสอบก่อน — จุดที่มีความเสี่ยงสูง

ตัวอย่าง threat model ที่ดี:

Public API for account changes. Accepts JSON requests and file uploads. Uses an internal auth service for identity checks and writes billing changes through an internal service. Focus review on auth checks, upload parsing, and service-to-service trust boundaries.

วิธีปรับปรุง Threat Model

ปรับปรุงเมื่อ:

Findings ไม่ครอบคลุมพื้นที่ที่คุณสนใจ
Findings ปรากฏในจุดที่ไม่คาดคิด

Threat model ที่อัปเดตจะเปลี่ยน scan context สำหรับการสแกนในอนาคต ไม่ใช่การสแกนที่ผ่านมา

เทคนิคที่ผู้ใช้นิยม: copy threat model ปัจจุบัน → เอาไป chat ใน Codex เพื่อปรับปรุง → paste เวอร์ชันที่ดีขึ้นกลับ

วิธีแก้ไข Threat Model

ไปที่ Codex Security scans → เปิด repository → คลิก Edit

สรุป

Threat model เป็นหัวใจของ Codex Security การอัปเดต threat model ให้สอดคล้องกับ architecture และ business context จริงจะช่วยให้ Codex Security แสดง findings ที่ตรงประเด็นและจัดอันดับได้ถูกต้อง

8. Codex Security FAQ

อ้างอิง: Official Docs

Codex Security คืออะไร

Codex Security คือ LLM-driven security analysis toolkit ที่ตรวจสอบ source code และส่งคืน structured, ranked vulnerability findings พร้อม proposed patches ช่วย developer และ security teams ค้นพบและแก้ไขปัญหาด้านความปลอดภัยในระดับ scale

ทำไมถึงสำคัญ

ซอฟต์แวร์เป็นรากฐานของอุตสาหกรรมและสังคมสมัยใหม่ ช่องโหว่สร้างความเสี่ยงเชิงระบบ Codex Security รองรับ defender-first workflow โดยค้นหาปัญหาอย่างต่อเนื่อง ยืนยันเมื่อเป็นไปได้ และเสนอ fixes เพื่อช่วยทีม improve security โดยไม่ทำให้ development ช้าลง

Codex Security แก้ปัญหาอะไร

ย่นระยะเวลาจาก suspected issue ไปสู่ confirmed, reproducible finding พร้อมหลักฐานและ proposed patch ลด triage load และ false positives เมื่อเทียบกับ traditional scanners เพียงอย่างเดียว

Codex Security ทำงานอย่างไร

รัน analysis ใน ephemeral, isolated container และ clone repository ชั่วคราว จากนั้นทำ code-level analysis และส่งคืน structured findings พร้อม: description, file location, criticality, root cause และ suggested remediation

สำหรับ findings ที่มี verification steps ระบบจะ execute commands หรือ tests ใน sandbox เดิม บันทึก success/failure, exit codes, stdout, stderr, test results และ artifacts แล้วแนบเป็นหลักฐาน

แทนที่ SAST ได้ไหม

ไม่ Codex Security เป็นส่วนเสริมของ SAST โดยเพิ่ม semantic, LLM-based reasoning และ automated validation ส่วน SAST เดิมยังให้ broad deterministic coverage

Analysis Pipeline คืออะไร
Analysis — สร้าง threat model สำหรับ repository
Commit scanning — ตรวจสอบ merged commits และ repository history
Validation — ลอง reproduce vulnerabilities ใน sandbox เพื่อลด false positives
Patching — integrate กับ Codex เพื่อเสนอ patches สำหรับ review ก่อนเปิด PR
รองรับภาษาโปรแกรมอะไรบ้าง

Codex Security เป็น language-agnostic ในทางปฏิบัติ performance ขึ้นอยู่กับความสามารถของ model ในการ reason เกี่ยวกับภาษาและ framework ที่ใช้

ผลลัพธ์ที่ได้หลัง scan คืออะไร

ได้ ranked findings พร้อม criticality, validation status และ proposed patch (ถ้ามี) Findings อาจรวม crash output, reproduction evidence, call-path context และ related annotations

โค้ดลูกค้า isolated ได้อย่างไร

Analysis และ validation job แต่ละตัวทำงานใน ephemeral Codex container ที่มี session-scoped tools artifacts ถูก extract สำหรับ review แล้ว container จะถูก tear down หลัง job เสร็จ

Codex Security auto-apply patches ได้ไหม

ไม่ proposed patch คือ recommended remediation เท่านั้น ผู้ใช้ต้อง review ก่อนแล้ว push เป็น PR ไปยัง GitHub จาก findings UI — Codex Security ไม่ apply changes ให้อัตโนมัติ

ต้อง build project ก่อนสแกนไหม

ไม่จำเป็น Codex Security สร้าง findings จาก repository และ commit context โดยไม่ต้อง compile ระหว่าง auto-validation อาจลอง build ใน container ถ้าจะช่วย reproduce ปัญหาได้

Codex Security ลด false positives อย่างไร

ใช้ 2 ขั้นตอน:

Model จัดอันดับ likely issues
Auto-validation ลอง reproduce แต่ละ issue ใน clean container

Findings ที่ reproduce สำเร็จจะถูก mark เป็น "validated" ช่วยลด false positives ก่อน human review

Initial scan ใช้เวลานานแค่ไหน

Initial scan ขึ้นอยู่กับขนาด repository, build time และจำนวน findings ที่ต้อง validate สำหรับบาง repository อาจใช้หลายชั่วโมง สำหรับ repository ขนาดใหญ่อาจใช้หลายวัน การสแกนครั้งต่อๆ ไปจะเร็วขึ้นเพราะ focus ที่ new commits และ incremental changes

Threat model สร้างอย่างไร

Codex Security สั่งให้ model สรุป repository architecture และ security entry points จำแนกประเภท repository รัน specialized extractors แล้วรวมผลลัพธ์เป็น project overview หรือ threat model artifact ที่ใช้ตลอด scan

แทนที่ manual security review ได้ไหม

ไม่ Codex Security เร่ง review และช่วยจัดอันดับ findings แต่ไม่แทนที่ code-level validation, exploitability checks หรือ human threat assessment

แก้ไข threat model ได้ไหม

ได้ Codex Security สร้าง initial threat model แล้วคุณสามารถอัปเดตได้เมื่อ architecture, risks และ business context เปลี่ยนแปลง ดูรายละเอียดที่ Improving the threat model

Auto-validation คืออะไร

Auto-validation คือขั้นตอนที่ลอง reproduce suspected issue ใน isolated container บันทึก success/failure พร้อม logs, commands และ artifacts เป็นหลักฐาน ถ้า validation ล้มเหลว finding ยังคงอยู่ในสถานะ unvalidated พร้อม logs ที่บันทึกสิ่งที่ทำไปแล้ว

หัวข้อที่ยังไม่ได้เรียบเรียงครบถ้วน
หัวข้อ	เหตุผล	ลิงก์
Codex Security — Use Cases (Deep scan, Scan code changes, Remediate backlog)	เนื้อหาอยู่ใน Use Cases section ไม่ใช่ Integrations/Security โดยตรง	Use Cases

อ้างอิงจาก Official Documentation ของ OpenAI Codex ณ วันที่จัดทำ — ตรวจสอบลิงก์ต้นทางเสมอเพื่อข้อมูลล่าสุด

 ก่อนหน้า
การตั้งค่า (Configuration)
ถัดไป
Administration & Automation
```

## Page 6 (หน้า 3 / 6)
```text
Codex
คู่มืออย่างเป็นทางการ
11 เอกสาร
ระดับกลาง
Administration & Automation

1. การยืนยันตัวตน (Authentication) ·  19 นาที

หน้า 3 / 6
Codex คู่มือภาษาไทย — หมวด Administration & Automation

ไฟล์ที่ 6 จาก 6 | กลับไปที่ INDEX

สารบัญ
การยืนยันตัวตน (Authentication)
Access Tokens
การอนุมัติ Agent และความปลอดภัย (Agent Approvals & Security)
การเชื่อมต่อระยะไกล (Remote Connections)
Enterprise — Admin Setup
Enterprise — Governance
Enterprise — Managed Configuration
การใช้งานบน Windows
Non-interactive Mode (โหมดไม่มี UI)
Codex SDK
App Server
MCP Server
GitHub Action
หัวข้อที่ยังไม่ได้เรียบเรียงครบถ้วน
1. การยืนยันตัวตน (Authentication)

อ้างอิง: Authentication — Codex Docs

หัวข้อนี้คืออะไร

หน้านี้อธิบายวิธีที่ Codex ตรวจสอบตัวตนผู้ใช้ เพื่อให้เชื่อมต่อกับ OpenAI API ได้ถูกต้อง ไม่ว่าจะใช้ผ่าน UI, CLI, หรือในสภาพแวดล้อมที่ไม่มีหน้าจอ (headless)

วิธีลงชื่อเข้าใช้

Codex รองรับการยืนยันตัวตน 2 วิธีหลัก:

1. ChatGPT (OAuth)

ลงชื่อเข้าใช้ด้วยบัญชี ChatGPT ผ่านเบราว์เซอร์
จำเป็นต้องใช้สำหรับ Codex cloud (web tasks)
ต้องเปิดใช้ MFA ถ้าลงชื่อแบบ email + password ร่วมกับการใช้ Codex cloud

2. API Key

ใช้ OpenAI API key โดยตรง
เหมาะสำหรับ CI/CD, automation, หรือสภาพแวดล้อมที่ไม่ต้องการ browser login
ตั้งค่าผ่าน environment variable: CODEX_API_KEY
การเก็บ Credentials

Codex เก็บ credential ไว้ที่:

~/.codex/auth.json — ไฟล์หลักสำหรับเก็บ token
หรือ OS keyring ถ้ามีการตั้งค่า cli_auth_credentials_store
การเข้าสู่ระบบในสภาพแวดล้อม Headless

ในสภาพแวดล้อมที่ไม่มีเบราว์เซอร์ (เช่น เซิร์ฟเวอร์, Docker, CI):

codex login --device-auth


คำสั่งนี้จะแสดง URL ให้เปิดในเบราว์เซอร์เครื่องอื่น เพื่อทำ device code authorization

หรือคัดลอกไฟล์ ~/.codex/auth.json จากเครื่องที่ login แล้วไปวางในเครื่อง headless

การบังคับวิธี Login (Forced Login Method)

ถ้าต้องการควบคุมว่าผู้ใช้ต้องใช้วิธีไหนในการ login ตั้งค่าใน config.toml:

forced_login_method = "chatgpt"  # หรือ "api"

"chatgpt" — บังคับให้ใช้ ChatGPT OAuth เท่านั้น
"api" — บังคับให้ใช้ API key เท่านั้น
Custom CA Certificate

สำหรับองค์กรที่มี corporate proxy หรือใช้ self-signed certificate:

export CODEX_CA_CERTIFICATE=/path/to/ca-bundle.pem

สรุปสั้นๆ

Codex รองรับ 2 วิธี login: ChatGPT OAuth (ต้องการเบราว์เซอร์ + MFA สำหรับ cloud) หรือ API key (เหมาะกับ CI/automation) ในสภาพแวดล้อม headless ใช้ codex login --device-auth หรือคัดลอก auth.json ไปวาง

2. Access Tokens

อ้างอิง: Access Tokens — Codex Docs

หัวข้อนี้คืออะไร

Access Token เป็น token ที่ใช้สำหรับสภาพแวดล้อม enterprise เพื่อควบคุมการเข้าถึง Codex ในระดับองค์กร แทนที่จะใช้ API key ส่วนตัวของแต่ละคน

ใช้ทำอะไร

ในการตั้งค่าระดับองค์กร admin สามารถออก Access Token ให้กับทีมหรือระบบต่างๆ เพื่อให้ใช้งาน Codex โดยไม่ต้องแชร์ API key ส่วนตัว ช่วยให้ควบคุม permissions, rotation, และการ revoke ได้ง่ายขึ้น

ข้อควรระวัง
ดูรายละเอียดเพิ่มเติมได้ที่ Enterprise Admin Setup
การจัดการ Access Token ทำได้จาก Admin panel ของ ChatGPT workspace
3. การอนุมัติ Agent และความปลอดภัย (Agent Approvals & Security)

อ้างอิง: Agent Approvals & Security — Codex Docs

หัวข้อนี้คืออะไร

Codex ใช้ระบบ 2 ชั้นในการควบคุมความปลอดภัย: Sandbox Mode (ควบคุมสิทธิ์การเข้าถึง filesystem และ network) และ Approval Policy (ควบคุมว่า agent ต้องขออนุมัติก่อนทำอะไร)

Sandbox Mode

Sandbox กำหนดขอบเขตที่ agent สามารถทำงานได้:

Mode	คำอธิบาย
workspace-write	อ่านได้ทุกที่ เขียนได้เฉพาะใน workspace และ writable roots ที่กำหนด
read-only	อ่านได้อย่างเดียว เขียนไม่ได้
danger-full-access	ไม่มีข้อจำกัดใดๆ (ใช้ด้วยความระมัดระวัง)
การทำงานของ Sandbox ตามแพลตฟอร์ม
Codex cloud: ทำงานใน isolated container ที่มีการตั้งค่า network ตอน setup แต่ agent phase จะเป็น offline
CLI บน macOS: ใช้ Seatbelt (sandbox-exec)
CLI บน Linux: ใช้ Landlock + seccomp
Windows: ใช้ elevated หรือ unelevated sandbox (ดูรายละเอียดในหัวข้อ Windows)
Paths ที่ได้รับการปกป้องเสมอ

Codex จะไม่เขียนทับไฟล์เหล่านี้โดยไม่ได้รับอนุญาต:

.git/
.agents/
.codex/
Network Access
network_access = true


ตั้งค่านี้เพื่อให้ agent เข้าถึงเครือข่ายได้ ค่าเริ่มต้นคือ false

การค้นหาเว็บ (web search) ใช้โหมด "cached" โดยค่าเริ่มต้น

Approval Policy

Approval Policy กำหนดว่า agent ต้องหยุดรอการอนุมัติก่อนทำสิ่งใด:

Policy	คำอธิบาย
on-request	agent ขออนุมัติเฉพาะเมื่อจำเป็น (เช่น เขียนไฟล์นอก workspace)
untrusted	agent ต้องขออนุมัติทุกครั้งก่อนทำ action
never	agent ไม่ต้องขออนุมัติเลย ทำงานอัตโนมัติเต็มที่
Presets ที่ใช้บ่อย
# Auto mode — ทำงานอัตโนมัติเต็มที่ (workspace-write + never approve)
codex --full-auto

# อ่านอย่างเดียว — ไม่เขียนไฟล์
codex --sandbox read-only

# ข้าม sandbox และ approval ทั้งหมด (อันตราย!)
codex --dangerously-bypass-approvals-and-sandbox

OTel Monitoring (Telemetry)

Codex รองรับ OpenTelemetry (OTel) สำหรับการ monitoring แบบ opt-in โดยค่าเริ่มต้นปิดอยู่ เปิดใช้งานได้ผ่าน config

สรุปสั้นๆ

ระบบความปลอดภัยของ Codex มี 2 ชั้น: Sandbox (จำกัด filesystem/network) และ Approval Policy (จำกัดว่าต้องขออนุมัติอะไรบ้าง) ใช้ preset --full-auto สำหรับ automation และ read-only เมื่อต้องการความปลอดภัยสูงสุด

4. การเชื่อมต่อระยะไกล (Remote Connections)

อ้างอิง: Remote Connections — Codex Docs

หัวข้อนี้คืออะไร

Remote Connections เป็นฟีเจอร์ alpha ที่ให้ Codex บนเครื่อง local เชื่อมต่อกับ Codex ที่รันบน remote server ผ่าน SSH

ใช้ทำอะไร

เหมาะสำหรับนักพัฒนาที่ทำงานกับโปรเจกต์บน remote server (เช่น cloud VM, development server) แต่อยากใช้ Codex จาก local app หรือ IDE

วิธีตั้งค่า

1. ติดตั้ง Codex บนเครื่อง remote

เครื่อง remote ต้องมี Codex CLI ติดตั้งอยู่ด้วย

2. ตั้งค่า SSH Config

เพิ่มข้อมูล remote server ใน ~/.ssh/config ตามปกติ

3. เพิ่ม Connection ใน Codex App

ไปที่ Settings > Connections ในแอป Codex แล้วเพิ่ม remote server

ข้อควรระวัง
ฟีเจอร์นี้ยังอยู่ในสถานะ alpha อาจมีการเปลี่ยนแปลง
การเชื่อมต่อใช้ SSH port forwarding เท่านั้น ไม่มี public listener
สำหรับ server ที่ไม่ได้อยู่ในเครือข่ายเดียวกัน ให้ใช้ VPN หรือ Tailscale ก่อน
สรุปสั้นๆ

Remote Connections ให้ใช้ Codex จาก local app กับโค้ดที่อยู่บน remote server ผ่าน SSH ฟีเจอร์นี้ยังเป็น alpha อยู่ ต้องติดตั้ง Codex ทั้งสองเครื่อง

5. Enterprise — Admin Setup

อ้างอิง: Admin Setup — Codex Docs

หัวข้อนี้คืออะไร

Admin Setup คือขั้นตอนที่ผู้ดูแลระบบ (admin) ขององค์กรต้องทำเพื่อเปิดใช้งาน Codex ให้กับทีม ตั้งค่า policy และควบคุมการใช้งานในระดับ workspace

รายละเอียดสำคัญ
Admin สามารถเข้าถึงการตั้งค่า enterprise ได้จาก ChatGPT workspace admin panel
ต้องมีสิทธิ์ Workspace Owner หรือ Admin
สามารถกำหนด:
ว่าสมาชิกคนไหนเข้าถึง Codex ได้บ้าง
วิธีการ authentication ที่อนุญาต (ChatGPT OAuth หรือ API key)
นโยบาย sandbox และ approval สำหรับทั้ง workspace
ข้อควรระวัง

เนื้อหาเต็มของหน้านี้ครอบคลุมขั้นตอนการตั้งค่าอย่างละเอียด ดูได้ที่ Official Docs: Admin Setup

6. Enterprise — Governance

อ้างอิง: Governance — Codex Docs

หัวข้อนี้คืออะไร

Governance คือชุดเครื่องมือที่ช่วยองค์กร enterprise ติดตาม, วิเคราะห์, และตรวจสอบการใช้งาน Codex ในทีม ครอบคลุมตั้งแต่ dashboard สำหรับดู adoption ไปจนถึง API สำหรับ export log สำหรับระบบ compliance

3 ช่องทางการติดตามการใช้งาน
เครื่องมือ	เหมาะกับ
Analytics Dashboard	ดู adoption และ impact ของ code review แบบ real-time
Analytics API	ดึง metrics อัตโนมัติเข้า data warehouse หรือ BI tools
Compliance API	export audit log สำหรับระบบ security และ compliance
Analytics Dashboard

เข้าใช้งานได้ที่ chatgpt.com/codex/settings/analytics — สำหรับ workspace admin เท่านั้น

Dashboard แสดงข้อมูลต่อไปนี้:

จำนวนผู้ใช้รายวันแยกตาม product (CLI, IDE, cloud, Code Review)
จำนวน code reviews รายวัน
Code reviews แยกตาม priority level
Code reviews แยกตาม sentiment (feedback)
Cloud tasks รายวัน
จำนวนผู้ใช้ VS Code extension รายวัน
จำนวนผู้ใช้ CLI รายวัน
การ Export ข้อมูล Analytics

Admin ส่งออกข้อมูลได้ทั้งรูปแบบ CSV และ JSON ครอบคลุม:

Code review users และ reviews (รายวัน)
Code review findings และ feedback (reactions, replies, priority)
Cloud users และ tasks (รายวัน)
CLI และ VS Code users (รายวัน)
Sessions และ messages ต่อผู้ใช้ (รายวัน)
Analytics API

ใช้งานผ่าน chatgpt.com/codex/settings/apireference สำหรับการดึงข้อมูลแบบอัตโนมัติ

ข้อมูลที่ API ให้:

Daily usage and adoption: thread, turns, credits แบบรายวัน แยกตาม client surface หรือแยกตาม user
Code review activity: จำนวน PR reviews, comments, และ severity breakdown
User engagement: replies และ reactions ต่อ Codex comments

ผลลัพธ์เรียงตามเวลา รองรับ cursor-based pagination

Use cases ที่พบบ่อย:

Engineering observability dashboards
รายงาน adoption สำหรับผู้บริหาร
ติดตาม usage และ cost
Compliance API

ใช้งานผ่าน chatgpt.com/admin/api-reference สำหรับระบบ audit และ compliance

ข้อมูลที่ export ได้:

Prompt text ที่ส่งให้ Codex
Response ที่ Codex สร้าง
Identifiers: workspace, user, timestamp, model
Token usage และ request metadata

Use cases:

Security investigations
Compliance reporting
Policy enforcement audits
ส่งข้อมูลเข้า SIEM และ eDiscovery pipelines

ข้อจำกัด: Audit log เก็บได้ไม่เกิน 30 วัน และครอบคลุมเฉพาะการใช้งานที่ยืนยันตัวตนผ่าน ChatGPT เท่านั้น (ไม่รวมการใช้งานด้วย API key ตรงๆ)

ไม่รองรับการวัด:

Lines of code ที่สร้าง (เป็น proxy ที่ไม่แม่นยำ)
Acceptance rate ของ suggestions
Code quality KPIs
แนวทางที่แนะนำสำหรับองค์กร

ส่วนใหญ่ใช้ร่วมกัน 3 อย่าง:

Analytics Dashboard — ดูภาพรวมรายวัน
Analytics API — รายงานอัตโนมัติและ BI integration
Compliance API — audit trail สำหรับ security/legal
สรุปสั้นๆ

Governance ของ Codex มี 3 ระดับ: Dashboard (ดูง่าย), Analytics API (สำหรับ automation), Compliance API (สำหรับ audit/compliance) admin สามารถ export ข้อมูลได้ทั้ง CSV และ JSON log เก็บสูงสุด 30 วัน

7. Enterprise — Managed Configuration

อ้างอิง: Managed Configuration — Codex Docs

หัวข้อนี้คืออะไร

Managed Configuration ช่วยให้ admin ขององค์กรสามารถกำหนด requirements และ default settings ของ Codex ให้กับผู้ใช้ทั้ง workspace ได้จากส่วนกลาง โดยผู้ใช้ไม่ต้องตั้งค่าเอง

ใช้ทำอะไร

เหมาะสำหรับองค์กรที่ต้องการ:

บังคับให้ใช้ authentication method เฉพาะ
กำหนด default sandbox policy ให้ทั้งทีม
ตั้งค่า policy ที่ผู้ใช้ไม่สามารถแก้ไขได้
Deploy config ให้ผู้ใช้หลายคนพร้อมกัน
ข้อควรระวัง

รายละเอียดเต็มของ Managed Configuration อยู่ที่ Official Docs: Managed Configuration — เนื้อหาหน้านี้ค่อนข้างยาวและครอบคลุมรายละเอียด policy ต่างๆ

8. การใช้งานบน Windows

อ้างอิง: Windows — Codex Docs

หัวข้อนี้คืออะไร

Codex รองรับ Windows ทั้งแบบ native และผ่าน WSL2 (Windows Subsystem for Linux) หน้านี้อธิบายวิธีตั้งค่า sandbox, ข้อแนะนำสำหรับแต่ละกรณี และการแก้ปัญหาที่พบบ่อยบน Windows

3 วิธีใช้ Codex บน Windows
Native Windows (elevated sandbox) — แนะนำสำหรับ Windows 11
Native Windows (unelevated sandbox) — fallback สำหรับเครื่องที่มี enterprise policy จำกัด
WSL2 (Windows Subsystem for Linux) — ใช้ Linux sandbox บน Windows
Windows Sandbox

Codex บน Windows native ใช้ sandbox เพื่อจำกัดการเขียนไฟล์นอก working folder และป้องกันการเข้าถึงเครือข่ายโดยไม่ได้รับอนุญาต

ตั้งค่า sandbox mode ใน config.toml:

[windows]
sandbox = "elevated"  # หรือ "unelevated"

elevated sandbox (แนะนำ)
ใช้ sandbox user ที่มีสิทธิ์ต่ำกว่า (lower-privilege)
กำหนด filesystem permission boundaries
ตั้ง firewall rules
ต้องผ่าน UAC / admin approval ตอนติดตั้ง
unelevated sandbox (fallback)
รันคำสั่งด้วย restricted Windows token จาก current user
ใช้ ACL-based filesystem boundaries
ใช้ environment-level offline controls แทน firewall rule
อ่อนแอกว่า elevated แต่ยังมีประโยชน์เมื่อ admin setup ถูกบล็อก
Private Desktop

ค่าเริ่มต้น sandbox จะใช้ private desktop เพื่อความปลอดภัย UI ยิ่งขึ้น ปิดได้ถ้าต้องการ compatibility:

[windows]
sandbox_private_desktop = false

Windows Version Matrix
Windows Version	ระดับการรองรับ	หมายเหตุ
Windows 11	แนะนำ	เหมาะสำหรับ enterprise deployment
Windows 10 (อัปเดตล่าสุด)	Best effort	ต้องการ version 1809 หรือใหม่กว่า, ต้องมี ConPTY
Windows 10 รุ่นเก่า	ไม่แนะนำ	ขาด console components ที่จำเป็น

ข้อกำหนดเพิ่มเติม:

winget ต้องพร้อมใช้งาน
elevated sandbox ต้องการ admin approval ตอนตั้งค่า
บางองค์กร enterprise อาจบล็อก setup steps บางอย่าง
Grant Sandbox Read Access

เมื่อ command ล้มเหลวเพราะ sandbox ไม่สามารถอ่าน directory บางอย่าง:

/sandbox-add-read-dir C:\absolute\directory\path


ต้องเป็น absolute path และ directory ต้องมีอยู่จริง

Windows Subsystem for Linux (WSL2)

เลือกใช้ WSL2 เมื่อ:

ต้องการ Linux-native tooling บน Windows
workflow ของทีมอยู่ใน WSL2 อยู่แล้ว
native Windows sandbox ไม่สามารถใช้งานได้

หมายเหตุ: WSL1 รองรับถึง Codex เวอร์ชัน 0.114 เท่านั้น ตั้งแต่ 0.115 เป็นต้นไป Linux sandbox ใช้ bubblewrap ซึ่งไม่รองรับ WSL1

ติดตั้งและเริ่มใช้งาน
# ติดตั้ง WSL (รัน PowerShell แบบ Administrator)
wsl --install

# เปิด WSL shell
wsl

# ใน WSL shell — ติดตั้งและรัน Codex
curl -fsSL https://chatgpt.com/codex/install.sh | sh
codex

เปิด VS Code จาก WSL
# จาก WSL shell
cd ~/code/your-project
code .


ตรวจสอบว่า status bar ด้านล่าง VS Code แสดง WSL: <distro> และ terminal แสดง path แบบ Linux (/home/...)

คำแนะนำการจัดการไฟล์
อย่าทำงานใน /mnt/c/... — I/O ช้ากว่ามาก
ให้เก็บ repository ไว้ใน Linux home directory เช่น ~/code/my-app
mkdir -p ~/code && cd ~/code
git clone https://github.com/your/repo.git
cd repo

การแก้ปัญหาที่พบบ่อย

elevated sandbox ติดตั้งล้มเหลว

ตรวจสอบว่า approve UAC/admin prompt แล้ว
เครื่องที่มี enterprise policy อาจบล็อกการสร้าง local user/group หรือเปลี่ยน firewall rules
ถ้าไม่สามารถแก้ได้ทันที ให้ใช้ unelevated sandbox แทนก่อน
ปรึกษา IT team เรื่อง logon rights สำหรับ sandbox users

Error 1385

Windows ปฏิเสธ logon type ที่ sandbox user ต้องการ
ให้ IT team ตรวจสอบ group policy ว่า sandbox user ของ Codex มีสิทธิ์ที่จำเป็น
ในระหว่างแก้ปัญหา ใช้ unelevated sandbox ก่อน

IDE Extension ไม่ตอบสนอง
อาจขาด C++ development tools:

winget install --id Microsoft.VisualStudio.2022.BuildTools -e


หลังติดตั้ง ให้รีสตาร์ท VS Code ใหม่

WSL repository ช้า

ย้าย repository จาก /mnt/c/... ไปไว้ที่ ~/code/...
อัปเดต WSL:
wsl --update
wsl --shutdown


VS Code ใน WSL หา codex ไม่เจอ

which codex || echo "codex not found"


ถ้าไม่เจอให้ติดตั้งใหม่ตาม ขั้นตอนข้างต้น

การส่ง diagnostics ให้ OpenAI

ส่งไฟล์นี้:

CODEX_HOME/.sandbox/sandbox.log

พร้อมข้อมูล: คำอธิบายปัญหา, เวอร์ชัน Windows, error message, และว่าใช้ elevated หรือ unelevated sandbox

อย่าส่ง: CODEX_HOME/.sandbox-secrets/

สรุปสั้นๆ

Windows 11 + elevated sandbox คือ combination ที่ดีที่สุด ถ้า enterprise policy บล็อก ให้ใช้ unelevated sandbox แทน ถ้าต้องการ Linux tooling ใช้ WSL2 เก็บ repo ไว้ใน Linux home directory เสมอเพื่อประสิทธิภาพที่ดีกว่า

9. Non-interactive Mode (โหมดไม่มี UI)

อ้างอิง: Non-interactive Mode — Codex Docs

หัวข้อนี้คืออะไร

Non-interactive Mode คือการรัน Codex โดยไม่ต้องมี UI แบบ interactive ใช้สำหรับ CI/CD pipeline, automation scripts, หรือการเรียกใช้งานแบบ programmatic

คำสั่งพื้นฐาน
codex exec "สิ่งที่ต้องการให้ Codex ทำ"

stderr — แสดง progress และ status ขณะทำงาน
stdout — แสดงเฉพาะ final response
Options สำคัญ
# รันแบบ ephemeral (ไม่บันทึก session)
codex exec --ephemeral "prompt"

# Output เป็น JSONL (JSON Lines) — เหมาะสำหรับ parsing
codex exec --json "prompt"

# กำหนด output schema แบบ JSON Schema
codex exec --output-schema schema.json "prompt"

# บันทึก output ลงไฟล์
codex exec -o output.md "prompt"

# ข้าม git repo check
codex exec --skip-git-repo-check "prompt"

ใช้ API Key ใน CI
export CODEX_API_KEY="your-api-key"
codex exec "prompt"

การ Resume Session
# ต่อจาก session ล่าสุด
codex exec resume --last

# ต่อจาก session เฉพาะ
codex exec resume <session-id>

รับ Input จาก stdin
cat prompt.txt | codex exec

ตัวอย่าง GitHub Actions Workflow
name: Auto Fix Issues
on:
  issues:
    types: [labeled]

jobs:
  fix:
    if: contains(github.event.label.name, 'codex-fix')
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Run Codex Fix
        env:
          CODEX_API_KEY: ${{ secrets.CODEX_API_KEY }}
        run: |
          codex exec --json "Fix the issue described in #${{ github.event.issue.number }}"

สรุปสั้นๆ

codex exec เป็นคำสั่งหลักสำหรับ automation ใช้ --json สำหรับ parsing, CODEX_API_KEY สำหรับ CI/CD และ resume --last เพื่อต่อจาก session เก่า

10. Codex SDK

อ้างอิง: Codex SDK — Codex Docs

หัวข้อนี้คืออะไร

Codex SDK เป็น library ที่ให้นักพัฒนาควบคุม Codex แบบ programmatic ภายใน application ของตัวเอง รองรับทั้ง TypeScript และ Python

เมื่อไหรควรใช้ SDK
ควบคุม Codex จาก CI/CD pipeline
สร้าง agent ของตัวเองที่ใช้ Codex ทำงาน engineering tasks
ฝัง Codex เข้าใน internal tools
สร้าง integration ระหว่าง Codex กับ application ของตัวเอง
TypeScript Library

ข้อกำหนด: Node.js 18 หรือใหม่กว่า

การติดตั้ง:

npm install @openai/codex-sdk


การใช้งานพื้นฐาน:

import { Codex } from "@openai/codex-sdk";

const codex = new Codex();
const thread = codex.startThread();
const result = await thread.run(
  "Make a plan to diagnose and fix the CI failures"
);

console.log(result);


ต่อ thread เดิม หรือ resume thread เก่า:

// รันต่อใน thread เดิม
const result = await thread.run("Implement the plan");

// Resume thread เก่าด้วย thread ID
const threadId = "<thread-id>";
const thread2 = codex.resumeThread(threadId);
const result2 = await thread2.run("Pick up where you left off");


ดู source เพิ่มเติม: TypeScript SDK repo

Python Library

ข้อกำหนด: Python 3.10 หรือใหม่กว่า

Python SDK ควบคุม local Codex app-server ผ่าน JSON-RPC SDK builds จะ pin version ของ Codex CLI runtime โดยอัตโนมัติ

การติดตั้ง:

pip install openai-codex


การใช้งานพื้นฐาน:

from openai_codex import Codex, Sandbox

with Codex() as codex:
    thread = codex.thread_start(
        model="gpt-5.4",
        sandbox=Sandbox.workspace_write,
    )
    result = thread.run("Make a plan to diagnose and fix the CI failures")
    print(result.final_response)


Async version:

import asyncio
from openai_codex import AsyncCodex

async def main() -> None:
    async with AsyncCodex() as codex:
        thread = await codex.thread_start(model="gpt-5.4")
        result = await thread.run("Implement the plan")
        print(result.final_response)

asyncio.run(main())

Sandbox Presets ใน Python SDK
from openai_codex import Codex, Sandbox

with Codex() as codex:
    thread = codex.thread_start(sandbox=Sandbox.workspace_write)
    thread.run("Make the requested change.")

    # เปลี่ยน sandbox สำหรับ turn ต่อไป
    review = thread.run("Review the diff only.", sandbox=Sandbox.read_only)

Preset	ความหมาย
Sandbox.read_only	อ่านไฟล์ได้อย่างเดียว ห้ามเขียน
Sandbox.workspace_write	อ่านและเขียนใน workspace ได้
Sandbox.full_access	ไม่มีข้อจำกัด filesystem

ถ้าไม่ระบุ sandbox= จะใช้ค่า default ของ app-server

ดู source เพิ่มเติม: Python SDK repo

สรุปสั้นๆ

Codex SDK มีให้ใช้ทั้ง TypeScript (Node.js 18+) และ Python (3.10+) ทั้งสองใช้แนวคิด thread-based เหมือนกัน เลือกระหว่าง SDK กับ codex exec ขึ้นอยู่กับว่าต้องการ integration ลึกแค่ไหน

11. App Server

อ้างอิง: App Server — Codex Docs

หัวข้อนี้คืออะไร

Codex App Server คือ interface ที่ Codex ใช้ภายในเพื่อขับเคลื่อน rich clients เช่น VS Code extension โดยใช้ protocol JSON-RPC 2.0 แบบ bidirectional ซึ่ง open source อยู่ที่ openai/codex/codex-rs/app-server

เมื่อไหรควรใช้ App Server แทน SDK:

ใช้ App Server เมื่อต้องการ deep integration ใน product ของตัวเอง: authentication, conversation history, approvals, streamed events
ใช้ Codex SDK เมื่อทำ CI/CD หรือ automation งาน
Protocol

App Server ใช้ JSON-RPC 2.0 แบบ bidirectional (ไม่มี "jsonrpc":"2.0" header บน wire)

Transports ที่รองรับ:

Transport	Flag	รายละเอียด
stdio	--listen stdio:// (default)	JSONL — เหมาะสุดสำหรับ subprocess
WebSocket	--listen ws://IP:PORT	experimental, ไม่ได้รับการ support
Unix socket	--listen unix:// หรือ --listen unix://PATH	WebSocket over Unix socket
Off	--listen off	ปิด transport ทั้งหมด

Health endpoints (WebSocket mode เท่านั้น):

GET /readyz — 200 OK เมื่อ listener พร้อมรับ connection
GET /healthz — 200 OK (ถ้าไม่มี Origin header)
Request ที่มี Origin header จะได้รับ 403 Forbidden

WebSocket Auth Flags:

--ws-auth capability-token --ws-token-file /absolute/path
--ws-auth capability-token --ws-token-sha256 HEX
--ws-auth signed-bearer-token --ws-shared-secret-file /absolute/path


Clients ส่ง credential ผ่าน Authorization: Bearer <token> ระหว่าง WebSocket handshake

Message Schema

Request:

{ "method": "thread/start", "id": 10, "params": { "model": "gpt-5.4" } }


Response:

{ "id": 10, "result": { "thread": { "id": "thr_123" } } }


Error:

{ "id": 10, "error": { "code": 123, "message": "Something went wrong" } }


Notification (ไม่มี id):

{ "method": "turn/started", "params": { "turn": { "id": "turn_456" } } }


Generate schema จาก CLI:

codex app-server generate-ts --out ./schemas
codex app-server generate-json-schema --out ./schemas

การเริ่มใช้งาน
# stdio (default)
codex app-server

# TCP WebSocket
codex app-server --listen ws://127.0.0.1:4500

# Unix socket
codex app-server --listen unix://


ตัวอย่าง Node.js/TypeScript:

import { spawn } from "node:child_process";
import readline from "node:readline";

const proc = spawn("codex", ["app-server"], {
  stdio: ["pipe", "pipe", "inherit"],
});
const rl = readline.createInterface({ input: proc.stdout });

const send = (message: unknown) => {
  proc.stdin.write(`${JSON.stringify(message)}\n`);
};

let threadId: string | null = null;

rl.on("line", (line) => {
  const msg = JSON.parse(line) as any;
  if (msg.id === 1 && msg.result?.thread?.id && !threadId) {
    threadId = msg.result.thread.id;
    send({
      method: "turn/start",
      id: 2,
      params: {
        threadId,
        input: [{ type: "text", text: "Summarize this repo." }],
      },
    });
  }
});

send({ method: "initialize", id: 0, params: { clientInfo: { name: "my_product", title: "My Product", version: "0.1.0" } } });
send({ method: "initialized", params: {} });
send({ method: "thread/start", id: 1, params: { model: "gpt-5.4" } });

Core Primitives
Thread — conversation ระหว่าง user กับ Codex agent ประกอบด้วย turns
Turn — user request เดียวและงานที่ agent ทำตาม ประกอบด้วย items
Item — หน่วยข้อมูล input/output: user message, agent message, command, file change, tool call
Lifecycle Overview
Initialize: ส่ง initialize request พร้อม client metadata แล้วตาม initialized notification ก่อนทำอื่น
Start/Resume Thread: thread/start สำหรับ conversation ใหม่, thread/resume ต่อ thread เดิม, thread/fork แยก history
Begin Turn: turn/start พร้อม threadId และ user input
Steer Turn: turn/steer เพิ่ม input ระหว่าง turn ที่กำลังทำงาน
Stream Events: อ่าน notifications: item/started, item/completed, item/agentMessage/delta, tool progress, ฯลฯ
Finish Turn: server emit turn/completed เมื่อ model เสร็จ หรือหลัง turn/interrupt
Initialization
{
  "method": "initialize",
  "id": 0,
  "params": {
    "clientInfo": {
      "name": "codex_vscode",
      "title": "Codex VS Code Extension",
      "version": "0.1.0"
    }
  }
}


Notification opt-out — ปิด notification method ที่ไม่ต้องการ:

{
  "method": "initialize",
  "id": 1,
  "params": {
    "clientInfo": { "name": "my_client", "title": "My Client", "version": "0.1.0" },
    "capabilities": {
      "experimentalApi": true,
      "optOutNotificationMethods": ["thread/started", "item/agentMessage/delta"]
    }
  }
}

Experimental API Opt-in

บาง methods ต้องเปิดใช้งาน experimental API ก่อน:

{
  "capabilities": {
    "experimentalApi": true
  }
}


ถ้าไม่เปิด แล้วเรียก experimental method จะได้ error: <descriptor> requires experimentalApi capability

API Overview (Methods ที่สำคัญ)
Method	คำอธิบาย
thread/start	สร้าง thread ใหม่
thread/resume	เปิด thread เดิมต่อ
thread/fork	แยก thread เป็น branch ใหม่
thread/list	ดู thread ทั้งหมด (cursor pagination)
thread/archive	เก็บ thread เข้า archive
turn/start	เริ่ม turn ใหม่ด้วย user input
turn/steer	เพิ่ม input ระหว่าง turn ที่กำลังทำงาน
turn/interrupt	ยกเลิก turn ที่กำลังทำงาน
review/start	เรียก Codex reviewer
command/exec	รัน single command ใน sandbox
model/list	ดู models ที่ใช้ได้
skills/list	ดู skills ตาม cwd
plugin/list	ดู plugins ที่ติดตั้ง
plugin/install	ติดตั้ง plugin
สรุปสั้นๆ

App Server เป็น core protocol ที่ Codex ใช้สำหรับ rich client integration ใช้ JSON-RPC 2.0 ผ่าน stdio (default), WebSocket (experimental), หรือ Unix socket เหมาะสำหรับสร้าง custom Codex client ที่ต้องการ streaming events และ conversation management

12. MCP Server

อ้างอิง: MCP Server — Codex Docs

หัวข้อนี้คืออะไร

Codex สามารถทำงานเป็น MCP (Model Context Protocol) server ได้ ซึ่งช่วยให้ external agents หรือ tools เชื่อมต่อและใช้งาน Codex ผ่าน standard MCP protocol

ใช้ทำอะไร

เมื่อ Codex ทำงานเป็น MCP server ระบบ agents อื่นๆ (เช่น OpenAI Agents SDK) สามารถใช้ Codex เป็น tool ในการทำงานกับโค้ดได้โดยตรง ทำให้สร้าง multi-agent workflow ได้ง่ายขึ้น

ข้อควรระวัง

รายละเอียดเต็มของ MCP Server integration ดูได้ที่ Official Docs: MCP Server ซึ่งครอบคลุม configuration, endpoints, และตัวอย่างการเชื่อมต่อกับ OpenAI Agents SDK

13. GitHub Action

อ้างอิง: GitHub Action — Codex Docs

หัวข้อนี้คืออะไร

openai/codex-action@v1 เป็น official GitHub Action ที่ให้รัน Codex task ใน GitHub Actions workflow ได้โดยตรง ไม่ต้องตั้งค่า CLI เอง

วิธีใช้งาน
- uses: openai/codex-action@v1
  with:
    prompt: "Fix all TypeScript type errors"
    model: "gpt-5.4"
    effort: "medium"

Input Parameters
Parameter	Required	Default	คำอธิบาย
prompt	✅ (หรือ prompt-file)	—	Prompt ที่ส่งให้ Codex
prompt-file	✅ (หรือ prompt)	—	Path ไปยังไฟล์ที่มี prompt
codex-args	❌	—	Arguments เพิ่มเติมสำหรับ Codex CLI
model	❌	—	Model ที่ใช้ (เช่น gpt-5.4)
effort	❌	—	ระดับความพยายาม: low, medium, high
sandbox	❌	—	Sandbox mode
output-file	❌	—	Path ไฟล์สำหรับบันทึก output
safety-strategy	❌	drop-sudo	กลยุทธ์ความปลอดภัย
allow-users	❌	—	GitHub users ที่อนุญาตให้ trigger
allow-bots	❌	—	GitHub bot ที่อนุญาตให้ trigger
Output
Output	คำอธิบาย
final-message	ข้อความสุดท้ายที่ Codex ตอบกลับ

ใช้งาน:

- id: codex
  uses: openai/codex-action@v1
  with:
    prompt: "Summarize what changed"

- name: Show result
  run: echo "${{ steps.codex.outputs.final-message }}"

Safety Strategy

safety-strategy ควบคุมพฤติกรรม sandbox ใน GitHub Actions:

drop-sudo (default) — ลบ sudo permissions สำหรับ agent commands
ค่าอื่นๆ ดูได้จาก Official Docs
แนวทางด้านความปลอดภัย
ทำความสะอาด prompt ก่อนส่งเข้า workflow เพื่อป้องกัน prompt injection
ปกป้อง API key — เก็บไว้ใน GitHub Secrets เสมอ (${{ secrets.CODEX_API_KEY }})
ใช้ drop-sudo เพื่อจำกัดสิทธิ์ของ agent ใน CI
ใช้ allow-users/allow-bots เพื่อจำกัดว่าใครทริกเกอร์ได้
ตัวอย่าง Workflow
name: Codex Auto Fix
on:
  pull_request:
    types: [opened, synchronize]

jobs:
  codex:
    runs-on: ubuntu-latest
    permissions:
      contents: write
      pull-requests: write
    steps:
      - uses: actions/checkout@v4

      - name: Run Codex
        uses: openai/codex-action@v1
        with:
          prompt: "Review the diff and fix any obvious bugs or lint errors"
          model: "gpt-5.4"
          effort: "medium"
          safety-strategy: "drop-sudo"
        env:
          CODEX_API_KEY: ${{ secrets.CODEX_API_KEY }}

สรุปสั้นๆ

openai/codex-action@v1 ทำให้รัน Codex ใน GitHub Actions ได้ง่าย เสมอเก็บ API key ใน Secrets, ใช้ drop-sudo safety strategy, และระบุ allow-users เพื่อความปลอดภัย

14. หัวข้อที่ยังไม่ได้เรียบเรียงครบถ้วน
หัวข้อ	เหตุผล	ลิงก์
Enterprise — Admin Setup (เต็ม)	หน้าใหญ่เกิน 59KB ไม่สามารถดึงเนื้อหาครบได้	Admin Setup
Enterprise — Managed Configuration (เต็ม)	หน้าใหญ่เกิน 52KB มีรายละเอียด policy ที่ซับซ้อน	Managed Configuration
MCP Server (เต็ม)	เนื้อหาเชื่อมโยงกับ OpenAI Agents SDK ที่มีรายละเอียดมาก	MCP Server
Access Tokens (เต็ม)	ขึ้นอยู่กับ enterprise admin setup	Access Tokens
Amazon Bedrock Deployment	หัวข้อ Deployment แยกสำหรับ AWS	Amazon Bedrock

เอกสารนี้อ้างอิงจาก Codex Official Documentation — ข้อมูล ณ วันที่ จัดทำ

กลับไปที่ INDEX

 ก่อนหน้า
Integrations & Codex Security
ถัดไป
Use Cases — กรณีการใช้งาน Codex จริง
```

## Page 7 (หน้า 4 / 6)
```text
Codex
คู่มืออย่างเป็นทางการ
11 เอกสาร
ระดับกลาง
Use Cases — กรณีการใช้งาน Codex จริง

รวม Use Cases หลักที่ Codex ช่วยได้จริงในงาน Engineering ประจำวัน ตั้งแต่การเขียนโค้ด Debug ทำ Code Review ไปจนถึง Refactoring และสร้าง UI จาก Design ·  8 นาที

หน้า 4 / 6
Codex คู่มือภาษาไทย — ตอนที่ 7: Use Cases กรณีการใช้งานจริง

อ้างอิงหลัก: Codex Use Cases | Codex Workflows

ภาพรวม

Codex ไม่ใช่แค่ "AI เขียนโค้ด" ทั่วไป — มันเป็น Coding Agent (ตัวแทน AI ที่ทำงานหลายขั้นตอนด้วยตัวเอง) ที่ทำงานได้หลายขั้นตอนพร้อมกัน สามารถอ่านไฟล์, รันคำสั่ง, แก้ไขโค้ด, และสร้าง Pull Request (คำขอรวมโค้ด — วิธีเสนอการเปลี่ยนแปลงโค้ดให้ทีมตรวจสอบก่อน merge) ได้ในคราวเดียว

ทีม OpenAI จัดกลุ่ม Use Cases (กรณีการใช้งาน) ไว้ใน 7 หมวดหลัก:

หมวด	ตัวอย่างงาน
Productivity & Collaboration	ตอบอีเมล, ประสานงานข้าม Tools
Web Development	สร้าง UI จาก Design Spec
Game Development	Prototype (ต้นแบบ) กลไกเกม
Native Development	iOS/macOS App
Production Systems	Navigate และ Refactor Codebase ขนาดใหญ่
Security	ตรวจหาช่องโหว่, Penetration Testing (ทดสอบเจาะระบบ)
Life Sciences	วิเคราะห์ข้อมูลงานวิจัย
1. การสร้างโค้ด (Code Generation)

เหมาะกับ: งานสร้าง Feature (ฟีเจอร์ — ความสามารถใหม่) ใหม่, Boilerplate (โครงโค้ดพื้นฐาน — โค้ดซ้ำๆ ที่ต้องมีทุกโปรเจกต์), ฟังก์ชัน Utility (ฟังก์ชันอเนกประสงค์)

วิธีใช้ที่ได้ผลดี
บอก บริบทของ Project ก่อน เช่น stack (ชุดเทคโนโลยี), framework (กรอบงาน — โครงสร้างสำเร็จรูปสำหรับพัฒนาโปรแกรม), convention (แนวทางเขียนโค้ดของทีม)
ระบุ ผลลัพธ์ที่ต้องการ ให้ชัดเจน เช่น "สร้าง API endpoint (จุดเชื่อมต่อ API — URL ที่ให้บริการข้อมูล) สำหรับ GET /users ที่ return JSON"
แนบไฟล์ที่เกี่ยวข้อง เช่น schema (โครงสร้างข้อมูล), types (ชนิดของข้อมูล), ตัวอย่างโค้ดเดิมในโปรเจกต์
ตัวอย่าง Prompt
สร้าง React component สำหรับแสดง user profile card
- ใช้ TypeScript
- Props: { name: string, avatar: string, role: string }
- ต้องเป็น responsive และใช้ Tailwind CSS
- ดู pattern จากไฟล์ @src/components/Card.tsx

สิ่งที่ Codex จะทำ
อ่านไฟล์ Card.tsx เพื่อเข้าใจ pattern (รูปแบบ) ของ Project
สร้าง Component (ส่วนประกอบ UI) ที่ตรงกับ convention ของทีม
เพิ่ม TypeScript types ที่ถูกต้อง
ใช้ Tailwind CSS ตาม style guide เดิม
2. การ Debug และแก้ไข Bug

เหมาะกับ: แก้ไข Error (ข้อผิดพลาด), หาสาเหตุของปัญหา, ติดตาม Stack Trace (เส้นทางที่โปรแกรมรันก่อนพัง — บอกว่าพังที่บรรทัดไหนของไฟล์ไหน)

วิธีให้ผลดีที่สุด
แนบ Error message หรือ Stack Trace เต็มๆ
บอก วิธีทำให้ Error เกิดซ้ำ (Reproduction steps — ขั้นตอนทำให้บัคเกิดขึ้นอีก)
ระบุ ไฟล์ที่น่าสงสัย ถ้ามี
ตัวอย่าง Prompt
แอปพัง เมื่อ user กด Submit ใน /checkout
Error: "Cannot read properties of undefined (reading 'price')"
Stack trace: @error.log
ไฟล์ที่น่าเกี่ยวข้อง: @src/pages/checkout.tsx @src/hooks/useCart.ts
ช่วยหาสาเหตุและแก้ไขให้หน่อย

สิ่งที่ Codex จะทำ
อ่าน Stack Trace และไล่ Call Stack (ลำดับการเรียกฟังก์ชัน)
ค้นหา Call Sites (จุดที่มีการเรียกใช้ฟังก์ชัน) ที่เกี่ยวข้อง
เสนอ Root Cause (ต้นตอของปัญหา) พร้อมคำอธิบาย
แก้ไขโค้ดและรัน Test (ชุดทดสอบ) เพื่อยืนยัน
3. การเขียน Test

เหมาะกับ: Unit Test (ทดสอบฟังก์ชันย่อย — ทดสอบโค้ดแต่ละชิ้นแยกกัน), Integration Test (ทดสอบการทำงานร่วมกัน — ทดสอบหลายส่วนประกอบพร้อมกัน), Edge Cases (กรณีพิเศษ — สถานการณ์ขอบเขตที่อาจทำให้โปรแกรมผิดพลาด)

วิธีใช้ที่ได้ผลดี
ระบุว่าต้องการ Test แบบไหน (Unit/Integration/E2E)
บอก Framework ที่ใช้ (Jest, Vitest, Pytest ฯลฯ)
ระบุ Convention ของ Project เช่น ชื่อไฟล์, โครงสร้าง
ตัวอย่าง Prompt
เขียน Unit Test สำหรับฟังก์ชัน calculateDiscount ใน @src/utils/pricing.ts
- ใช้ Vitest
- ครอบคลุม happy path (กรณีปกติ) และ edge cases (discount 0%, 100%, invalid input)
- ดู pattern จาก @src/utils/__tests__/tax.test.ts

ตัวอย่างโค้ดที่ได้
import { describe, it, expect } from 'vitest'
import { calculateDiscount } from '../pricing'

describe('calculateDiscount', () => {
  it('applies 20% discount correctly', () => {
    expect(calculateDiscount(100, 20)).toBe(80)
  })

  it('returns original price when discount is 0', () => {
    expect(calculateDiscount(100, 0)).toBe(100)
  })

  it('returns 0 when discount is 100', () => {
    expect(calculateDiscount(100, 100)).toBe(0)
  })

  it('throws error for negative discount', () => {
    expect(() => calculateDiscount(100, -5)).toThrow()
  })
})

4. การ Refactor โค้ด

เหมาะกับ: ปรับปรุงโครงสร้าง, ลด Duplication (โค้ดซ้ำกัน), ปรับตาม Design Pattern (รูปแบบการออกแบบโค้ด) ใหม่

วิธีที่ได้ผลดีที่สุด (Cloud Mode)

การ Refactor (ปรับโครงสร้างโค้ดใหม่โดยไม่เปลี่ยนพฤติกรรม) โค้ดจำนวนมากเหมาะกับการ Delegate (มอบหมาย) ไป Codex Cloud เพราะ:

ใช้เวลานาน ควรทำ Background (ทำงานเบื้องหลัง)
ต้องแตะหลายไฟล์พร้อมกัน
ต้องรัน Test Suite (ชุดทดสอบทั้งหมด) หลังเสร็จ
ขั้นตอนแนะนำ
วางแผนก่อน (Local): ใช้ $plan skill เพื่อออกแบบ Refactoring Strategy (กลยุทธ์การปรับโค้ด)
Delegate ไป Cloud: ส่งงานไป Codex Cloud ให้ทำใน Background
Review Diff: ตรวจสอบ Diff (ความแตกต่างของโค้ดก่อนและหลัง) ก่อน Merge (รวมโค้ด)
ตัวอย่าง Prompt สำหรับ Cloud
Refactor โมดูล authentication ใน src/auth/
- แยก concerns: validation, token management, session handling
- ใช้ Repository Pattern
- อย่าเปลี่ยน public API
- รัน npm test หลังเสร็จ ต้องผ่านทุก test

5. การสร้าง UI จาก Design

เหมาะกับ: แปลง Figma Screenshot หรือ Design Spec (ข้อกำหนดการออกแบบ) เป็นโค้ด

วิธีใช้
Attach รูป Screenshot ของ Design
ระบุ Framework และ Styling approach (แนวทางจัดสไตล์)
บอก Constraint (ข้อจำกัด) เช่น Responsive (ปรับตามขนาดจอ), Dark Mode
ตัวอย่าง Prompt
[แนบ screenshot ของ design]
สร้าง React component จาก design นี้
- ใช้ Next.js + TypeScript
- Styling: Tailwind CSS
- ต้องเป็น responsive (mobile, tablet, desktop)
- ใส่ใน src/components/HeroBanner.tsx

6. การอธิบาย Codebase (Code Explanation)

เหมาะกับ: Onboarding (การเริ่มต้นทำความเข้าใจโปรเจกต์ใหม่), รับช่วงต่อ Legacy Code (โค้ดเก่าที่ยังใช้งานอยู่), ทำความเข้าใจ Service ที่ไม่คุ้นเคย

ตัวอย่าง Prompt
อธิบาย service นี้ให้หน่อย @src/services/payment/
- Service ทำหน้าที่อะไร
- Data flow (การไหลของข้อมูล) เป็นยังไง
- จุด Validation (การตรวจสอบความถูกต้อง) อยู่ที่ไหนบ้าง
- มี Gotcha (จุดพลาดที่คาดไม่ถึง) หรือ Edge Case ที่ต้องระวังไหม

7. Code Review อัตโนมัติ

เหมาะกับ: PR Review (ตรวจสอบโค้ดก่อน merge), หา Bug, ตรวจ Security (ความปลอดภัย)

วิธีใช้
Local: รัน /review command ใน CLI (ส่วนต่อประสานบรรทัดคำสั่ง)
GitHub: Comment @codex review บน PR
Auto Review: เปิดใน Settings ให้ Codex Review ทุก PR อัตโนมัติ
ตัวอย่าง
# ใน GitHub PR comment:
@codex review ดูเรื่อง security issues และ edge cases เป็นพิเศษ


Codex จะ Flag (ติดธงแจ้งเตือน) เฉพาะ P0 (Critical — วิกฤต) และ P1 (High — สำคัญมาก) เพื่อไม่ให้ Review Comment รกเกินไป

หมวด Use Cases เพิ่มเติม
Production Systems
Codebase Navigation: หาว่าโค้ดส่วนไหนทำหน้าที่อะไร
Dependency Updates: อัปเดต Library (ไลบรารี — ชุดโค้ดสำเร็จรูปที่นำมาใช้ซ้ำ) version พร้อมแก้ Breaking Changes (การเปลี่ยนแปลงที่ทำให้โค้ดเดิมพัง)
API Migration: ย้ายจาก API (ช่องทางเชื่อมต่อโปรแกรม — เหมือนสะพานให้แอพคุยกัน) เก่าไปใหม่ทั้ง codebase
Security
Vulnerability Scanning: ตรวจหาช่องโหว่ OWASP Top 10 (10 ช่องโหว่ความปลอดภัยที่พบบ่อยที่สุด)
Dependency Audit: ตรวจ npm/pip packages ที่มีปัญหา
Code Hardening: เพิ่ม Input Validation (การตรวจสอบข้อมูลขาเข้า), Error Handling (การจัดการข้อผิดพลาด)
Documentation
Auto-generate Docs: สร้าง JSDoc/docstring (คำอธิบายโค้ดในรูปแบบมาตรฐาน) จากโค้ด
README Update: อัปเดต README ให้ตรงกับ codebase จริง
API Docs: สร้าง OpenAPI spec (มาตรฐานอธิบาย API) จาก route handlers
Tips สำหรับการเลือก Use Case ที่เหมาะสม
งานแบบนี้	ใช้ Surface ไหน	เหตุผล
Quick question / อธิบายโค้ดสั้นๆ	CLI / IDE	ตอบเร็ว, ไม่ต้องรอ
สร้าง Feature ใหม่ หลายไฟล์	Codex Cloud	รันใน Background
Debug Bug เร่งด่วน	CLI / IDE	Interactive (โต้ตอบได้ทันที), tight feedback loop
Refactor ขนาดใหญ่	Codex Cloud	รันคู่ขนาน, Review diff ก่อน merge
PR Review	GitHub @codex	Context ครบ, Push fix กลับได้เลย
สร้าง UI จาก Design	IDE (แนบรูป)	ดู design ได้โดยตรง
สรุป

Codex มีประโยชน์สูงสุดเมื่อ:

ให้ Context ครบ — แนบไฟล์, stack trace, ตัวอย่างโค้ดเดิม
ระบุ Definition of Done (นิยามของ "เสร็จ") — บอกว่า "เสร็จ" หมายถึงอะไร
เลือก Surface ให้เหมาะกับงาน — Interactive vs Cloud/Background
ให้ Codex verify งานตัวเอง — บอกให้รัน Test, Lint (ตรวจสอบคุณภาพโค้ด) หลังทำเสร็จ
 ก่อนหน้า
Administration & Automation
ถัดไป
Prompt Patterns — เทคนิคการเขียน Prompt สำหรับงาน Coding
```

## Page 8 (หน้า 5 / 6)
```text
Codex
คู่มืออย่างเป็นทางการ
11 เอกสาร
ระดับกลาง
Prompt Patterns — เทคนิคการเขียน Prompt สำหรับงาน Coding

เรียนรู้เทคนิคและ Pattern การเขียน Prompt ที่ได้ผลดีสำหรับ Codex ตั้งแต่การให้ Context, การแบ่งงาน, การใช้ Goal Mode ไปจนถึง Pattern สำเร็จรูปสำหรับงานแต่ละประเภท ·  7 นาที

หน้า 5 / 6
Codex คู่มือภาษาไทย — ตอนที่ 8: Prompt Patterns เทคนิคการเขียน Prompt

อ้างอิงหลัก: Codex Prompting | Codex Workflows

ทำไม Prompt ถึงสำคัญมาก

Codex ทำงานเป็น Agentic Loop (วงลูปการทำงานอัตโนมัติ — AI ตัดสินใจและลงมือทำซ้ำจนงานเสร็จ) — มันเรียก Model (โมเดล AI), อ่านไฟล์, รันคำสั่ง, แล้ววนซ้ำจนกว่างานจะเสร็จ คุณภาพของผลลัพธ์จึงขึ้นอยู่กับว่า Codex เข้าใจงานได้ถูกต้องหรือไม่ตั้งแต่แรก

"Codex works best when you treat it like a teammate with explicit context and a clear definition of 'done.'"
— OpenAI Codex Docs

หลักการพื้นฐาน 3 ข้อ
1. ให้ Context ที่ครบถ้วน

Codex ต้องการ Context (บริบท — ข้อมูลพื้นหลังที่จำเป็น) เหมือนกับโปรแกรมเมอร์มือใหม่ที่เพิ่งเข้าทีม ยิ่งมีข้อมูลมาก ผลลัพธ์ยิ่งดี

Context ที่ควรให้:

ไฟล์ที่เกี่ยวข้อง (ใช้ @filename ใน CLI/IDE)
Stack (ชุดเทคโนโลยี) และ Framework (กรอบงาน) ที่ใช้
Convention (แนวทางปฏิบัติ) ของทีม
Error message หรือ Stack Trace (เส้นทางที่โปรแกรมรันก่อนพัง) เต็มๆ
รูป Screenshot (กรณีทำ UI)
2. กำหนด Definition of Done ให้ชัด

บอกว่า "เสร็จ" หมายความว่าอะไร เพื่อให้ Codex ตรวจสอบงานตัวเองได้

แทนที่จะเขียน:

แก้ bug ให้หน่อย


ควรเขียนว่า:

แก้ bug ให้หน่อย เสร็จแล้วต้อง:
- รัน npm test ผ่านทุก test case
- ไม่มี TypeScript error
- รัน reproduction steps แล้ว bug ไม่เกิดซ้ำ

3. แบ่งงานใหญ่เป็นชิ้นเล็ก

งานซับซ้อนควรแบ่งเป็นหลาย Prompt แทนที่จะยัดทุกอย่างในที่เดียว ถ้าไม่รู้จะแบ่งยังไง ให้ถาม Codex ก่อนว่า:

ช่วยแบ่งงาน Refactor นี้เป็น Milestones (จุดหมายย่อย — ขั้นตอนเป้าหมายระหว่างทาง) ที่ทำได้ทีละขั้นหน่อย
ก่อนที่จะเริ่มทำ

Prompt Patterns สำเร็จรูป
Pattern 1: Code Generation
สร้าง [ชื่อ feature/component] ที่ทำหน้าที่ [อธิบายสั้นๆ]

Requirements:
- [requirement 1]
- [requirement 2]

Tech stack: [framework, language, libraries]
Convention: ดูตัวอย่างจาก @[ไฟล์ตัวอย่าง]
Output: สร้างไฟล์ที่ [path ปลายทาง]


ตัวอย่างจริง:

สร้าง React Hook (ฟังก์ชันพิเศษของ React สำหรับจัดการ Logic ที่ใช้ซ้ำได้) สำหรับ fetch user data ที่จัดการ loading, error, retry

Requirements:
- TypeScript
- Support AbortController (ยกเลิก request เมื่อ component unmount)
- Exponential backoff retry (รอนานขึ้นเรื่อยๆ ก่อน retry — เพื่อไม่ให้ส่งคำขอถี่เกินไป) สูงสุด 3 ครั้ง
- Return { data, loading, error, refetch }

Tech stack: React 18, TypeScript 5
Convention: ดูตัวอย่างจาก @src/hooks/useAuth.ts
Output: src/hooks/useUserData.ts พร้อม test ที่ src/hooks/__tests__/useUserData.test.ts

Pattern 2: Bug Fix
Bug: [อธิบาย symptom (อาการ)]

Reproduction steps:
1. [step 1]
2. [step 2]

Error: [paste error message / stack trace]

Suspect files: @[file1] @[file2]
Constraint: [อย่าเปลี่ยน X, ต้องทำงานกับ Y ได้]

เสร็จแล้วรัน [คำสั่ง test] เพื่อยืนยัน

Pattern 3: Test Writing
เขียน [Unit/Integration] Test สำหรับ [function/module] ใน @[ไฟล์]

Framework: [Jest/Vitest/Pytest/etc.]
ครอบคลุม:
- Happy path: [กรณีปกติที่ทุกอย่างทำงานถูกต้อง]
- Edge cases: [กรณีพิเศษ — สถานการณ์ขอบเขต]
- Error cases: [กรณี error]

ดู pattern จาก @[test file ตัวอย่าง]

Pattern 4: Refactoring
Refactor @[ไฟล์/โฟลเดอร์] เพื่อ [เหตุผล เช่น แยก concerns (ความรับผิดชอบ), ปรับตาม pattern ใหม่]

เป้าหมาย:
- [goal 1]
- [goal 2]

ข้อจำกัด:
- อย่าเปลี่ยน public API / interface (ส่วนต่อประสานที่ผู้อื่นใช้งาน)
- ต้องทำงานกับ [dependency (สิ่งที่โค้ดต้องพึ่งพา)] ได้เหมือนเดิม

Verification: รัน [test command] ต้องผ่านทุก test

Pattern 5: Code Review
Review โค้ดใน @[ไฟล์/PR] โดยเน้น:
- [focus area 1 เช่น security (ความปลอดภัย)]
- [focus area 2 เช่น performance (ประสิทธิภาพ)]
- [focus area 3 เช่น edge cases (กรณีพิเศษ)]

Severity levels: P0 = Critical (วิกฤต), P1 = High (สำคัญมาก), P2 = Medium (ปานกลาง)

Pattern 6: Code Explanation
อธิบาย @[ไฟล์/function/service] ให้เข้าใจในระดับ [junior/senior] engineer

อยากรู้:
1. หน้าที่หลักของ module/function นี้คืออะไร
2. Data flow (การไหลของข้อมูล) ทำงานยังไง
3. จุดที่ซับซ้อนหรือมี gotcha (จุดพลาดที่คาดไม่ถึง) อยู่ที่ไหน
4. Dependency (สิ่งที่โค้ดต้องพึ่งพา) กับส่วนอื่นของระบบเป็นยังไง

เทคนิค Context Management
การแนบไฟล์

ใน CLI:

# พิมพ์ @ แล้ว Tab เพื่อ autocomplete path
@src/utils/pricing.ts


ใน IDE:

เลือก code แล้วใช้ "Add to Codex Thread"
เปิดไฟล์ไว้ใน editor — IDE extension (ส่วนขยายโปรแกรมแก้โค้ด) จะใส่ context ให้อัตโนมัติ

ใน Cloud:

ระบุ path ในข้อความ Codex จะอ่านไฟล์เอง
Context Window Limits

Codex มี Context Window (หน้าต่างบริบท — ปริมาณข้อมูลที่ AI รับได้ต่อครั้ง) จำกัด เมื่อ conversation ยาวขึ้น Codex จะ Auto-compact (บีบอัดอัตโนมัติ) โดยสรุปข้อมูลเก่าที่ยังเกี่ยวข้องไว้ ถ้าต้องการเริ่มงานใหม่ที่ไม่เกี่ยวกัน ควรเปิด Thread (กระทู้สนทนา) ใหม่

Goal Mode — สำหรับงานยาวหลายขั้นตอน

ใช้ /goal command เพื่อกำหนด Objective (เป้าหมาย) ระยะยาวให้ Codex ทำงานได้เองโดยไม่ต้องรอ Prompt ทุกขั้น

Goal ที่ดีต้องมี:
Specific outcome — ผลลัพธ์ที่ต้องการชัดเจน
Measurable target — วัดได้ว่าเสร็จหรือยัง
Test criteria — เงื่อนไขที่ Codex ตรวจสอบได้เอง
ตัวอย่าง Goal
/goal
เพิ่ม Rate Limiting (การจำกัดอัตราการเรียกใช้งาน — ป้องกันไม่ให้ใครเรียก API บ่อยเกินไป) ให้ API ทุก endpoint ใน src/api/

Criteria:
- ทุก endpoint ต้องรองรับไม่เกิน 100 req/min ต่อ IP
- ถ้าเกิน ต้อง return 429 Too Many Requests พร้อม Retry-After header
- ต้องมี Integration Test ครอบคลุม limit scenarios
- รัน npm test ผ่านทุก test

Verification — ให้ Codex ตรวจงานตัวเอง

หนึ่งในเทคนิคที่สำคัญที่สุด: ขอให้ Codex verify งานตัวเอง

Verification ที่ดีมีหลายระดับ
ระดับ	วิธี	เหมาะกับ
Basic	รัน Test Suite (ชุดทดสอบทั้งหมด)	ทุกงาน
Type Check	รัน tsc --noEmit	TypeScript projects
Lint (ตรวจสอบคุณภาพโค้ด)	รัน ESLint/Prettier	Code quality
Integration	รัน E2E tests (ทดสอบแบบ end-to-end — จำลองการใช้งานจริงตั้งแต่ต้นจนจบ)	Feature ใหม่
Manual	บอก Reproduction steps	Bug fixes
ตัวอย่าง Verification ใน Prompt
หลังแก้ไขเสร็จ:
1. รัน `npm run lint` ต้องไม่มี error
2. รัน `npm test` ต้องผ่านทุก test
3. ลอง reproduce bug เดิม ต้องไม่เกิดขึ้นอีก
4. ตรวจ TypeScript types ด้วย `tsc --noEmit`

Anti-patterns ที่ควรหลีกเลี่ยง
Prompt ที่ให้ผลแย่
Anti-pattern (รูปแบบที่ควรหลีกเลี่ยง)	ปัญหา	วิธีแก้
"แก้ code ให้ดีขึ้น"	ไม่รู้ว่า "ดีขึ้น" หมายถึงอะไร	ระบุ criteria (เกณฑ์) ที่วัดได้
"fix all bugs"	กว้างเกินไป	ระบุ bug เฉพาะเจาะจง
ยัดทุก requirement ใน Prompt เดียว	Codex ทำหลายอย่างพร้อมกัน ยากตรวจสอบ	แบ่งเป็นหลาย Prompt
ไม่แนบไฟล์ที่เกี่ยวข้อง	Codex ต้องเดา context	ใช้ @filename อ้างอิงไฟล์
ไม่บอก Verification steps	Codex ไม่รู้ว่า "เสร็จ" คืออะไร	ระบุ test/lint commands
Template Prompt สำหรับงานประจำวัน
Morning Code Review
Review PR ของฉันใน @[branch/file changes]
โฟกัส:
1. Logic errors และ edge cases
2. Security issues (SQL injection (การฝังคำสั่ง SQL ที่เป็นอันตราย), XSS (การฝังสคริปต์อันตรายในหน้าเว็บ), auth bypasses (การข้ามระบบยืนยันตัวตน))
3. Performance bottlenecks (จุดที่ทำให้ระบบช้า)
4. Missing error handling

Flag เฉพาะ P0/P1 ก็พอ ไม่ต้องรายงาน style issues

Feature Implementation
Implement [feature name] ตาม spec ใน @[spec file หรือ issue]

Stack: [tech stack]
Files to create/modify: [list ถ้ารู้]
Must NOT change: [critical files ที่อย่าแตะ]

Complete เมื่อ:
- [ ] Feature ทำงานตาม spec
- [ ] Tests ผ่าน
- [ ] No TypeScript errors
- [ ] PR-ready (clean commits, no debug code)

Documentation Update
อัปเดต documentation ใน @[doc files]
ให้ตรงกับโค้ดปัจจุบันใน @[source files]

เปลี่ยนแปลงล่าสุด: [อธิบายว่าโค้ดเปลี่ยนอะไรไป]
ห้ามเปลี่ยน: tone, structure โดยรวม

สรุป Prompt Checklist

ก่อนส่ง Prompt ให้ตรวจ:

 บอก งานที่ต้องทำ ชัดเจน
 แนบ ไฟล์ที่เกี่ยวข้อง ด้วย @filename
 ระบุ tech stack / framework
 บอก ข้อจำกัด (อย่าเปลี่ยน X, ต้องทำงานกับ Y)
 กำหนด Definition of Done และ Verification steps
 ถ้างานซับซ้อน — แบ่งเป็น Prompt ย่อยหรือใช้ Goal Mode
 ก่อนหน้า
Use Cases — กรณีการใช้งาน Codex จริง
ถัดไป
Workflows ขั้นสูง — Multi-file, PR Automation และ GitHub Integration
```

## Page 9 (หน้า 6 / 6)
```text
Codex
คู่มืออย่างเป็นทางการ
11 เอกสาร
ระดับกลาง
Workflows ขั้นสูง — Multi-file, PR Automation และ GitHub Integration

เรียนรู้ Workflow ขั้นสูงสำหรับการแก้ไขหลายไฟล์พร้อมกัน, การสร้างและ Review PR อัตโนมัติ, การใช้ @codex mention บน GitHub และการทำ Cloud-based parallel tasks ·  8 นาที

หน้า 6 / 6
Codex คู่มือภาษาไทย — ตอนที่ 9: Workflows ขั้นสูง

อ้างอิงหลัก: Codex Workflows | Codex Web | GitHub Integration

ภาพรวม Workflow Surfaces

Codex ทำงานได้ 3 Surface (พื้นที่ทำงาน) หลัก แต่ละอันเหมาะกับงานต่างกัน:

Surface	เหมาะกับ	การทำงาน
CLI (ส่วนต่อประสานบรรทัดคำสั่ง)	งาน Interactive (โต้ตอบทันที), Debug, Quick tasks	รันในเครื่อง, Sandboxed (ทำงานในพื้นที่จำกัด — ไม่กระทบส่วนอื่น)
IDE Extension (ส่วนขยายโปรแกรมแก้โค้ด)	เขียนโค้ดประจำวัน, อ่านไฟล์ปัจจุบัน	รันในเครื่อง, context จาก editor
Codex Cloud	งานใหญ่, Multi-file (หลายไฟล์พร้อมกัน), Background tasks	รันบน Cloud, สร้าง PR ได้โดยตรง
Workflow 1: Multi-file Editing

งานที่ต้องแก้ไขหลายไฟล์พร้อมกัน เช่น เพิ่ม Feature ใหม่, Migration (การย้ายระบบ), Refactoring (ปรับโครงสร้างโค้ด)

แนะนำให้ใช้ Codex Cloud เพราะ:
รัน Background (ทำงานเบื้องหลัง) ไม่ต้องรอ
สร้าง PR (Pull Request — คำขอรวมโค้ด) ได้โดยตรง
Review diff (ดูความแตกต่างก่อนและหลัง) ก่อน Merge ได้
ขั้นตอน

ขั้นที่ 1: วางแผนก่อน (Local)

ฉันต้องการเพิ่ม Dark Mode ให้กับ App
ช่วยวาง plan ว่าต้องแก้ไขไฟล์อะไรบ้าง
และแต่ละขั้นทำอะไร อย่าเริ่มทำก่อน


Codex จะ List ออกมาเช่น:

เพิ่ม theme tokens (ตัวแปรสี/ขนาด — ค่าที่กำหนดรูปลักษณ์ของ Design System) ใน src/styles/tokens.css
อัปเดต ThemeProvider ใน src/context/theme.tsx
เพิ่ม toggle component ใน src/components/ThemeToggle.tsx
อัปเดต global styles ใน src/app/globals.css

ขั้นที่ 2: Delegate ไป Cloud

หลังเห็น plan แล้วถ้าโอเค ให้ Delegate (มอบหมาย):

Plan โอเค เริ่มทำได้เลย
หลังเสร็จรัน npm test และ npm run build ต้องผ่าน


ขั้นที่ 3: Review และ Merge

Codex Cloud จะสร้าง PR ให้ ตรวจสอบ diff ก่อน merge

Workflow 2: Bug Fix พร้อม Context ครบ
ขั้นตอน
Bug: User ไม่สามารถ upload รูปที่มีชื่อไฟล์มี space ได้
Reproduction:
1. ไปที่ /profile
2. คลิก Change Avatar
3. เลือกไฟล์ชื่อ "my photo.jpg"
4. Error: "Failed to upload"

Stack trace: (ไม่มี error log ใน console)
Network tab: POST /api/upload → 400 Bad Request, body: "Invalid filename"

Suspect: @src/api/upload.ts @src/utils/filename.ts
Constraint: อย่าเปลี่ยน API endpoint path

เสร็จแล้ว:
1. รัน reproduction steps อีกครั้ง bug ต้องหาย
2. รัน npm test -- --testPathPattern=upload

สิ่งที่ Codex จะทำ
อ่านไฟล์ upload.ts และ filename.ts
ค้นหา filename validation logic (ตรรกะตรวจสอบชื่อไฟล์)
พบว่า regex (นิพจน์ปกติ — รูปแบบข้อความสำหรับค้นหา/จับคู่) ไม่ handle space ใน filename
แก้ไข validation rule (กฎการตรวจสอบ)
รัน test เพื่อยืนยัน
Workflow 3: Test Suite ครบวงจร
สร้าง Test สำหรับ Existing Code
เขียน comprehensive test suite (ชุดทดสอบครบวงจร) สำหรับ @src/services/auth/

ครอบคลุม:
1. Unit tests สำหรับแต่ละ function
2. Integration tests สำหรับ auth flow ทั้งหมด
3. Edge cases: expired token (token หมดอายุ), invalid credentials (ข้อมูลประจำตัวไม่ถูกต้อง), account locked

Framework: Vitest + Testing Library
Mocking: ใช้ vi.mock สำหรับ external dependencies (สิ่งที่โค้ดต้องพึ่งพาจากภายนอก)
Pattern: ดูจาก @src/services/user/__tests__/

Target coverage: 80%+ statement coverage (เปอร์เซ็นต์โค้ดที่ถูกทดสอบ)

สร้าง Test ก่อนเขียน Code (TDD)

TDD (Test-Driven Development — การพัฒนาโดยเขียน Test ก่อน แล้วค่อยเขียนโค้ด):

เขียน failing tests ก่อนสำหรับ feature Cart ที่ยังไม่มี

Feature spec: @docs/cart-feature-spec.md
Framework: Vitest

Tests ต้อง fail ตอนแรก เพราะ implementation ยังไม่มี
จากนั้น implement ให้ tests ผ่านทั้งหมด

Workflow 4: Code Review อัตโนมัติ
วิธีที่ 1: Local Review ด้วย CLI
# รัน code review ก่อน commit (บันทึกการเปลี่ยนแปลงลง repository)
codex review

# หรือระบุ focus area
codex review --focus security,performance

วิธีที่ 2: GitHub PR Review ด้วย @codex

เมื่อ PR ถูกสร้างขึ้น Comment บน PR:

@codex review


Codex จะ:

อ่านโค้ดทั้งหมดใน PR
Flag (ติดธงแจ้งเตือน) เฉพาะ P0 (Critical — วิกฤต) และ P1 (High — สำคัญมาก) issues
Post review comments บน GitHub
วิธีที่ 3: Auto Review ทุก PR

เปิดใน Codex Settings:

ไปที่ Codex Settings > GitHub Integration
เปิด "Automatic PR Reviews"
Codex จะ Review ทุก PR ที่ถูก Open โดยอัตโนมัติ
Custom Review Guidelines ด้วย AGENTS.md

สร้างไฟล์ AGENTS.md (ไฟล์กำหนดพฤติกรรมของ Agent AI ในโปรเจกต์) ในโปรเจกต์เพื่อกำหนด Review criteria:

## Code Review Guidelines

### Security
- ตรวจ SQL injection (การฝังคำสั่ง SQL ที่เป็นอันตราย) ทุก database query
- ตรวจ input validation (การตรวจสอบข้อมูลขาเข้า) ทุก user input
- ตรวจ authentication (การยืนยันตัวตน) ทุก protected endpoint

### Performance
- หลีกเลี่ยง N+1 queries (การ query ฐานข้อมูลซ้ำโดยไม่จำเป็น)
- ตรวจ unnecessary re-renders ใน React

### Code Quality
- ใช้ TypeScript strict mode
- ไม่มี console.log ใน production code
- ทุก async function ต้องมี error handling


Codex จะใช้ Guidelines จาก AGENTS.md ที่ใกล้ที่สุดกับไฟล์ที่เปลี่ยน

Workflow 5: GitHub @codex Integration
ใช้ @codex บน GitHub Issues

เมื่อเจอ Issue (รายงานปัญหา/งาน) บน GitHub ให้ tag Codex เพื่อสั่งงาน:

@codex implement this feature based on the spec above


Codex จะ:

อ่าน Issue description
สร้าง Branch (สาขา — พื้นที่โค้ดแยกสำหรับทำงาน) ใหม่
Implement feature
สร้าง PR พร้อม description
ใช้ @codex บน PR Comments
# ขอให้แก้ไข P1 issue ที่ review เจอ
@codex fix the P1 issue about missing error handling

# ขอให้แก้ CI (Continuous Integration — ระบบรันทดสอบอัตโนมัติ) ที่ fail
@codex fix the CI failures

# ขอให้เพิ่ม tests
@codex add tests for the new authentication flow

# ขอให้อัปเดต docs
@codex update the README to reflect the API changes in this PR

สิ่งที่ @codex ทำได้
อ่าน context จาก PR/Issue ได้ทั้งหมด
Push commits (บันทึกการเปลี่ยนแปลงโค้ด) กลับไปยัง branch เดิมได้ (ถ้ามี permission)
สร้าง PR ใหม่ได้
Post comment พร้อมอธิบายการเปลี่ยนแปลง
Workflow 6: Cloud-based Refactoring
กรณี: ย้ายจาก REST API เป็น tRPC

REST API (รูปแบบ API ที่ใช้ HTTP มาตรฐาน) และ tRPC (ไลบรารี TypeScript ที่ทำให้เรียก API เหมือนเรียกฟังก์ชัน):

Refactor ทั้ง API layer จาก REST เป็น tRPC
ไฟล์ที่ต้องเปลี่ยน: src/api/, src/pages/api/, src/hooks/

Plan:
1. สร้าง tRPC router (ตัวกำหนดเส้นทาง API) ใหม่
2. ย้าย business logic จาก REST handlers
3. อัปเดต client-side hooks
4. ลบ REST endpoints เก่า

Constraint:
- อย่าเปลี่ยน business logic
- Frontend behavior ต้องเหมือนเดิมทุกอย่าง

Verification:
- รัน npm test ผ่านทุก test
- รัน npm run build ไม่มี error

กรณี: Database Migration
อัปเดต Prisma schema (โครงสร้างฐานข้อมูล) ตาม @migrations/v2-spec.md
และ update ทุก query (คำสั่งดึงข้อมูล) ที่ได้รับผลกระทบ

Steps:
1. อัปเดต schema.prisma
2. สร้าง migration file
3. อัปเดต queries ใน src/lib/db/
4. อัปเดต types ที่เปลี่ยนแปลง

ห้ามแตะ: business logic ใน src/services/

Workflow 7: Documentation ขนาดใหญ่
Auto-generate API Documentation
สร้าง OpenAPI spec (มาตรฐานอธิบาย API — ให้เครื่องมืออื่นอ่านได้อัตโนมัติ) จาก route handlers ใน @src/app/api/

Format: OpenAPI 3.1
Output: docs/api/openapi.yaml

ครอบคลุม:
- ทุก endpoint
- Request/Response schemas (โครงสร้างข้อมูลที่รับ-ส่ง)
- Authentication requirements
- Error responses

อัปเดต README อัตโนมัติ
อ่าน codebase ปัจจุบันใน @src/ และ @package.json
แล้วอัปเดต @README.md ให้ตรงกับสถานะปัจจุบัน

อัปเดต sections:
- Prerequisites (สิ่งที่ต้องติดตั้งก่อน)
- Installation
- Environment variables (ตัวแปรสภาพแวดล้อม — การตั้งค่าที่เปลี่ยนได้ตามสภาพแวดล้อม)
- Available scripts
- Project structure

อย่าเปลี่ยน: บทนำและ Vision section

Context ใน Cloud vs Local
Cloud Tasks มี Access ถึง:
Repository (ที่เก็บโค้ด — เหมือนโฟลเดอร์โปรเจกต์บน Git) ทั้งหมด (ที่ connect ไว้)
อ่าน/เขียน/รัน commands ใน Sandbox (พื้นที่ทำงานจำกัด — ปลอดภัยจากการแตะระบบภายนอก)
สร้าง PR บน GitHub
รัน CI/CD checks (ระบบตรวจสอบและ deploy อัตโนมัติ)
Local Tasks มี Access ถึง:
Working directory ที่กำหนด
Tools ที่ติดตั้งในเครื่อง
ไฟล์ที่เปิดใน IDE (สภาพแวดล้อมพัฒนาแบบรวม)
Tips สำหรับ Workflow ที่มีประสิทธิภาพ
1. ใช้ Thread อย่างชาญฉลาด
Thread เดียว: งานที่ต่อเนื่องกัน เช่น implement + test + review
Thread แยก: งานที่ไม่เกี่ยวกัน เช่น bug fix กับ feature ใหม่
2. ระบุ Checkpoints

สำหรับงานยาว ระบุ Checkpoint (จุดตรวจ — จุดที่ให้รายงานความคืบหน้า) ให้ Codex รายงานความคืบหน้า:

ทำทีละขั้น และ report หลังแต่ละขั้นว่าเสร็จและ test ผ่านหรือไม่
ถ้าขั้นไหน fail ให้หยุดและบอกฉัน ไม่ต้องทำขั้นต่อไป

3. Parallel Tasks ด้วย Cloud

Codex Cloud รันได้หลาย Task พร้อมกัน:

สร้าง task ใหม่สำหรับแต่ละ issue นี้:
1. Fix login bug ใน @src/auth/login.ts
2. Add validation ใน @src/api/upload.ts
3. Update tests ใน @src/tests/


แต่ละ Task จะรัน parallel (ขนาน — พร้อมกัน) ใน Sandbox แยกกัน

4. Review ก่อนเสมอ

สำหรับงาน Cloud ที่จะ Push to GitHub:

ตรวจ diff ที่ Codex สร้างก่อนเสมอ
อ่าน PR description ที่ Codex เขียน
ดู test results ใน CI
สรุป Best Practices
Local สำหรับ Interactive — Debug, Quick fixes, อยากเห็น output ทันที
Cloud สำหรับ Background — งานใหญ่, Multi-file, ไม่ต้องรอ
@codex บน GitHub — สะดวกมากสำหรับ PR workflow ที่ทีมใช้ GitHub อยู่แล้ว
AGENTS.md สำหรับ Convention — บันทึก team convention ไว้ให้ Codex ใช้ทุกครั้ง
Plan ก่อน Execute — งานซับซ้อนให้วาง plan ก่อนเสมอ
 ก่อนหน้า
Prompt Patterns — เทคนิคการเขียน Prompt สำหรับงาน Coding
ถัดไป
Subagents และ Models — การเลือก Model และใช้ Parallel Agents
```

## Page 10 (หน้า 1 / 2)
```text
Codex
คู่มืออย่างเป็นทางการ
11 เอกสาร
ขั้นโปร
Subagents และ Models — การเลือก Model และใช้ Parallel Agents

เรียนรู้วิธีใช้ Subagents เพื่อทำงานแบบ Parallel, การเลือก Model ที่เหมาะสมกับแต่ละงาน, การปรับ Reasoning Level และ AGENTS.md Customization สำหรับทีม ·  7 นาที

หน้า 1 / 2
Codex คู่มือภาษาไทย — ตอนที่ 10: Subagents และ Models

อ้างอิงหลัก: Codex Subagents | Codex Customization

Subagents คืออะไร

Subagents (ตัวแทน AI ลูก) คือ Agent (ตัวแทน AI) ที่ Codex สร้างและส่งงานไปให้ เพื่อทำงานแบบ Parallel (ขนาน — พร้อมกัน) โดยแยกออกจาก Main Thread (กระทู้หลัก — บทสนทนาหลักกับ AI)

แทนที่ Main Thread จะทำทุกอย่างเองจนเต็ม Context Window (หน้าต่างบริบท — ปริมาณข้อมูลที่ AI รับได้) ด้วย Logs และ Output ระหว่างทาง Codex จะ Delegate (มอบหมาย) งานที่เหมาะสมไปให้ Subagents ทำแยก แล้วนำ Summary (สรุป) กลับมา

ทำไมต้องใช้ Subagents

ปัญหาที่ Subagents แก้:

Context Pollution (บริบทปนเปื้อน) — Output ระหว่างทาง (logs, test results, intermediate analysis) ทำให้ข้อมูลสำคัญถูกฝัง
Context Rot (บริบทเสื่อมคุณภาพ) — Performance ลดลงเมื่อ Conversation ยาวขึ้น เพราะ Model ต้อง Process ข้อมูลที่ไม่เกี่ยวข้อง

โดย Subagents ทำงานใน Thread แยก รับผลลัพธ์เป็น Summary กลับมายัง Main Thread เท่านั้น

งานที่เหมาะกับ Subagents
เหมาะมาก: Read-heavy Tasks
งาน	ตัวอย่าง
Exploration (สำรวจ)	"สำรวจ codebase แล้วบอกว่า authentication อยู่ที่ไหนบ้าง"
Test Execution (รันทดสอบ)	รัน test suite และ summarize failures (สรุปผลที่ fail)
Log Analysis (วิเคราะห์บันทึก)	วิเคราะห์ log ขนาดใหญ่หา pattern
Document Summary	สรุป specs, docs หลายๆ ไฟล์
Security Review (ตรวจสอบความปลอดภัย)	ตรวจหา vulnerabilities (ช่องโหว่) ในโค้ด
Code Review	วิเคราะห์โค้ดเพื่อหา issues
ไม่เหมาะ: Write-heavy Tasks แบบ Parallel

หลีกเลี่ยงการให้ Subagents หลายตัว แก้ไขไฟล์เดียวกัน พร้อมกัน เพราะจะเกิด Conflict (ความขัดแย้ง) และ Overhead (ภาระงานเพิ่มเติม) ในการ Coordinate (ประสานงาน)

วิธีใช้ Subagents

Subagents ต้องการ คำสั่งชัดเจนจากผู้ใช้ — Codex จะไม่ Spawn (สร้าง) เองอัตโนมัติ

Prompt ตัวอย่าง
สร้าง subagents 3 ตัวพร้อมกัน:
1. Subagent สำหรับตรวจ security risks (ความเสี่ยงด้านความปลอดภัย) ใน src/api/
2. Subagent สำหรับหา test gaps (ช่องว่างของการทดสอบ) ใน src/services/
3. Subagent สำหรับ analyze performance bottlenecks (จุดที่ทำให้ระบบช้า) ใน src/db/

เสร็จแล้วให้ summarize findings แยกตาม category

ผลที่ได้

Main Thread จะได้รับ Summary จากแต่ละ Subagent เช่น:

Security Analysis:
- P0: SQL injection risk in /api/search (line 45)
- P1: Missing input sanitization in /api/upload

Test Gaps:
- UserService: 0% coverage on error paths
- AuthService: missing tests for token refresh

Performance:
- N+1 query in getUserOrders() — affects /dashboard
- Missing index on users.email column


แทนที่จะได้ raw logs (ข้อมูลดิบ) หลายพันบรรทัด

Models ที่ใช้ได้ใน Codex

Codex รองรับ Model (โมเดล AI — เวอร์ชันของระบบ AI ที่มีความสามารถต่างกัน) หลายตัว แต่ละตัวมีจุดเด่นต่างกัน:

GPT-5.5 — Model หลักสำหรับงานซับซ้อน
เหมาะกับ: งานที่ต้องการ Planning (วางแผน), Multi-step reasoning (การคิดหลายขั้นตอน), งาน Mission Critical (งานที่สำคัญมาก ผิดพลาดไม่ได้)
ข้อดี: ฉลาดที่สุด, เข้าใจ context ซับซ้อนได้ดี
ข้อเสีย: ช้ากว่าและใช้ Credits (หน่วยนับการใช้งาน) มากกว่า
GPT-5.4 — สมดุลระหว่าง Capability และ Speed
เหมาะกับ: งาน Coding ทั่วไป, Feature implementation, Bug fixes
ข้อดี: เร็วพอสมควร, ครอบคลุมงาน coding ส่วนใหญ่
ข้อเสีย: อาจสู้งานซับซ้อนมากๆ ไม่ได้เท่า GPT-5.5
GPT-5.4-mini — เร็วและประหยัด
เหมาะกับ: Subagent tasks, งาน Exploration (สำรวจ), Quick questions, Large file review
ข้อดี: เร็วมาก, ใช้ Credits น้อย
ข้อเสีย: ความสามารถน้อยกว่าสำหรับงานซับซ้อน
GPT-5.3-Codex — เชี่ยวชาญด้าน Code โดยเฉพาะ
เหมาะกับ: งาน Coding เฉพาะทาง, Code analysis
สำหรับ: Plus, Pro, Business plans
ข้อดี: Optimized (ปรับแต่งให้ดีที่สุด) สำหรับงาน coding
GPT-5.3-Codex-Spark — Research Preview
สำหรับ: Pro plan เท่านั้น
เหมาะกับ: งานที่ต้องการ Latency (ความหน่วง — เวลาตอบสนอง) ต่ำมากๆ
สถานะ: Research preview (ทดลองใช้งาน — ยังไม่เสถียร)
การเลือก Model ที่เหมาะสม
Quick Decision Guide
งานแบบไหน → ใช้ Model ไหน

ซับซ้อนมาก, Multi-step planning → GPT-5.5
งาน Coding ทั่วไป → GPT-5.4
Subagent / Exploration / Quick → GPT-5.4-mini
งาน Code analysis เฉพาะ → GPT-5.3-Codex
ต้องการ Latency ต่ำมาก (Pro) → GPT-5.3-Codex-Spark

เปลี่ยน Model ด้วย /model command
# ใน CLI
/model gpt-5.4-mini

# หรือเลือกจาก menu
/model

Reasoning Level

นอกจาก Model แล้ว ยังปรับ Reasoning Level (ระดับการคิดวิเคราะห์ — ยิ่งสูงยิ่งใช้ Token มากแต่ผลลัพธ์ดีกว่า) ได้:

Level	เหมาะกับ	ผลต่อ Tokens (หน่วยข้อความ — ประมาณ 1 คำ)
High	Security review, Complex logic, Edge cases	ใช้มากกว่า แต่คุณภาพสูง
Medium	งานทั่วไป (Default)	สมดุล
Low	งานตรงไปตรงมา, ต้องการ Speed	เร็วกว่า ใช้น้อยกว่า
กรณีที่ควรใช้ High Reasoning
Security vulnerability analysis (วิเคราะห์ช่องโหว่ความปลอดภัย)
Complex refactoring ที่ต้องเข้าใจ business logic (ตรรกะทางธุรกิจ) ลึก
Debugging ที่ stack trace ซับซ้อน
Algorithm design และ optimization (การออกแบบและปรับปรุงขั้นตอนวิธี)
กรณีที่ควรใช้ Low Reasoning
Simple file operations (การจัดการไฟล์พื้นฐาน)
Boilerplate generation (สร้างโครงโค้ดพื้นฐาน)
Format conversion (แปลงรูปแบบข้อมูล)
Documentation updates ที่ตรงไปตรงมา
Subagents + Model Selection Strategy

เมื่อใช้ Subagents สามารถกำหนด Model ต่างกันสำหรับแต่ละ Subagent:

Main agent: ใช้ GPT-5.5 สำหรับ Planning และ Final synthesis (สังเคราะห์ผลลัพธ์สุดท้าย)

สร้าง subagents:
- Security review subagent: ใช้ GPT-5.5 high reasoning
  (ต้องการ accuracy (ความแม่นยำ) สูงสุด)
- Exploration subagent: ใช้ GPT-5.4-mini
  (แค่อ่านและ summarize)
- Test analysis subagent: ใช้ GPT-5.4-mini
  (รัน tests และ report results)

AGENTS.md — Customization ระดับ Repository

AGENTS.md คือวิธีที่ทรงพลังที่สุดในการ Customize (ปรับแต่ง) Codex ให้เหมาะกับทีม

โครงสร้าง
~/.codex/AGENTS.md          # Global — Personal preferences
repo-root/AGENTS.md         # Repo-wide — Team conventions
src/api/AGENTS.md           # Directory-specific — API rules
src/components/AGENTS.md    # Directory-specific — Component rules


หลัก: ไฟล์ที่อยู่ใกล้กว่า Override (แทนที่) ไฟล์ที่อยู่ห่างกว่า

ตัวอย่าง AGENTS.md ที่ครบถ้วน
# Project Guidelines for Codex

## Build & Test Commands
- Install: `npm install`
- Build: `npm run build`
- Test: `npm test` or `npm run test:watch`
- Lint (ตรวจสอบคุณภาพโค้ด): `npm run lint`
- Type check (ตรวจสอบชนิดข้อมูล): `npm run typecheck`

## Repository Conventions
- Language: TypeScript strict mode
- Framework: Next.js 15 App Router
- Styling: Tailwind CSS + shadcn/ui
- State: Zustand (ไลบรารีจัดการ state) for global state, React Query for server state
- Database: Prisma + PostgreSQL

## Code Style
- ใช้ named exports ไม่ใช่ default exports (ยกเว้น page components)
- ทุก async function ต้องมี try-catch หรือ error boundary (ขอบเขตจับข้อผิดพลาด)
- Component ต้องมี TypeScript interface สำหรับ props (คุณสมบัติที่ส่งเข้า component)
- ไม่มี console.log ใน production code

## File Structure
- Components: src/components/[name]/index.tsx + [name].stories.tsx
- Services: src/services/[domain]/index.ts
- API routes: src/app/api/[endpoint]/route.ts
- Tests: ไว้ใน __tests__/ ใกล้ไฟล์ที่ test

## Review Guidelines
- ตรวจ SQL injection ทุก query (ใช้ Prisma parameterized queries (การใส่ค่าแบบปลอดภัย) เสมอ)
- ตรวจ authentication ทุก API route ที่ไม่ใช่ public
- ตรวจ input validation ด้วย zod ทุก user input
- ไม่ expose (เปิดเผย) internal error messages ใน API responses

## Common Gotchas
- Prisma connection: ใช้ singleton pattern (รูปแบบที่สร้าง instance เดียว) ใน src/lib/db.ts
- Environment variables (ตัวแปรสภาพแวดล้อม): ใช้ src/config/env.ts ไม่ใช่ process.env โดยตรง
- Date handling: ใช้ date-fns ไม่ใช่ native Date methods

เมื่อไหรควร Update AGENTS.md
เมื่อ Codex ทำผิดซ้ำๆ ในเรื่องเดิม
เมื่อ PR review มี comment เดิมซ้ำๆ
เมื่อทีมมี Convention ใหม่
เมื่อ Codex อ่านไฟล์ที่ไม่เกี่ยวข้องมากเกินไป (เพิ่ม routing guidance)
Delegate AGENTS.md Update ให้ Codex
@codex อัปเดต AGENTS.md ให้รวม convention ใหม่:
"ทุก API endpoint ต้องมี rate limiting middleware (ตัวกลางจำกัดความถี่เรียก API)"
ดูตัวอย่าง implementation จาก @src/middleware/rateLimiter.ts

Skills — Reusable Workflows

Skills (ทักษะ — Workflow ที่บันทึกไว้ใช้ซ้ำ) คือ Workflow ที่บันทึกเป็น Package ใช้ซ้ำได้

โครงสร้าง Skill
.agents/skills/
  release-check/
    ├── SKILL.md          # Instructions (required)
    ├── scripts/
    │   ├── check.sh      # Executable scripts
    │   └── validate.py
    ├── references/       # Documentation
    └── assets/           # Templates

ตัวอย่าง SKILL.md
# Release Check Skill

## Purpose
ตรวจสอบ codebase พร้อม release (ปล่อยให้ใช้งาน) หรือยัง

## Steps
1. รัน full test suite
2. ตรวจ security vulnerabilities (ช่องโหว่ความปลอดภัย) ด้วย npm audit
3. ตรวจ TypeScript errors
4. ตรวจ missing environment variables
5. ตรวจ TODO/FIXME comments ที่อาจเป็น blockers (สิ่งกีดขวาง)
6. สร้าง release checklist report

## Output
สร้าง RELEASE-CHECK.md พร้อม:
- Pass/Fail summary
- รายการ issues ที่ต้องแก้ก่อน release
- Timestamp (เวลาที่บันทึก)

การใช้ Skill

Codex สามารถ Discover Skills อัตโนมัติ จาก task description:

เช็คว่า codebase พร้อม deploy (นำขึ้น server ให้ใช้งาน) ไหม


Codex จะเลือกใช้ release-check skill โดยอัตโนมัติ

หรือเรียกใช้โดยตรง:

รัน $release-check skill

Global vs Project Skills
$HOME/.agents/skills/    # Personal global skills (ทุก project)
.agents/skills/          # Project skills (repo-specific)

สรุป: เมื่อไหรใช้อะไร
สถานการณ์	ทางเลือกที่แนะนำ
งานซับซ้อน, Mission Critical	GPT-5.5 + High Reasoning
งาน Coding ปกติ	GPT-5.4 + Medium Reasoning
Explore codebase, Quick tasks	GPT-5.4-mini
วิเคราะห์หลายด้านพร้อมกัน	Subagents parallel (ขนาน)
ต้องการ Codex รู้ convention ทีม	AGENTS.md
Workflow ที่ทำซ้ำบ่อยๆ	Skills
ต้องการลด Context pollution	Subagents สำหรับ exploration/analysis
 ก่อนหน้า
Workflows ขั้นสูง — Multi-file, PR Automation และ GitHub Integration
ถัดไป
Pricing, Limits และ Cyber Safety
```

## Page 11 (หน้า 2 / 2)
```text
Codex
คู่มืออย่างเป็นทางการ
11 เอกสาร
ขั้นโปร
Pricing, Limits และ Cyber Safety

ครอบคลุม Plans ทั้งหมดของ Codex, Usage Limits, Credit Rates, Sandboxing Modes และ Cyber Safety Program สำหรับนักพัฒนาและทีม Security ·  7 นาที

หน้า 2 / 2
Codex คู่มือภาษาไทย — ตอนที่ 11: Pricing, Limits และ Cyber Safety

อ้างอิงหลัก: Codex Pricing | Codex Sandboxing | Cyber Safety

Plans และ Pricing
แผนสำหรับบุคคลทั่วไป
Plan	ราคา/เดือน	เหมาะกับ
Free	$0	ลองใช้งาน, quick coding tasks
Go	$8	งาน Coding เบาๆ
Plus	$20	Developer ที่ใช้งานจริง
Pro	จาก $100	Power users, Rate limits (ขีดจำกัดความถี่การใช้) สูงกว่า
แผนสำหรับองค์กร
Plan	ราคา	เหมาะกับ
Business	Pay as you go	ทีม, มี SSO (ลงชื่อเข้าระบบครั้งเดียวใช้ได้ทุกบริการ)/MFA (การยืนยันตัวตนหลายขั้นตอน)
Enterprise & Edu	ติดต่อ Sales	องค์กรขนาดใหญ่, Enterprise security
Features ตามแต่ละ Plan
Plus ($20/เดือน) — แนะนำสำหรับ Developer ทั่วไป
Web interface, CLI (ส่วนต่อประสานบรรทัดคำสั่ง), IDE Extension (ส่วนขยายโปรแกรมแก้โค้ด), iOS app
Models: GPT-5.5, GPT-5.4, GPT-5.3-Codex
Cloud integrations: Code review, Slack
Extensible (ขยายได้) ด้วย Credits (หน่วยนับการใช้งาน) เพิ่มเติม
Pro (จาก $100/เดือน) — สำหรับ Power Users

ทุกอย่างใน Plus บวก:

Rate limits สูงกว่า Plus 5x หรือ 20x (เลือกได้)
GPT-5.3-Codex-Spark (Research Preview, Latency (ความหน่วง — เวลาตอบสนอง) ต่ำ)
Business — Pay as you go

ทุกอย่างใน Plus บวก:

Standard หรือ Usage-based seats (ที่นั่งตามการใช้งาน)
VM (Virtual Machine — เครื่องคอมพิวเตอร์เสมือน) ขนาดใหญ่กว่าสำหรับ Cloud tasks
SAML SSO (มาตรฐาน SSO สำหรับองค์กร), MFA
ไม่ใช้ข้อมูลสำหรับ Training โดย Default
Enterprise & Edu

ทุกอย่างใน Business บวก:

Priority processing (ประมวลผลก่อน)
Enterprise security: SCIM (ระบบจัดการผู้ใช้อัตโนมัติ), EKM (การจัดการกุญแจเข้ารหัสของตัวเอง), RBAC (ควบคุมสิทธิ์ตามบทบาท)
Audit logs (บันทึกการใช้งาน), Usage monitoring (ติดตามการใช้งาน)
Data residency controls (ควบคุมว่าข้อมูลเก็บอยู่ที่ไหน)
Usage Limits (5-hour Rolling Window)

Rate limits (ขีดจำกัดความถี่) คำนวณตาม 5 ชั่วโมงที่ผ่านมา ไม่ใช่ reset รายวัน

Plus และ Business
Model	Messages ต่อ 5 ชั่วโมง
GPT-5.5	15–80
GPT-5.4	20–100
GPT-5.4-mini	60–350
Pro 5x
Model	Messages ต่อ 5 ชั่วโมง
GPT-5.5	80–400
GPT-5.4	100–500
GPT-5.4-mini	300–1,750
Pro 20x
Model	Messages ต่อ 5 ชั่วโมง
GPT-5.5	300–1,600
GPT-5.4	400–2,000
GPT-5.4-mini	1,200–7,000

หมายเหตุ: Limits อยู่ในช่วง (เช่น 15–80) เพราะปรับตาม System Load (ภาระงานของระบบ) ขณะนั้น

Credit Rates (ซื้อเพิ่มได้)

ถ้าใช้เกิน Limit สามารถซื้อ Credits เพิ่มได้ คิดราคาต่อ 1 ล้าน Tokens (หน่วยข้อความ — ประมาณ 1 คำ):

Model	Input	Cached Input (ข้อมูลที่เคยประมวลผลแล้ว)	Output
GPT-5.5	125 credits	12.50 credits	750 credits
GPT-5.4	62.50 credits	6.25 credits	375 credits
GPT-5.4-mini	18.75 credits	1.875 credits	113 credits
GPT-5.3-Codex	43.75 credits	4.375 credits	350 credits
ค่าใช้จ่ายต่อ Message โดยเฉลี่ย

GPT-5.5 ใช้ประมาณ 5–45 Credits ต่อ message ขึ้นกับความซับซ้อน

Fast Mode ใช้ Credits มากกว่า เพราะทำงานเร็วขึ้นด้วย Resources (ทรัพยากรคอมพิวเตอร์) มากกว่า

API Key Pricing (ใช้โดยตรงผ่าน API)
คิดราคาตาม Standard API rates
ไม่รวม Cloud features (Code Review, Slack ฯลฯ)
เข้าถึง Model ใหม่ช้ากว่า Subscription
Sandboxing — Execution Environment

Sandboxing (การทำงานในพื้นที่จำกัด) คือระบบ Isolation (แยกพื้นที่ทำงาน) ที่ทำให้ Codex ทำงานใน Bounded Environment (สภาพแวดล้อมที่มีขอบเขต) ปลอดภัย

ทำงานอย่างไร

Sandbox ครอบคลุม ทุก Command ที่ Codex รัน ไม่ใช่แค่ File Operations:

git commands
Package managers (npm, pip ฯลฯ)
Test runners (โปรแกรมรันทดสอบ)
Build tools (เครื่องมือสร้างโปรแกรม)

OS-level Enforcement (การบังคับใช้ระดับระบบปฏิบัติการ):

macOS: ใช้ Built-in Seatbelt framework
Windows: Windows Sandbox หรือ WSL2 (ระบบ Linux บน Windows)
Linux/WSL2: ใช้ bubblewrap (ต้อง install แยก)
Sandbox Modes
Mode	การอ่านไฟล์	การแก้ไขไฟล์	การรัน Commands	เหมาะกับ
read-only (อ่านอย่างเดียว)	✓	ต้องขออนุมัติ	ต้องขออนุมัติ	Review, Audit
workspace-write (เขียนในพื้นที่ทำงาน)	✓	✓ (ใน workspace)	✓ (routine)	งานทั่วไป (Default)
danger-full-access (เข้าถึงทุกอย่าง)	✓	✓ (ทุกที่)	✓ (ทุกอย่าง)	Advanced, ระวัง!
Approval Policies (นโยบายขออนุมัติ)
Policy	พฤติกรรม
untrusted	ถามก่อนทุก non-trusted command
on-request	ทำงานอัตโนมัติ ถามเมื่อต้องข้าม Sandbox boundary
never	ไม่ถามเลย (ทำงานใน Sandbox เต็มรูปแบบ)
ตั้งค่าใน config.toml
[settings]
sandbox_mode = "workspace-write"       # หรือ read-only, danger-full-access
approval_policy = "on-request"         # หรือ untrusted, never

[sandbox_workspace_write]
writable_roots = [
  "~/projects/my-app",                 # อนุญาตเขียนในโฟลเดอร์นี้
]

Auto-review Mode

แทนที่จะขอ Approval (การอนุมัติ) จากผู้ใช้ตรงๆ Codex สามารถส่ง Approval Request ไปให้ Reviewer Agent (Agent AI ที่ทำหน้าที่ตรวจสอบ) ตัดสินใจแทนได้ ช่วยให้ทำงานได้ต่อเนื่องโดยไม่ Interrupt (ขัดจังหวะ) ผู้ใช้

Command-level Rules

ปรับ Rules สำหรับ Command (คำสั่ง) เฉพาะได้ โดยไม่ต้องขยาย Sandbox ทั้งหมด:

[[rules]]
name = "allow npm scripts"
command_prefix = "npm run"
action = "allow"

[[rules]]
name = "block network access"
command_prefix = "curl"
action = "deny"

[[rules]]
name = "prompt for docker"
command_prefix = "docker"
action = "prompt"

การติดตั้ง Sandboxing บน Linux/WSL2

Linux และ WSL2 ต้อง install bubblewrap แยก:

# Ubuntu/Debian
sudo apt install bubblewrap

# Fedora
sudo dnf install bubblewrap


Ubuntu 25.04+ จะมี AppArmor profile (โปรไฟล์ควบคุมสิทธิ์โปรแกรม) support อัตโนมัติ

รุ่นเก่ากว่าอาจต้อง load profile ด้วยตนเอง

Cyber Safety Program

GPT-5.3-Codex ถูกจัดว่ามี "High cybersecurity capability" (ความสามารถด้านความมั่นคงไซเบอร์สูง) ตาม OpenAI Preparedness Framework จึงมีระบบป้องกันพิเศษ

ทำไมต้องมี Cyber Safety

Codex มีความสามารถด้าน Cybersecurity (ความมั่นคงไซเบอร์) สูง ซึ่งมีประโยชน์สำหรับ:

Penetration Testing (ทดสอบเจาะระบบ — การจำลองการโจมตีเพื่อหาช่องโหว่)
Vulnerability Research (การวิจัยช่องโหว่)
Malware Analysis (การวิเคราะห์มัลแวร์)

แต่เทคนิคเดียวกันอาจถูกใช้เพื่อจุดประสงค์ไม่ดีได้

กลไกป้องกัน

1. Safety Training
Model ถูก Train ให้ปฏิเสธ Request ที่ดูเหมือน Malicious (เป็นอันตราย)

2. Automated Monitoring (การตรวจสอบอัตโนมัติ)
Classifier (ระบบจำแนกประเภท) ตรวจจับกิจกรรม Cyber ที่น่าสงสัย Traffic (การรับส่งข้อมูล) ที่มีความเสี่ยงสูงจะถูก Reroute (เปลี่ยนเส้นทาง) ไปยัง GPT-5.2 (ความสามารถน้อยกว่า) แต่กระทบ Traffic น้อยมาก

3. Trusted Access Program (โปรแกรมเข้าถึงที่เชื่อถือได้)
สำหรับนักพัฒนาที่ทำงาน Security จริงๆ สามารถขอสิทธิ์เพิ่มได้

Trusted Cyber Access — สำหรับ Security Professionals
วิธีขอสิทธิ์

รายบุคคล:
ยืนยันตัวตนที่ chatgpt.com/cyber

ระดับองค์กร:
ติดต่อ OpenAI representative เพื่อขอ Team-wide access

Advanced Researchers:
มี Invite-only program สำหรับ Security researcher ที่ต้องการ Model ที่มีความสามารถสูงขึ้น

ข้อกำหนด

ผู้ที่ได้รับสิทธิ์ยังต้องปฏิบัติตาม:

OpenAI Usage Policies (นโยบายการใช้งาน)
Terms of Use ทั้งหมด
False Positives (การแจ้งเตือนผิดพลาด)

บางครั้ง Legitimate security work (งาน security ที่ถูกกฎหมาย) อาจถูก Flag ผิด:

Codex จะแจ้งใน-product เมื่อถูก Reroute
รายงานผ่าน /feedback command ใน CLI
OpenAI กำลังปรับจาก Account-level ไปเป็น Request-level safety checks
สรุป: เลือก Plan ให้เหมาะกับการใช้งาน
สำหรับ Individual Developer
ถ้าคุณ...	แนะนำ Plan
อยากลองดูก่อน	Free
ใช้เป็นครั้งคราว	Go ($8)
ใช้งานจริงทุกวัน	Plus ($20)
ใช้หนักมาก, ต้องการ Rate limit สูง	Pro ($100+)
สำหรับทีม/องค์กร
ถ้าทีม...	แนะนำ Plan
ต้องการ SSO, MFA	Business
ต้องการ Audit Logs, Data Residency	Enterprise
เป็นสถาบันการศึกษา	Edu (ติดต่อ Sales)
Tips การประหยัด Credits
ใช้ GPT-5.4-mini สำหรับงาน Exploration และ Simple tasks
Enable Context Caching (เปิดใช้การแคชบริบท — ลดค่าใช้จ่ายเมื่อส่งข้อมูลเดิมซ้ำ) — Cached input ถูกกว่า 10x
แบ่ง Thread เมื่องานไม่เกี่ยวกัน เพื่อลด Context ที่ไม่จำเป็น
ใช้ Fast Mode เฉพาะเมื่อจำเป็น เพราะใช้ Credits มากกว่า
Subagents ด้วย mini สำหรับ Read-heavy tasks ที่ไม่ต้องการ Reasoning สูง
 ก่อนหน้า
Subagents และ Models — การเลือก Model และใช้ Parallel Agents
ถัดไป
```


---

## Beginner Guide

### Codex

Source: daily-ai-lab-ai-tools-32page-beginner-guide.docx

![Codex](assets/codex.png)

**หมวด:** Chat / Agent / Coding / App
**บทเรียนใน /docs:** 11 หน้า

**ใช้ทำอะไร**
Codex คือ Coding Agent (ตัวแทน AI สำหรับงานพัฒนาซอฟต์แวร์) โดย OpenAI ออกแบบมาเพื่อช่วยนักพัฒนาและทีม Engineering ทำงานเขียนโค้ด ท

**พื้นฐานที่ควรรู้**
พื้นฐานที่ควรรู้คือ prompt, context, file, workspace, และการตรวจผลลัพธ์ก่อนนำไปใช้งานจริง. มือใหม่ควรเริ่มจากงานเล็กที่วัดผลได้ เช่น สรุปเอกสาร แก้โค้ดสั้น ๆ หรือทำต้นแบบหน้าเว็บหนึ่งหน้า

**เหมาะกับมือใหม่แบบไหน**
เหมาะกับ developer ที่ต้องการผู้ช่วยทำงานเชิงวิศวกรรมแบบต่อเนื่อง ไม่ใช่แค่ตอบคำถามสั้น ๆ.

**วิธีเริ่มแบบสั้น**
1. เปิด workspace หรือแชท แล้วให้โจทย์เดียวที่ชัดเจนพร้อมบริบทที่จำเป็น
2. แนบไฟล์ ตัวอย่าง หรือเป้าหมายที่อยากได้ เพื่อให้โมเดลอ่านภาพรวมได้เร็ว
3. ตรวจผลลัพธ์รอบแรก แล้วให้แก้แบบเฉพาะจุด เช่น tone, logic, code style หรือ structure

**ราคา/Plan**
Access is tied to ChatGPT/Codex plans; public pricing shows Plus $20/month and Pro from $100/month.

**สิ่งที่ควรจำ**
- จุดแข็ง: เหมาะกับ developer ที่ต้องการผู้ช่วยทำงานเชิงวิศวกรรมแบบต่อเนื่อง ไม่ใช่แค่ตอบคำถามสั้น ๆ.
- ข้อควรระวัง: ระวัง prompt ที่กว้างเกินไปและตรวจโค้ดหรือเอกสารทุกครั้งก่อนนำไปใช้จริง.

**ตัวอย่างเริ่มต้น**
ตัวอย่างงานเริ่มต้น: ตรวจโค้ดชุดนี้ หา bug ที่อาจกระทบ production และเสนอ patch ที่เล็กที่สุด

---

---

<!-- merged-beginner-guide:Codex -->
## คู่มือพื้นฐานของ Codex

**หมวด:** Chat / Agent / Coding / App
**บทเรียนใน /docs:** 11 หน้า

**ใช้ทำอะไร**
Codex คือ Coding Agent (ตัวแทน AI สำหรับงานพัฒนาซอฟต์แวร์) โดย OpenAI ออกแบบมาเพื่อช่วยนักพัฒนาและทีม Engineering ทำงานเขียนโค้ด ท

**พื้นฐานที่ควรรู้**
พื้นฐานที่ควรรู้คือ prompt, context, file, workspace, และการตรวจผลลัพธ์ก่อนนำไปใช้งานจริง. มือใหม่ควรเริ่มจากงานเล็กที่วัดผลได้ เช่น สรุปเอกสาร แก้โค้ดสั้น ๆ หรือทำต้นแบบหน้าเว็บหนึ่งหน้า

**เหมาะกับมือใหม่แบบไหน**
เหมาะกับ developer ที่ต้องการผู้ช่วยทำงานเชิงวิศวกรรมแบบต่อเนื่อง ไม่ใช่แค่ตอบคำถามสั้น ๆ.

**วิธีเริ่มแบบสั้น**
1. เปิด workspace หรือแชท แล้วให้โจทย์เดียวที่ชัดเจนพร้อมบริบทที่จำเป็น
2. แนบไฟล์ ตัวอย่าง หรือเป้าหมายที่อยากได้ เพื่อให้โมเดลอ่านภาพรวมได้เร็ว
3. ตรวจผลลัพธ์รอบแรก แล้วให้แก้แบบเฉพาะจุด เช่น tone, logic, code style หรือ structure

**ราคา/Plan**
Access is tied to ChatGPT/Codex plans; public pricing shows Plus $20/month and Pro from $100/month.

**สิ่งที่ควรจำ**
- จุดแข็ง: เหมาะกับ developer ที่ต้องการผู้ช่วยทำงานเชิงวิศวกรรมแบบต่อเนื่อง ไม่ใช่แค่ตอบคำถามสั้น ๆ.
- ข้อควรระวัง: ระวัง prompt ที่กว้างเกินไปและตรวจโค้ดหรือเอกสารทุกครั้งก่อนนำไปใช้จริง.

**ตัวอย่างเริ่มต้น**
ตัวอย่างงานเริ่มต้น: ตรวจโค้ดชุดนี้ หา bug ที่อาจกระทบ production และเสนอ patch ที่เล็กที่สุด

---

![Cursor](assets/cursor.png)
