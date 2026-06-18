(function () {
  const categories = [
    "ทั้งหมด",
    "Chat AI & Research",
    "Coding / IDE",
    "Builder / Automation",
    "Image / Design",
    "Video",
    "Voice / Music",
    "Platform / Model Hub",
  ];

  const tools = [
    {
      name: "ChatGPT",
      slug: "chatgpt",
      category: "Chat AI & Research",
      logoPath: "word/daily-ai-lab-full-extract/assets/chatgpt.png",
      sourceHref: "https://ailab.learnnakdev.online/docs/chatgpt",
      file: "04-chatgpt.md",
      pagesCaptured: 14,
      summary: "ผู้ช่วย AI อเนกประสงค์สำหรับเขียน สรุป วิเคราะห์ วางแผน และช่วยคิดงานประจำวัน",
      bestFor: "เจ้าของธุรกิจ ทีมการตลาด นักเขียน และคนที่ต้องการผู้ช่วยคิดงาน",
      tags: ["เขียนงาน", "วิเคราะห์", "วางแผน", "แชต"],
      topics: ["เริ่มต้นใช้งาน", "ความสามารถหลัก", "การใช้ Prompt", "ข้อควรระวัง"],
      featured: 1,
    },
    {
      name: "Claude",
      slug: "claude",
      category: "Chat AI & Research",
      logoPath: "word/daily-ai-lab-full-extract/assets/claude.png",
      sourceHref: "https://ailab.learnnakdev.online/docs/claude",
      file: "05-claude.md",
      pagesCaptured: 19,
      summary: "AI สำหรับอ่านเอกสารยาว เขียนงานละเอียด และช่วยคิดเชิงกลยุทธ์แบบเป็นระบบ",
      bestFor: "คนทำเอกสาร กลยุทธ์ คอนเทนต์ยาว และงานที่ต้องการความรอบคอบ",
      tags: ["เอกสาร", "กลยุทธ์", "สรุป", "เขียนงาน"],
      topics: ["ภาพรวม Claude", "การอัปโหลดไฟล์", "การเขียนงาน", "การใช้งานกับทีม"],
      featured: 2,
    },
    {
      name: "Gemini",
      slug: "gemini",
      category: "Chat AI & Research",
      logoPath: "word/daily-ai-lab-full-extract/assets/gemini.png",
      sourceHref: "https://ailab.learnnakdev.online/docs/gemini",
      file: "10-gemini.md",
      pagesCaptured: 30,
      summary: "AI จาก Google ที่เหมาะกับการค้นหา วิเคราะห์ข้อมูล และเชื่อมงานใน ecosystem ของ Google",
      bestFor: "ผู้ใช้ Google Workspace, นักเรียน, นักการตลาด และทีมที่ต้องค้นคว้าข้อมูล",
      tags: ["Google", "ค้นหา", "Workspace", "วิเคราะห์"],
      topics: ["เริ่มใช้งาน Gemini", "เชื่อมกับ Google", "การค้นคว้า", "การใช้งานไฟล์"],
      featured: 3,
    },
    {
      name: "Grok",
      slug: "grok",
      category: "Chat AI & Research",
      logoPath: "word/daily-ai-lab-full-extract/assets/grok.png",
      sourceHref: "https://ailab.learnnakdev.online/docs/grok",
      file: "15-grok.md",
      pagesCaptured: 23,
      summary: "AI สำหรับติดตามข้อมูล กระแส และช่วยวิเคราะห์แนวคิดจากมุมมองที่รวดเร็ว",
      bestFor: "คนทำคอนเทนต์ ข่าว กระแส และการวิเคราะห์ประเด็นออนไลน์",
      tags: ["กระแส", "วิเคราะห์", "คอนเทนต์", "ค้นหา"],
      topics: ["ภาพรวม Grok", "การค้นหาข้อมูล", "ใช้กับคอนเทนต์", "ข้อจำกัด"],
      featured: 9,
    },
    {
      name: "Kimi",
      slug: "kimi",
      category: "Chat AI & Research",
      logoPath: "word/daily-ai-lab-full-extract/assets/kimi.png",
      sourceHref: "https://ailab.learnnakdev.online/docs/kimi",
      file: "19-kimi.md",
      pagesCaptured: 4,
      summary: "ผู้ช่วย AI สำหรับอ่านข้อมูลยาวและช่วยสรุปประเด็นให้เข้าใจง่าย",
      bestFor: "คนที่ต้องอ่านเอกสารหรือข้อมูลจำนวนมากแล้วต้องการสรุปเร็ว",
      tags: ["อ่านเอกสาร", "สรุป", "แชต"],
      topics: ["Kimi คืออะไร", "ใช้กับเอกสาร", "ตัวอย่างงาน", "ข้อควรระวัง"],
      featured: 20,
    },
    {
      name: "Perplexity",
      slug: "perplexity",
      category: "Chat AI & Research",
      logoPath: "word/daily-ai-lab-full-extract/assets/perplexity.png",
      sourceHref: "https://ailab.learnnakdev.online/docs/perplexity",
      file: "26-perplexity.md",
      pagesCaptured: 18,
      summary: "เครื่องมือค้นคว้าแบบ AI ที่ช่วยหาคำตอบพร้อมแหล่งอ้างอิง เหมาะกับงานวิจัยเร็ว",
      bestFor: "นักวิจัย ครีเอเตอร์ นักเรียน และคนที่ต้องการคำตอบพร้อมแหล่งข้อมูล",
      tags: ["วิจัย", "อ้างอิง", "ค้นหา", "สรุป"],
      topics: ["ค้นคว้าด้วย Perplexity", "การอ่านแหล่งอ้างอิง", "Pro Search", "ใช้กับงานจริง"],
      featured: 7,
    },
    {
      name: "Z.ai",
      slug: "z-ai",
      category: "Chat AI & Research",
      logoPath: "word/daily-ai-lab-full-extract/assets/z-ai.png",
      sourceHref: "https://ailab.learnnakdev.online/docs/z-ai",
      file: "32-z-ai.md",
      pagesCaptured: 13,
      summary: "AI chat และโมเดลสำหรับงานคิด วิเคราะห์ และทดลอง workflow ใหม่ ๆ",
      bestFor: "ผู้ใช้ที่อยากลองเครื่องมือ AI ทางเลือกและเปรียบเทียบโมเดล",
      tags: ["แชต", "โมเดล", "ทดลอง"],
      topics: ["ภาพรวม Z.ai", "จุดเด่น", "การใช้งาน", "เปรียบเทียบ"],
      featured: 26,
    },
    {
      name: "Codex",
      slug: "codex",
      category: "Coding / IDE",
      logoPath: "word/daily-ai-lab-full-extract/assets/codex.png",
      sourceHref: "https://ailab.learnnakdev.online/docs/codex",
      file: "06-codex.md",
      pagesCaptured: 11,
      summary: "ผู้ช่วยเขียนโค้ดและจัดการโปรเจกต์ที่ช่วยอ่านไฟล์ วางแผน แก้โค้ด และตรวจงาน",
      bestFor: "นักพัฒนา เจ้าของโปรเจกต์ และทีมที่ต้องการให้ AI ช่วยงานโค้ดจริง",
      tags: ["โค้ด", "โปรเจกต์", "อัตโนมัติ"],
      topics: ["Codex คืออะไร", "การแก้ไฟล์", "การทดสอบ", "workflow ทำงานจริง"],
      featured: 5,
    },
    {
      name: "Cursor",
      slug: "cursor",
      category: "Coding / IDE",
      logoPath: "word/daily-ai-lab-full-extract/assets/cursor.png",
      sourceHref: "https://ailab.learnnakdev.online/docs/cursor",
      file: "07-cursor.md",
      pagesCaptured: 6,
      summary: "IDE สำหรับเขียนโค้ดร่วมกับ AI ช่วยเข้าใจโปรเจกต์และแก้หลายไฟล์ได้เร็วขึ้น",
      bestFor: "นักพัฒนาเว็บ แอป และคนที่อยากใช้ AI ใน coding workflow",
      tags: ["IDE", "โค้ด", "แก้ไฟล์"],
      topics: ["เริ่มใช้ Cursor", "Chat กับโค้ด", "แก้หลายไฟล์", "ข้อควรระวัง"],
      featured: 11,
    },
    {
      name: "Windsurf",
      slug: "windsurf",
      category: "Coding / IDE",
      logoPath: "word/daily-ai-lab-full-extract/assets/windsurf.png",
      sourceHref: "https://ailab.learnnakdev.online/docs/windsurf",
      file: "31-windsurf.md",
      pagesCaptured: 6,
      summary: "เครื่องมือเขียนโค้ดด้วย AI ที่เน้น workflow ต่อเนื่องและช่วยทำงานในโปรเจกต์",
      bestFor: "นักพัฒนาที่อยากให้ AI ช่วยเขียน แก้ และอธิบายโค้ดใน IDE",
      tags: ["IDE", "โค้ด", "AI agent"],
      topics: ["Windsurf คืออะไร", "workflow", "ใช้กับโปรเจกต์", "การตรวจงาน"],
      featured: 19,
    },
    {
      name: "Replit",
      slug: "replit",
      category: "Coding / IDE",
      logoPath: "word/daily-ai-lab-full-extract/assets/replit.png",
      sourceHref: "https://ailab.learnnakdev.online/docs/replit",
      file: "27-replit.md",
      pagesCaptured: 4,
      summary: "แพลตฟอร์มเขียนโค้ดออนไลน์ที่ช่วยสร้าง ทดลอง และ deploy โปรเจกต์ได้ในที่เดียว",
      bestFor: "ผู้เริ่มต้นเขียนเว็บ นักเรียน และคนที่อยากทดลอง prototype อย่างรวดเร็ว",
      tags: ["โค้ดออนไลน์", "deploy", "prototype"],
      topics: ["เริ่มใช้ Replit", "สร้างโปรเจกต์", "ใช้ AI ช่วยโค้ด", "แชร์งาน"],
      featured: 23,
    },
    {
      name: "Google Jules",
      slug: "google-jules",
      category: "Coding / IDE",
      logoPath: "word/daily-ai-lab-full-extract/assets/google-jules.png",
      sourceHref: "https://ailab.learnnakdev.online/docs/google-jules",
      file: "13-google-jules.md",
      pagesCaptured: 4,
      summary: "ผู้ช่วย coding agent จาก Google สำหรับช่วยวิเคราะห์และทำงานกับโค้ด",
      bestFor: "ทีมพัฒนาและผู้ที่ติดตามเครื่องมือ coding agent รุ่นใหม่",
      tags: ["Google", "coding agent", "โค้ด"],
      topics: ["Jules คืออะไร", "เหมาะกับใคร", "workflow", "ข้อจำกัด"],
      featured: 22,
    },
    {
      name: "Ollama",
      slug: "ollama",
      category: "Coding / IDE",
      logoPath: "word/daily-ai-lab-full-extract/assets/ollama.png",
      sourceHref: "https://ailab.learnnakdev.online/docs/ollama",
      file: "23-ollama.md",
      pagesCaptured: 4,
      summary: "เครื่องมือรันโมเดล AI บนเครื่องตัวเอง เหมาะกับงานทดลองและงานที่อยากควบคุมข้อมูล",
      bestFor: "นักพัฒนา ทีมเทคนิค และคนที่อยากลอง local AI",
      tags: ["local AI", "โมเดล", "developer", "platform"],
      topics: ["ติดตั้ง Ollama", "รันโมเดล", "ใช้งานกับแอป", "ข้อควรระวัง"],
      featured: 13,
    },
    {
      name: "Antigravity",
      slug: "antigravity",
      category: "Builder / Automation",
      logoPath: "word/daily-ai-lab-full-extract/assets/antigravity.png",
      sourceHref: "https://ailab.learnnakdev.online/docs/antigravity",
      file: "01-antigravity.md",
      pagesCaptured: 4,
      summary: "เครื่องมือสาย builder/automation สำหรับสร้าง workflow และงานดิจิทัลด้วย AI",
      bestFor: "คนทำระบบ ทีม automation และผู้สร้างเครื่องมือภายใน",
      tags: ["automation", "builder", "workflow"],
      topics: ["Antigravity คืออะไร", "ใช้ทำอะไร", "workflow ตัวอย่าง", "เริ่มต้น"],
      featured: 28,
    },
    {
      name: "Base44",
      slug: "base44",
      category: "Builder / Automation",
      logoPath: "word/daily-ai-lab-full-extract/assets/base44.png",
      sourceHref: "https://ailab.learnnakdev.online/docs/base44",
      file: "02-base44.md",
      pagesCaptured: 4,
      summary: "เครื่องมือสร้างแอปหรือระบบจากไอเดีย เหมาะกับการทำ prototype อย่างรวดเร็ว",
      bestFor: "เจ้าของธุรกิจที่อยากทดลองไอเดียแอปก่อนลงทุนพัฒนาเต็มระบบ",
      tags: ["app builder", "prototype", "no-code"],
      topics: ["Base44 คืออะไร", "สร้างแอป", "ข้อดีข้อจำกัด", "ตัวอย่างใช้งาน"],
      featured: 24,
    },
    {
      name: "Bolt",
      slug: "bolt",
      category: "Builder / Automation",
      logoPath: "word/daily-ai-lab-full-extract/assets/bolt.png",
      sourceHref: "https://ailab.learnnakdev.online/docs/bolt",
      file: "03-bolt.md",
      pagesCaptured: 4,
      summary: "AI builder สำหรับสร้างเว็บหรือแอปจาก prompt และทดลองไอเดียได้เร็ว",
      bestFor: "ผู้ประกอบการ นักออกแบบ และนักพัฒนาที่ต้องการ prototype หน้าเว็บ",
      tags: ["web builder", "prototype", "prompt"],
      topics: ["เริ่มใช้ Bolt", "สร้างเว็บจาก prompt", "แก้ UI", "deploy"],
      featured: 15,
    },
    {
      name: "Lovable",
      slug: "lovable",
      category: "Builder / Automation",
      logoPath: "word/daily-ai-lab-full-extract/assets/lovable.png",
      sourceHref: "https://ailab.learnnakdev.online/docs/lovable",
      file: "21-lovable.md",
      pagesCaptured: 4,
      summary: "แพลตฟอร์มสร้างเว็บ/แอปด้วย AI เหมาะกับการเปลี่ยนไอเดียเป็นหน้าจอใช้งานจริง",
      bestFor: "เจ้าของสินค้า ทีม startup และคนที่ต้องการ MVP อย่างรวดเร็ว",
      tags: ["MVP", "web app", "builder"],
      topics: ["Lovable คืออะไร", "สร้างโปรเจกต์", "แก้ UI", "เชื่อมระบบ"],
      featured: 12,
    },
    {
      name: "Google AI Studio",
      slug: "google-ai-studio",
      category: "Builder / Automation",
      logoPath: "word/daily-ai-lab-full-extract/assets/google-ai-studio.png",
      sourceHref: "https://ailab.learnnakdev.online/docs/google-ai-studio",
      file: "11-google-ai-studio.md",
      pagesCaptured: 4,
      summary: "พื้นที่ทดลองโมเดล Gemini และสร้าง prototype AI จาก Google",
      bestFor: "นักพัฒนา ทีมทดลอง AI และคนที่อยากสร้างแอปจากโมเดล Google",
      tags: ["Gemini", "prototype", "API"],
      topics: ["เริ่มใช้ AI Studio", "ทดลอง prompt", "สร้าง API", "ข้อควรระวัง"],
      featured: 16,
    },
    {
      name: "OpenClaw",
      slug: "openclaw",
      category: "Builder / Automation",
      logoPath: "word/daily-ai-lab-full-extract/assets/openclaw.png",
      sourceHref: "https://ailab.learnnakdev.online/docs/openclaw",
      file: "24-openclaw.md",
      pagesCaptured: 7,
      summary: "เครื่องมือแนว agent/automation สำหรับทดลอง workflow และการทำงานอัตโนมัติ",
      bestFor: "ทีมเทคนิคและคนที่สนใจสร้าง agent ช่วยงาน",
      tags: ["agent", "automation", "workflow"],
      topics: ["OpenClaw คืออะไร", "agent workflow", "ใช้กับงานจริง", "ข้อจำกัด"],
      featured: 25,
    },
    {
      name: "Hermes",
      slug: "hermes",
      category: "Builder / Automation",
      logoPath: "word/daily-ai-lab-full-extract/assets/hermes.png",
      sourceHref: "https://ailab.learnnakdev.online/docs/hermes",
      file: "16-hermes.md",
      pagesCaptured: 8,
      summary: "เครื่องมือในกลุ่ม AI workflow/agent ที่ช่วยทดลองการทำงานอัตโนมัติ",
      bestFor: "ผู้ใช้สายเทคนิคที่ต้องการสำรวจ workflow ใหม่",
      tags: ["agent", "workflow", "automation"],
      topics: ["Hermes คืออะไร", "การใช้งาน", "workflow", "ข้อควรระวัง"],
      featured: 27,
    },
    {
      name: "DALL·E",
      slug: "dall-e",
      category: "Image / Design",
      logoPath: "word/daily-ai-lab-full-extract/assets/dall-e.png",
      sourceHref: "https://ailab.learnnakdev.online/docs/dall-e",
      file: "08-dall-e.md",
      pagesCaptured: 13,
      summary: "เครื่องมือสร้างภาพด้วย AI เหมาะกับภาพประกอบ ไอเดียสินค้า และงานครีเอทีฟ",
      bestFor: "ครีเอเตอร์ นักการตลาด และเจ้าของร้านที่ต้องการภาพโปรโมท",
      tags: ["สร้างภาพ", "ออกแบบ", "ครีเอทีฟ"],
      topics: ["DALL·E คืออะไร", "เขียน prompt ภาพ", "แก้ภาพ", "ข้อจำกัด"],
      featured: 8,
    },
    {
      name: "Midjourney",
      slug: "midjourney",
      category: "Image / Design",
      logoPath: "word/daily-ai-lab-full-extract/assets/midjourney.png",
      sourceHref: "https://ailab.learnnakdev.online/docs/midjourney",
      file: "22-midjourney.md",
      pagesCaptured: 56,
      summary: "AI สร้างภาพคุณภาพสูงสำหรับงานโฆษณา ภาพสินค้า คอนเซปต์อาร์ต และครีเอทีฟมืออาชีพ",
      bestFor: "แบรนด์ ร้านค้า นักออกแบบ และคนทำภาพโปรโมท",
      tags: ["สร้างภาพ", "โฆษณา", "สินค้า", "ดีไซน์"],
      topics: ["เริ่มใช้ Midjourney", "เขียน prompt", "สไตล์ภาพ", "แผนราคาและ workflow"],
      featured: 4,
    },
    {
      name: "Google Stitch",
      slug: "google-stitch",
      category: "Image / Design",
      logoPath: "word/daily-ai-lab-full-extract/assets/google-stitch.png",
      sourceHref: "https://ailab.learnnakdev.online/docs/google-stitch",
      file: "14-google-stitch.md",
      pagesCaptured: 4,
      summary: "เครื่องมือช่วยออกแบบ UI/ภาพแนว product interface จาก Google",
      bestFor: "นักออกแบบเว็บ ทีม product และคนที่ต้องการ mockup เร็ว",
      tags: ["UI", "design", "Google"],
      topics: ["Stitch คืออะไร", "สร้าง UI", "ใช้งานกับทีม", "ข้อจำกัด"],
      featured: 17,
    },
    {
      name: "Google Flow",
      slug: "google-flow",
      category: "Video",
      logoPath: "word/daily-ai-lab-full-extract/assets/google-flow.png",
      sourceHref: "https://ailab.learnnakdev.online/docs/google-flow",
      file: "12-google-flow.md",
      pagesCaptured: 4,
      summary: "เครื่องมือสายวิดีโอจาก Google สำหรับ workflow สร้างคลิปด้วย AI",
      bestFor: "ครีเอเตอร์และทีมวิดีโอที่ต้องการทดลอง production workflow ใหม่",
      tags: ["วิดีโอ", "Google", "workflow"],
      topics: ["Flow คืออะไร", "สร้างวิดีโอ", "workflow", "ข้อควรระวัง"],
      featured: 18,
    },
    {
      name: "Kling AI",
      slug: "kling-ai",
      category: "Video",
      logoPath: "word/daily-ai-lab-full-extract/assets/kling-ai.png",
      sourceHref: "https://ailab.learnnakdev.online/docs/kling-ai",
      file: "20-kling-ai.md",
      pagesCaptured: 16,
      summary: "AI สร้างวิดีโอจาก prompt หรือภาพ เหมาะกับคลิปโปรโมทและคอนเทนต์สั้น",
      bestFor: "เจ้าของธุรกิจ ครีเอเตอร์ และทีมโฆษณาที่ต้องการคลิปเร็ว",
      tags: ["วิดีโอ", "คอนเทนต์", "โฆษณา"],
      topics: ["เริ่มใช้ Kling", "Text-to-video", "Image-to-video", "เทคนิค prompt"],
      featured: 10,
    },
    {
      name: "Seedance",
      slug: "seedance",
      category: "Video",
      logoPath: "word/daily-ai-lab-full-extract/assets/seedance.png",
      sourceHref: "https://ailab.learnnakdev.online/docs/seedance",
      file: "29-seedance.md",
      pagesCaptured: 5,
      summary: "เครื่องมือสร้างวิดีโอ AI สำหรับงานภาพเคลื่อนไหวและคอนเทนต์สั้น",
      bestFor: "คนทำคอนเทนต์และทีมที่อยากทดลองวิดีโอ AI",
      tags: ["วิดีโอ", "animation", "AI"],
      topics: ["Seedance คืออะไร", "สร้างคลิป", "ใช้ภาพอ้างอิง", "ข้อจำกัด"],
      featured: 21,
    },
    {
      name: "Runway",
      slug: "runway",
      category: "Video",
      logoPath: "word/daily-ai-lab-full-extract/assets/runway.png",
      sourceHref: "https://ailab.learnnakdev.online/docs/runway",
      file: "28-runway.md",
      pagesCaptured: 20,
      summary: "แพลตฟอร์มสร้างและแก้ไขวิดีโอด้วย AI สำหรับงานครีเอทีฟและโฆษณา",
      bestFor: "วิดีโอครีเอเตอร์ ทีมโปรดักชัน และแบรนด์ที่ทำโฆษณา",
      tags: ["วิดีโอ", "ตัดต่อ", "ครีเอทีฟ"],
      topics: ["Runway คืออะไร", "สร้างวิดีโอ", "แก้วิดีโอ", "workflow งานจริง"],
      featured: 6,
    },
    {
      name: "HeyGen",
      slug: "heygen",
      category: "Video",
      logoPath: "word/daily-ai-lab-full-extract/assets/heygen.png",
      sourceHref: "https://ailab.learnnakdev.online/docs/heygen",
      file: "17-heygen.md",
      pagesCaptured: 6,
      summary: "AI สำหรับสร้างวิดีโอ avatar พูดแทนคนจริง เหมาะกับคอร์ส โฆษณา และสื่อองค์กร",
      bestFor: "ทีมอบรม เจ้าของคอร์ส และธุรกิจที่ต้องการวิดีโอ presenter",
      tags: ["avatar", "วิดีโอ", "พรีเซนต์"],
      topics: ["HeyGen คืออะไร", "สร้าง avatar", "แปลภาษา", "ใช้กับธุรกิจ"],
      featured: 14,
    },
    {
      name: "ElevenLabs",
      slug: "elevenlabs",
      category: "Voice / Music",
      logoPath: "word/daily-ai-lab-full-extract/assets/elevenlabs.png",
      sourceHref: "https://ailab.learnnakdev.online/docs/elevenlabs",
      file: "09-elevenlabs.md",
      pagesCaptured: 6,
      summary: "เครื่องมือเสียง AI สำหรับสร้างเสียงพากย์ อ่านสคริปต์ และงาน voiceover",
      bestFor: "ครีเอเตอร์ เจ้าของคอร์ส และทีมวิดีโอที่ต้องใช้เสียงพากย์",
      tags: ["เสียง", "พากย์", "voiceover"],
      topics: ["เริ่มใช้ ElevenLabs", "สร้างเสียง", "เสียงหลายภาษา", "ข้อควรระวัง"],
      featured: 18,
    },
    {
      name: "Suno",
      slug: "suno",
      category: "Voice / Music",
      logoPath: "word/daily-ai-lab-full-extract/assets/suno.png",
      sourceHref: "https://ailab.learnnakdev.online/docs/suno",
      file: "30-suno.md",
      pagesCaptured: 20,
      summary: "AI สร้างเพลงและเสียงดนตรีจาก prompt เหมาะกับคอนเทนต์ แคมเปญ และไอเดียเสียง",
      bestFor: "ครีเอเตอร์ นักการตลาด และคนที่ต้องการเพลงประกอบเร็ว",
      tags: ["เพลง", "เสียง", "คอนเทนต์"],
      topics: ["Suno คืออะไร", "สร้างเพลง", "เขียน prompt เพลง", "การใช้งานเชิงพาณิชย์"],
      featured: 11,
    },
    {
      name: "Hugging Face",
      slug: "hugging-face",
      category: "Platform / Model Hub",
      logoPath: "word/daily-ai-lab-full-extract/assets/hugging-face.png",
      sourceHref: "https://ailab.learnnakdev.online/docs/hugging-face",
      file: "18-hugging-face.md",
      pagesCaptured: 4,
      summary: "ศูนย์รวมโมเดล AI, datasets และเครื่องมือสำหรับนักพัฒนาและคนทดลอง AI",
      bestFor: "นักพัฒนา นักวิจัย และทีมที่ต้องเลือกโมเดล AI",
      tags: ["model hub", "dataset", "developer"],
      topics: ["Hugging Face คืออะไร", "ค้นหาโมเดล", "Spaces", "การนำไปใช้"],
      featured: 18,
    },
    {
      name: "OpenRouter",
      slug: "openrouter",
      category: "Platform / Model Hub",
      logoPath: "word/daily-ai-lab-full-extract/assets/openrouter.png",
      sourceHref: "https://ailab.learnnakdev.online/docs/openrouter",
      file: "25-openrouter.md",
      pagesCaptured: 4,
      summary: "แพลตฟอร์มรวมการเข้าถึงโมเดลหลายค่ายผ่าน API เดียว เหมาะกับการทดลองและเปรียบเทียบ",
      bestFor: "นักพัฒนาและทีมที่ต้องการเลือกโมเดลตามต้นทุน/ความสามารถ",
      tags: ["API", "model router", "developer"],
      topics: ["OpenRouter คืออะไร", "เลือกโมเดล", "ตั้งค่า API", "ข้อควรระวัง"],
      featured: 24,
    },
  ];

  const categoryLabels = {
    "Chat AI & Research": "แชต / ค้นคว้า",
    "Coding / IDE": "โค้ด / IDE",
    "Builder / Automation": "Builder / Automation",
    "Image / Design": "ภาพ / ดีไซน์",
    Video: "วิดีโอ",
    "Voice / Music": "เสียง / เพลง",
    "Platform / Model Hub": "แพลตฟอร์ม / โมเดล",
  };

  const logoFiles = {
    antigravity: "Antigravity.png",
    base44: "Base44.png",
    bolt: "Bolt.png",
    chatgpt: "ChatGPT.png",
    claude: "Claude.png",
    codex: "Codex.png",
    cursor: "Cursor.png",
    "dall-e": "DALL·E.png",
    elevenlabs: "ElevenLabs.png",
    gemini: "Gemini.png",
    "google-ai-studio": "Google AI Studio.png",
    "google-flow": "Google Flow.png",
    "google-jules": "Google Jules.png",
    "google-stitch": "Google Stitch.png",
    grok: "Grok.png",
    hermes: "Hermes.png",
    heygen: "HeyGen.png",
    "hugging-face": "Hugging Face.png",
    kimi: "Kimi.png",
    "kling-ai": "Kling AI.png",
    lovable: "Lovable.png",
    midjourney: "Midjourney.png",
    ollama: "Ollama.png",
    openclaw: "OpenClaw.png",
    openrouter: "OpenRouter.png",
    perplexity: "Perplexity.png",
    replit: "Replit.png",
    runway: "Runway.png",
    seedance: "Seedance.png",
    suno: "Suno.png",
    windsurf: "Windsurf.png",
    "z-ai": "Z.ai.png",
  };

  tools.forEach((tool) => {
    if (logoFiles[tool.slug]) tool.logoPath = `assets/ai-tool-logos/${logoFiles[tool.slug]}`;
  });

  const articleCache = new Map();

  const state = {
    query: "",
    category: "ทั้งหมด",
    sort: "featured",
    selectedSlug: new URLSearchParams(window.location.search).get("tool") || "chatgpt",
    expandedSlug: new URLSearchParams(window.location.search).get("tool") || "",
    readMode: new URLSearchParams(window.location.search).get("read") === "1",
    articlePage: Math.max(1, Number(new URLSearchParams(window.location.search).get("page")) || 1),
  };

  const articleGrid = document.querySelector("#articleGrid");
  const readerPanel = document.querySelector("#readerPanel");
  const filters = document.querySelector("#categoryFilters");
  const search = document.querySelector("#articleSearch");
  const sort = document.querySelector("#articleSort");
  const resultCount = document.querySelector("#resultCount");
  const empty = document.querySelector("#articleEmpty");
  const clearButtons = [document.querySelector("#clearFilters"), document.querySelector("[data-clear-empty]")].filter(Boolean);

  function bySlug(slug) {
    return tools.find((tool) => tool.slug === slug) || tools[0];
  }

  function matches(tool) {
    const haystack = [tool.name, tool.category, tool.summary, tool.bestFor, tool.tags.join(" "), tool.topics.join(" ")].join(" ").toLowerCase();
    const categoryOk = state.category === "ทั้งหมด" || tool.category === state.category;
    const queryOk = !state.query || haystack.includes(state.query.toLowerCase());
    return categoryOk && queryOk;
  }

  function sortTools(list) {
    return [...list].sort((a, b) => {
      if (state.sort === "az") return a.name.localeCompare(b.name);
      if (state.sort === "docs-desc") return b.pagesCaptured - a.pagesCaptured;
      if (state.sort === "docs-asc") return a.pagesCaptured - b.pagesCaptured;
      if (state.sort === "category") return a.category.localeCompare(b.category) || a.name.localeCompare(b.name);
      return a.featured - b.featured || a.name.localeCompare(b.name);
    });
  }

  function escapeHtml(value) {
    return value
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function cleanMarkdown(raw) {
    return raw
      .replace(/\r\n/g, "\n")
      .replace(/^Source:.*$/gm, "")
      .replace(/^Pages captured:.*$/gm, "")
      .replace(/```(?:text)?/g, "")
      .replace(/^## Page \d+.*$/gm, "")
      .replace(/^หน้า \d+ \/ \d+$/gm, "")
      .replace(/\n{3,}/g, "\n\n")
      .trim();
  }

  function markdownToHtml(raw) {
    const lines = cleanMarkdown(raw).split("\n");
    let html = "";
    let inList = false;

    function closeList() {
      if (!inList) return;
      html += "</ul>";
      inList = false;
    }

    for (const originalLine of lines) {
      const line = originalLine.trim();
      if (!line) {
        closeList();
        continue;
      }

      const heading = line.match(/^(#{1,4})\s+(.+)$/);
      if (heading) {
        closeList();
        const level = Math.min(heading[1].length + 1, 4);
        html += `<h${level}>${escapeHtml(heading[2])}</h${level}>`;
        continue;
      }

      const bullet = line.match(/^[-*]\s+(.+)$/) || line.match(/^\d+\.\s+(.+)$/);
      if (bullet) {
        if (!inList) {
          html += "<ul>";
          inList = true;
        }
        html += `<li>${escapeHtml(bullet[1])}</li>`;
        continue;
      }

      closeList();
      html += `<p>${escapeHtml(line)}</p>`;
    }

    closeList();
    return html;
  }

  function articleTitleFromChunk(chunk, fallback) {
    const line = cleanMarkdown(chunk)
      .split("\n")
      .map((item) => item.replace(/^#+\s*/, "").trim())
      .find((item) => item && !item.startsWith("Source:") && !item.startsWith("Pages captured:"));
    return line || fallback;
  }

  function parseArticlePages(raw) {
    const normalized = raw.replace(/\r\n/g, "\n");
    let chunks = normalized
      .split(/^## Page \d+.*$/gm)
      .map((chunk) => chunk.trim())
      .filter((chunk) => cleanMarkdown(chunk).length > 80);

    if (!chunks.length) chunks = [normalized];

    return chunks.map((chunk, index) => ({
      title: articleTitleFromChunk(chunk, `หน้า ${index + 1}`),
      html: markdownToHtml(chunk),
    }));
  }

  function renderArticlePager(pages) {
    const pager = document.querySelector("#articlePager");
    if (!pager) return;

    const current = Math.min(Math.max(state.articlePage, 1), pages.length);
    const options = pages
      .map((page, index) => {
        const pageNumber = index + 1;
        const selected = pageNumber === current ? " selected" : "";
        const title = page.title.length > 70 ? `${page.title.slice(0, 70)}...` : page.title;
        return `<option value="${pageNumber}"${selected}>หน้า ${pageNumber}: ${escapeHtml(title)}</option>`;
      })
      .join("");

    pager.hidden = pages.length <= 1;
    pager.innerHTML = `
      <button class="dark-outline-button" type="button" data-page-prev ${current <= 1 ? "disabled" : ""}>← ก่อนหน้า</button>
      <label>
        <span>เลือกหน้า</span>
        <select id="articlePageSelect" aria-label="เลือกหน้าบทความ">${options}</select>
      </label>
      <strong>หน้า ${current} / ${pages.length}</strong>
      <button class="orange-button" type="button" data-page-next ${current >= pages.length ? "disabled" : ""}>ถัดไป →</button>
    `;
  }

  async function loadArticle(tool) {
    const body = document.querySelector("#articleBody");
    if (!body) return;
    body.hidden = false;
    body.innerHTML = `<p class="article-loading">กำลังโหลดเนื้อหาจากไฟล์ ${tool.file}...</p>`;

    try {
      if (!articleCache.has(tool.slug)) {
        const response = await fetch(`word/daily-ai-lab-full-extract/${tool.file}`);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        articleCache.set(tool.slug, parseArticlePages(await response.text()));
      }
      const pages = articleCache.get(tool.slug);
      state.articlePage = Math.min(Math.max(state.articlePage, 1), pages.length);
      updateUrl();
      renderArticlePager(pages);
      body.innerHTML = pages[state.articlePage - 1].html;
    } catch {
      body.innerHTML = `
        <p class="article-loading">
          โหลดเนื้อหาไม่ได้ กรุณาเปิดผ่าน local server หรือ GitHub Pages เช่น http://127.0.0.1:5173/articles.html
        </p>
      `;
    }
  }

  function applyReadMode() {
    document.body.classList.toggle("article-read-mode", state.readMode);
  }

  function renderFilters() {
    filters.innerHTML = categories
      .map((category) => {
        const label = category === "ทั้งหมด" ? "ทั้งหมด" : categoryLabels[category];
        const active = state.category === category ? " active" : "";
        return `<button class="filter-chip${active}" type="button" data-category="${category}">${label}</button>`;
      })
      .join("");
  }

  function renderCards() {
    const list = sortTools(tools.filter(matches));
    articleGrid.innerHTML = list
      .map((tool) => {
        const active = tool.slug === state.selectedSlug ? " active" : "";
        const tags = tool.tags.slice(0, 3).map((tag) => `<span>${tag}</span>`).join("");
        return `
          <article class="article-card${active}" data-slug="${tool.slug}">
            <button class="article-card-button" type="button" aria-label="ดูรายละเอียด ${tool.name}">
              <img src="${tool.logoPath}" alt="" />
              <span class="article-category">${categoryLabels[tool.category]}</span>
              <h3>${tool.name}</h3>
              <p>${tool.summary}</p>
              <div class="article-card-meta">
                <strong>${tool.pagesCaptured}</strong><span>เอกสาร</span>
              </div>
              <div class="article-tags">${tags}</div>
            </button>
          </article>
        `;
      })
      .join("");
    resultCount.textContent = `${list.length} รายการ`;
    empty.hidden = list.length > 0;

    if (list.length && !list.some((tool) => tool.slug === state.selectedSlug)) {
      state.selectedSlug = list[0].slug;
      renderReader();
      highlightSelected();
    }
  }

  function highlightSelected() {
    document.querySelectorAll(".article-card").forEach((card) => {
      card.classList.toggle("active", card.dataset.slug === state.selectedSlug);
    });
  }

  function renderReader() {
    const tool = bySlug(state.selectedSlug);
    const topics = tool.topics.map((topic, index) => `<li><span>${index + 1}</span>${topic}</li>`).join("");
    const tags = tool.tags.map((tag) => `<span>${tag}</span>`).join("");
    const expanded = state.readMode || state.expandedSlug === tool.slug;
    readerPanel.className = state.readMode ? "reader-panel reader-mode-panel" : "reader-panel";
    readerPanel.innerHTML = `
      ${
        state.readMode
          ? `<div class="reader-mode-toolbar">
              <button class="dark-outline-button" type="button" data-exit-reader>← กลับไปเลือก AI</button>
              <span>โหมดอ่านบทความ</span>
            </div>`
          : ""
      }
      <div class="reader-head">
        <img src="${tool.logoPath}" alt="" />
        <div>
          <p class="reader-label">${categoryLabels[tool.category]}</p>
          <h2>${tool.name}</h2>
          <span>${tool.pagesCaptured} เอกสารจากชุดข้อมูล Word</span>
        </div>
      </div>
      <p class="reader-summary">${tool.summary}</p>
      <section>
        <h3>เหมาะกับใคร</h3>
        <p>${tool.bestFor}</p>
      </section>
      <section>
        <h3>หัวข้อที่ควรศึกษา</h3>
        <ol class="reader-topics">${topics}</ol>
      </section>
      <div class="reader-tags">${tags}</div>
      ${
        state.readMode
          ? ""
          : `<div class="reader-actions">
              <button class="orange-button" type="button" data-read-article="${tool.slug}">อ่านต่อ</button>
            </div>`
      }
      <div class="article-pager" id="articlePager" hidden></div>
      <section class="article-body" id="articleBody" ${expanded ? "" : "hidden"}></section>
    `;
    if (expanded) loadArticle(tool);
  }

  function updateUrl() {
    const url = new URL(window.location.href);
    url.searchParams.set("tool", state.selectedSlug);
    if (state.readMode) {
      url.searchParams.set("read", "1");
      url.searchParams.set("page", String(state.articlePage));
    } else {
      url.searchParams.delete("read");
      url.searchParams.delete("page");
    }
    window.history.replaceState({}, "", url);
  }

  function render() {
    applyReadMode();
    renderFilters();
    renderCards();
    renderReader();
    highlightSelected();
    updateUrl();
  }

  filters.addEventListener("click", (event) => {
    const button = event.target.closest("[data-category]");
    if (!button) return;
    state.category = button.dataset.category;
    state.readMode = false;
    state.expandedSlug = "";
    state.articlePage = 1;
    render();
  });

  articleGrid.addEventListener("click", (event) => {
    const card = event.target.closest(".article-card");
    if (!card) return;
    state.selectedSlug = card.dataset.slug;
    state.expandedSlug = "";
    state.readMode = false;
    state.articlePage = 1;
    renderReader();
    highlightSelected();
    updateUrl();
  });

  readerPanel.addEventListener("click", async (event) => {
    const previousButton = event.target.closest("[data-page-prev]");
    if (previousButton) {
      state.articlePage = Math.max(1, state.articlePage - 1);
      updateUrl();
      renderReader();
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const nextButton = event.target.closest("[data-page-next]");
    if (nextButton) {
      state.articlePage += 1;
      updateUrl();
      renderReader();
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const exitButton = event.target.closest("[data-exit-reader]");
    if (exitButton) {
      state.readMode = false;
      state.expandedSlug = "";
      state.articlePage = 1;
      render();
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const button = event.target.closest("[data-read-article]");
    if (!button) return;
    state.expandedSlug = button.dataset.readArticle;
    state.readMode = true;
    state.articlePage = 1;
    updateUrl();
    applyReadMode();
    renderReader();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  readerPanel.addEventListener("change", (event) => {
    const select = event.target.closest("#articlePageSelect");
    if (!select) return;
    state.articlePage = Number(select.value) || 1;
    updateUrl();
    renderReader();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  search.addEventListener("input", () => {
    state.query = search.value.trim();
    state.readMode = false;
    state.expandedSlug = "";
    state.articlePage = 1;
    renderCards();
    renderReader();
    highlightSelected();
    updateUrl();
    applyReadMode();
  });

  sort.addEventListener("change", () => {
    state.sort = sort.value;
    state.readMode = false;
    state.expandedSlug = "";
    state.articlePage = 1;
    renderCards();
    renderReader();
    highlightSelected();
    updateUrl();
    applyReadMode();
  });

  clearButtons.forEach((button) => {
    button.addEventListener("click", () => {
      state.query = "";
      state.category = "ทั้งหมด";
      state.sort = "featured";
      state.readMode = false;
      state.expandedSlug = "";
      state.articlePage = 1;
      search.value = "";
      sort.value = "featured";
      render();
    });
  });

  const totalDocs = tools.reduce((sum, tool) => sum + tool.pagesCaptured, 0);
  document.querySelector("#articleCount").textContent = tools.length;
  document.querySelector("#pageCount").textContent = totalDocs;
  document.querySelector("#categoryCount").textContent = categories.length - 1;

  if (!tools.some((tool) => tool.slug === state.selectedSlug)) state.selectedSlug = "chatgpt";
  if (state.readMode) state.expandedSlug = state.selectedSlug;
  render();
})();
