# DALL·E
Source: https://ailab.learnnakdev.online/docs/dall-e
Pages captured: 13

## Page 1 (หน้า 1 / 3)
```text
DALL·E
คู่มืออย่างเป็นทางการ
13 เอกสาร
เริ่มต้น
DALL·E คืออะไร — ภาพรวมและความสามารถ

แนะนำ DALL·E โมเดล AI สร้างภาพจากข้อความของ OpenAI ตั้งแต่เวอร์ชันแรกจนถึงปัจจุบัน และสิ่งที่มันทำได้ ·  5 นาที

หน้า 1 / 3
DALL·E คืออะไร — ภาพรวมและความสามารถ

อ้างอิงหลัก: OpenAI Images Guide

DALL·E คืออะไร

DALL·E (ดาลี — ชื่อที่นำมาจากจิตรกรชื่อดัง Salvador Dalí และหุ่นยนต์ WALL-E) คือโมเดล AI (ปัญญาประดิษฐ์ — คอมพิวเตอร์ที่เรียนรู้และทำงานได้คล้ายมนุษย์) ที่พัฒนาโดย OpenAI มีความสามารถในการ สร้างภาพจากข้อความ (Text-to-Image — แปลงคำอธิบายเป็นภาพดิจิทัล) และ แก้ไขภาพ (Image Editing — เปลี่ยนแปลงหรือเติมส่วนต่างๆ ในภาพที่มีอยู่) ได้อย่างน่าทึ่ง

พูดง่ายๆ คือ: คุณพิมพ์คำอธิบายภาพที่อยากได้ แล้ว DALL·E จะสร้างภาพนั้นขึ้นมาให้คุณในไม่กี่วินาที

ตัวอย่างสิ่งที่ DALL·E ทำได้
สร้างภาพ "แมวนักอวกาศกำลังเล่นกีตาร์บนดวงจันทร์"
วาดภาพโลโก้หรืองานศิลปะดิจิทัลสไตล์ต่างๆ
แก้ไขภาพถ่ายโดยเติมหรือลบวัตถุในภาพ
สร้างภาพแปรผัน (Variation — รูปเวอร์ชันอื่นจากภาพต้นฉบับ) จากภาพที่มีอยู่
DALL·E 2 vs DALL·E 3 — ต่างกันอย่างไร

OpenAI ได้พัฒนา DALL·E มาหลายเวอร์ชัน โดยในปัจจุบันมี 2 รุ่นหลักที่ใช้งานผ่าน API (Application Programming Interface — ช่องทางเชื่อมต่อโปรแกรมเพื่อเรียกใช้บริการของ DALL·E) ได้แก่ DALL·E 2 และ DALL·E 3

DALL·E 2

DALL·E 2 เปิดตัวในปี 2022 เป็นรุ่นที่ได้รับความนิยมสูงในระยะแรก มีคุณสมบัติดังนี้:

สร้างภาพจากข้อความได้ แต่บางครั้งไม่ตรงกับ Prompt (คำสั่งให้ AI สร้างภาพ — อธิบายภาพที่ต้องการเป็นภาษาอังกฤษหรือไทย) มากนัก
รองรับฟีเจอร์ Edit (แก้ไขภาพ — เปลี่ยนบางส่วนในภาพเดิม) และ Variation (สร้างภาพแปรผัน — ทำหลายเวอร์ชันจากภาพต้นฉบับ)
ขนาดภาพ (Size — ความกว้างxความสูงของภาพในหน่วย pixel): 256×256, 512×512, 1024×1024
ราคาถูกกว่า DALL·E 3
DALL·E 3

DALL·E 3 เปิดตัวในปี 2023 และเป็นรุ่นที่ก้าวหน้ากว่ามาก มีคุณสมบัติดังนี้:

ตามคำสั่ง Prompt ได้แม่นยำกว่ามาก — เข้าใจบริบทที่ซับซ้อนได้ดีขึ้น
รองรับ Revised Prompt (Prompt ที่ระบบปรับให้ — DALL·E 3 จะขยายหรือแก้ไข Prompt ของคุณโดยอัตโนมัติเพื่อให้ได้ภาพที่ดีขึ้น)
ขนาดภาพ: 1024×1024, 1792×1024, 1024×1792 (รองรับภาพแนวนอนและแนวตั้ง)
รองรับการตั้งค่า Quality (คุณภาพ — ระดับความละเอียดในการสร้างภาพ): standard และ hd
รองรับการตั้งค่า Style (สไตล์ภาพ — ลักษณะภาพที่ต้องการ): vivid และ natural
ไม่รองรับ Edit และ Variation (ฟีเจอร์เหล่านี้มีเฉพาะ DALL·E 2)
ตารางเปรียบเทียบ DALL·E 2 vs DALL·E 3
คุณสมบัติ	DALL·E 2	DALL·E 3
ปีเปิดตัว	2022	2023
ความแม่นยำตาม Prompt	ปานกลาง	สูงมาก
ขนาดภาพ (Size)	256×256, 512×512, 1024×1024	1024×1024, 1792×1024, 1024×1792
Quality (standard/hd)	❌	✅
Style (vivid/natural)	❌	✅
Edit Endpoint	✅	❌
Variation Endpoint	✅	❌
Revised Prompt	❌	✅
ราคาต่อภาพ	ถูกกว่า	แพงกว่า
DALL·E ทำงานอย่างไร

DALL·E ใช้เทคโนโลยีที่เรียกว่า Diffusion Model (โมเดลแพร่กระจาย — เริ่มจากภาพสุ่มแบบ "สัญญาณรบกวน" แล้วค่อยๆ ลดสัญญาณรบกวนจนกลายเป็นภาพที่มีความหมาย) ร่วมกับ CLIP (Contrastive Language–Image Pre-training — โมเดลที่เรียนรู้ความสัมพันธ์ระหว่างคำอธิบายและภาพ)

กระบวนการสร้างภาพของ DALL·E:

รับ Prompt — อ่านคำอธิบายภาพที่คุณพิมพ์
ประมวลผลภาษา — เข้าใจความหมายของคำและบริบท
สร้างภาพ — เริ่มจาก Noise (สัญญาณรบกวนแบบสุ่ม — จุดสีต่างๆ ที่ไม่มีความหมาย) แล้วค่อยๆ ปรับเป็นภาพที่ตรงกับคำอธิบาย
ส่งผลลัพธ์ — ส่งคืนเป็น URL (ลิงก์ชั่วคราว) หรือ Base64 (ข้อมูลภาพในรูปแบบข้อความ)
DALL·E ใช้งานได้ที่ไหน
1. ChatGPT

ผู้ใช้ ChatGPT Plus, Pro, Team หรือ Enterprise สามารถใช้ DALL·E ได้โดยตรงใน ChatGPT เพียงพิมพ์คำขอให้สร้างภาพ ChatGPT จะเรียก DALL·E โดยอัตโนมัติ

ตัวอย่าง: "สร้างรูปภาพ: แมวในชุดนักบินอวกาศ นั่งอยู่ในยานอวกาศ สไตล์ภาพวาดการ์ตูนน่ารัก"

2. OpenAI API

นักพัฒนาสามารถเรียกใช้ DALL·E ผ่าน REST API (ช่องทางการสื่อสารระหว่างโปรแกรมผ่านอินเทอร์เน็ต) ด้วยภาษาโปรแกรมต่างๆ เช่น Python, JavaScript ฯลฯ ต้องมี API Key (รหัสลับสำหรับยืนยันตัวตนในการเรียกใช้ API)

3. แอปพลิเคชันอื่นๆ

มีแอปมากมายที่ใช้ DALL·E ในเบื้องหลัง เช่น Bing Image Creator, Microsoft Designer, และบริการอื่นๆ

จุดเด่นของ DALL·E
ง่ายต่อการใช้งาน — ไม่ต้องมีทักษะการวาดภาพ แค่อธิบายเป็นคำ
หลากหลายสไตล์ — สร้างได้ทั้งภาพถ่ายจริง, ภาพวาด, ภาพการ์ตูน, ภาพนามธรรม
รวดเร็ว — สร้างภาพได้ภายในไม่กี่วินาที
ปลอดภัย — มีระบบกรอง Content Policy (นโยบายเนื้อหา — กฎเกณฑ์ว่าภาพแบบใดที่ไม่อนุญาตให้สร้าง) เพื่อป้องกันเนื้อหาที่ไม่เหมาะสม
ข้อจำกัดของ DALL·E
ข้อความในภาพ — DALL·E บางครั้งสร้างตัวหนังสือในภาพไม่ถูกต้อง (ตัวสะกดผิด หรือตัวอักษรบิดเบี้ยว)
นิ้วมือและร่างกาย — บางครั้งสร้างนิ้วมือหรือสัดส่วนร่างกายมนุษย์ผิดพลาด
ความสม่ำเสมอ — ภาพที่สร้างจาก Prompt เดียวกันอาจให้ผลลัพธ์ที่แตกต่างกันในแต่ละครั้ง
เนื้อหาต้องห้าม — ไม่สามารถสร้างภาพที่ละเมิด Content Policy เช่น ภาพรุนแรง เนื้อหาสำหรับผู้ใหญ่ หรือภาพที่ละเมิดลิขสิทธิ์
สรุป

DALL·E คือโมเดล AI สร้างภาพของ OpenAI ที่ช่วยให้ทุกคนสามารถสร้างภาพดิจิทัลได้โดยเพียงแค่อธิบายเป็นคำ โดยมี 2 รุ่นหลักคือ DALL·E 2 (รองรับการแก้ไขและสร้างภาพแปรผัน) และ DALL·E 3 (แม่นยำกว่า รองรับคุณภาพ HD และสไตล์ที่หลากหลาย) ซึ่งสามารถใช้งานได้ทั้งผ่าน ChatGPT และ OpenAI API

 ก่อนหน้า
ถัดไป
ใช้ DALL·E ใน ChatGPT — วิธีสร้างภาพผ่านการแชต
```

## Page 2 (หน้า 2 / 3)
```text
DALL·E
คู่มืออย่างเป็นทางการ
13 เอกสาร
เริ่มต้น
ใช้ DALL·E ใน ChatGPT — วิธีสร้างภาพผ่านการแชต

วิธีใช้ DALL·E สร้างภาพโดยตรงใน ChatGPT โดยไม่ต้องเขียนโค้ด รวมถึงเทคนิคและข้อจำกัดที่ควรรู้ ·  5 นาที

หน้า 2 / 3
ใช้ DALL·E ใน ChatGPT — วิธีสร้างภาพผ่านการแชต

อ้างอิงหลัก: DALL·E 3 in ChatGPT — OpenAI Help Center

ภาพรวม

ChatGPT รวม DALL·E 3 ไว้ในตัว ทำให้คุณสามารถสร้างภาพได้โดยตรงจากการสนทนา ไม่ต้องสมัครบริการแยก ไม่ต้องเขียนโค้ด และไม่ต้องมีความรู้ด้านเทคนิคใดๆ เพียงแค่พิมพ์คำอธิบายภาพที่คุณต้องการ ChatGPT จะเรียก DALL·E โดยอัตโนมัติ

ใครใช้ได้บ้าง

DALL·E ใน ChatGPT รองรับแผนดังต่อไปนี้:

แผน	ใช้ DALL·E ได้ไหม
ChatGPT Free	❌ ไม่รองรับ
ChatGPT Plus ($20/เดือน)	✅ ใช้ได้
ChatGPT Pro ($200/เดือน)	✅ ใช้ได้
ChatGPT Team	✅ ใช้ได้
ChatGPT Enterprise	✅ ใช้ได้

หมายเหตุ: แผนฟรีไม่รองรับ DALL·E ต้องอัปเกรด (เพิ่มระดับแผน) เป็น Plus ขึ้นไปเพื่อใช้งานได้

วิธีสร้างภาพใน ChatGPT
ขั้นตอนพื้นฐาน
เปิด chatgpt.com และล็อกอิน (เข้าสู่ระบบ)
เริ่มแชตใหม่หรือใช้แชตที่มีอยู่
พิมพ์คำขอสร้างภาพ เช่น "สร้างรูปภาพ..." หรือ "วาดภาพ..."
ChatGPT จะตอบรับและเรียก DALL·E โดยอัตโนมัติ
รอสักครู่ (ประมาณ 10-30 วินาที) แล้วภาพจะปรากฏขึ้น
ตัวอย่าง Prompt (คำสั่งให้ AI สร้างภาพ — อธิบายภาพที่ต้องการ) ที่ใช้ได้จริง
สร้างรูปภาพ: ภูเขาไฟในยามพระอาทิตย์ตก สีส้มและม่วง มีเงาสะท้อนในทะเลสาบ สไตล์ภาพวาดสีน้ำ

Generate an image of a cozy Japanese coffee shop at night, warm lighting, rain outside the window, photorealistic style

วาดภาพนกฮูกสวมแว่นตากำลังอ่านหนังสือใต้ต้นไม้ สไตล์การ์ตูน Pixar น่ารักๆ

Revised Prompt — DALL·E 3 ปรับ Prompt ให้อัตโนมัติ

หนึ่งในคุณสมบัติสำคัญของ DALL·E 3 ใน ChatGPT คือ Revised Prompt (Prompt ที่ระบบปรับให้ — DALL·E 3 จะขยายหรือแก้ไข Prompt ต้นฉบับของคุณโดยอัตโนมัติเพื่อให้ได้ภาพที่มีคุณภาพและรายละเอียดมากขึ้น)

ตัวอย่าง:

Prompt ของคุณ: "แมวนักอวกาศ"
Revised Prompt ที่ DALL·E ใช้จริง: "A fluffy orange cat dressed as an astronaut, floating in outer space surrounded by stars and planets, wearing a white space suit with a helmet, realistic digital illustration style"
วิธีดู Revised Prompt

เมื่อ ChatGPT สร้างภาพ มักจะแสดง Revised Prompt ให้เห็น คุณสามารถนำไปปรับใช้หรือเรียนรู้เพื่อเขียน Prompt ที่ดีขึ้นได้

การปิด Revised Prompt

หากต้องการให้ DALL·E ใช้ Prompt ของคุณตรงๆ โดยไม่ปรับ ให้บอก ChatGPT ว่า:

Please use my prompt exactly as written without revising it: [Prompt ของคุณ]

เทคนิคการสั่งงานใน ChatGPT
1. ระบุสไตล์ภาพที่ต้องการ
สร้างภาพ: [สิ่งที่ต้องการ] สไตล์ [ประเภท]


ตัวอย่างสไตล์ที่ใช้บ่อย:

Photorealistic (สมจริงเหมือนภาพถ่าย — รายละเอียดสูง ดูเป็นภาพจริง)
Oil painting (ภาพวาดสีน้ำมัน — มีพื้นผิวหนา แสงเงาชัดเจน)
Watercolor (สีน้ำ — ขอบนุ่ม สีโปร่งใส)
Anime (อนิเมะ — สไตล์การ์ตูนญี่ปุ่น)
Cartoon (การ์ตูน — เส้นชัด สีแบน)
Pixel art (พิกเซลอาร์ต — ภาพแบบ 8-bit เหมือนเกมเก่า)
3D render (ภาพ 3 มิติ — ดูเป็นวัตถุสามมิติ)
2. ระบุอารมณ์และแสงสี
ภาพบรรยากาศยามเย็น แสงอบอุ่น สีส้มและทอง ให้ความรู้สึกอบอุ่นและสงบ

3. ระบุมุมกล้อง (Camera Angle — มุมมองที่ถ่ายภาพ)
Close-up (ภาพระยะใกล้ — เห็นรายละเอียดชัดเจน)
Wide shot (ภาพมุมกว้าง — เห็นฉากทั้งหมด)
Bird's eye view (มุมมองจากเบื้องบน — มองลงมาจากด้านบน)
Low angle (มุมต่ำ — มองขึ้นจากด้านล่าง ทำให้วัตถุดูใหญ่โต)
4. ขอแก้ไขภาพในแชตเดียวกัน

หลังจาก DALL·E สร้างภาพแล้ว คุณสามารถขอแก้ไขได้โดยพิมพ์ต่อในแชตเดียวกัน:

ปรับให้พื้นหลังเป็นป่า แทนที่จะเป็นทะเล

เพิ่มดวงจันทร์เสี้ยวในท้องฟ้า และทำให้ภาพโดยรวมมืดลงนิดหน่อย

ข้อจำกัดของ DALL·E ใน ChatGPT
Content Policy (นโยบายเนื้อหา — กฎเกณฑ์ว่าภาพแบบใดที่ไม่อนุญาตให้สร้าง)

DALL·E มีระบบกรองเนื้อหาที่จะปฏิเสธ Prompt ที่:

มีเนื้อหาสำหรับผู้ใหญ่ (Adult Content)
มีความรุนแรง (Violence) ในระดับที่รุนแรงเกินไป
ใช้ชื่อหรือภาพใบหน้าบุคคลมีชื่อเสียง (Real people) โดยตรง
ละเมิดลิขสิทธิ์ (Copyright Infringement) ของงานศิลปะหรือตัวละครที่มีเจ้าของชัดเจน
มีเนื้อหาที่สร้างความเกลียดชัง (Hate Speech)
ข้อจำกัดด้านเทคนิค
ข้อความในภาพ: DALL·E ยังสร้างตัวหนังสือในภาพได้ไม่สมบูรณ์แบบ บางครั้งสะกดผิด
ขนาดภาพ: ใน ChatGPT จะสร้างขนาดมาตรฐาน ไม่สามารถปรับขนาดเองได้เหมือนในการใช้ API โดยตรง
จำนวนภาพต่อครั้ง: สร้างได้ครั้งละ 1 ภาพใน ChatGPT
วิธีดาวน์โหลดภาพที่สร้าง
คลิกที่ภาพที่ DALL·E สร้างขึ้น
คลิกไอคอน ดาวน์โหลด (Download) มุมขวาบน
ภาพจะถูกบันทึกเป็นไฟล์ .webp หรือ .png ลงในโฟลเดอร์ดาวน์โหลดของคุณ

เคล็ดลับ: ภาพที่สร้างโดย DALL·E มีความละเอียด 1024×1024 pixel เป็นค่าเริ่มต้น

ลิขสิทธิ์ภาพที่สร้าง

OpenAI ระบุว่าผู้ใช้ที่สร้างภาพผ่าน DALL·E (ผ่าน ChatGPT หรือ API) มีสิทธิ์ใช้งานภาพนั้นเพื่อวัตถุประสงค์ใดก็ได้ รวมถึงการพิมพ์ การขาย และการใช้งานเชิงพาณิชย์ (Commercial Use — การใช้เพื่อหาเงินหรือในธุรกิจ) ตามเงื่อนไขในนโยบายการใช้งานของ OpenAI

สรุป

การใช้ DALL·E ใน ChatGPT คือวิธีที่ง่ายและรวดเร็วที่สุดในการสร้างภาพ AI เพียงแค่มีแผน ChatGPT Plus ขึ้นไปและพิมพ์คำอธิบายภาพที่ต้องการ DALL·E 3 จะสร้างภาพคุณภาพสูงให้คุณได้ทันที คุณยังสามารถขอแก้ไขหรือปรับเปลี่ยนได้ในแชตเดียวกัน ทำให้กระบวนการสร้างภาพเป็นเรื่องสนุกและง่ายดายสำหรับทุกคน

 ก่อนหน้า
DALL·E คืออะไร — ภาพรวมและความสามารถ
ถัดไป
การเขียน Prompt สำหรับสร้างภาพ — เทคนิคและตัวอย่าง
```

## Page 3 (หน้า 3 / 3)
```text
DALL·E
คู่มืออย่างเป็นทางการ
13 เอกสาร
เริ่มต้น
การเขียน Prompt สำหรับสร้างภาพ — เทคนิคและตัวอย่าง

เรียนรู้วิธีเขียน Prompt ที่ดีสำหรับ DALL·E เพื่อสร้างภาพที่ตรงใจ พร้อมโครงสร้าง Prompt และตัวอย่างจริง ·  7 นาที

หน้า 3 / 3
การเขียน Prompt สำหรับสร้างภาพ — เทคนิคและตัวอย่าง

อ้างอิงหลัก: OpenAI Images Guide — Prompting

Prompt คืออะไร

Prompt (คำสั่งให้ AI สร้างภาพ — อธิบายภาพที่ต้องการเป็นภาษาอังกฤษหรือไทย) คือข้อความที่คุณพิมพ์เพื่อบอก DALL·E ว่าอยากได้ภาพแบบไหน ยิ่ง Prompt มีรายละเอียดมากและชัดเจนมากเท่าไร ผลลัพธ์ที่ได้ก็จะยิ่งตรงใจมากขึ้นเท่านั้น

โครงสร้าง Prompt ที่ดี

Prompt ที่มีคุณภาพควรประกอบด้วยส่วนต่างๆ ดังนี้:

[วัตถุหลัก] + [การกระทำ/สถานการณ์] + [ฉากหลัง] + [สไตล์ภาพ] + [แสงสี] + [มุมกล้อง]

ตัวอย่างโครงสร้างจริง

Prompt เรียบง่าย:

A cat sitting on a sofa


Prompt ที่มีรายละเอียดดีขึ้น:

A fluffy orange tabby cat sitting on a velvet blue sofa, afternoon sunlight streaming through the window, cozy living room background, photorealistic style, warm color tones


ความแตกต่างชัดเจน: Prompt ที่มีรายละเอียดมากกว่าจะให้ภาพที่ตรงใจกว่ามาก

องค์ประกอบสำคัญของ Prompt
1. วัตถุหลัก (Subject)

อธิบายสิ่งที่เป็นใจกลางของภาพให้ชัดเจน

ไม่ดี	ดีกว่า
"a dog"	"a golden retriever puppy with curly fur"
"a car"	"a vintage red Ferrari from the 1960s"
"a building"	"a Gothic cathedral with flying buttresses"
2. การกระทำหรือสถานการณ์ (Action/Situation)

บอกว่าวัตถุกำลังทำอะไรหรืออยู่ในสถานการณ์ใด

"running through a field"
"sitting quietly under a cherry blossom tree"
"flying over a city at night"
"looking directly at the camera"
3. ฉากหลัง (Background/Setting)
"in a futuristic city"
"on a snowy mountain peak"
"inside a cozy library"
"underwater coral reef"
4. สไตล์ภาพ (Style)

สไตล์ที่ระบุได้จะส่งผลต่อลักษณะทั้งหมดของภาพ

สไตล์	คำอธิบาย	ตัวอย่าง
photorealistic	สมจริงเหมือนภาพถ่าย	ภาพดูเหมือนถ่ายจากกล้องจริง
oil painting	ภาพวาดสีน้ำมัน	พื้นผิวหนา แสงเงาดราม่า
watercolor	สีน้ำ	ขอบนุ่ม สีโปร่งใส สวยงาม
anime	อนิเมะ	ตาโต เส้นคมชัด สไตล์ญี่ปุ่น
flat illustration	ภาพประกอบแบน	สีแบน ไม่มีเงา สไตล์โมเดิร์น
pixel art	พิกเซลอาร์ต	เหมือนเกม 8-bit คลาสสิก
3D render	ภาพ 3 มิติ	ดูมีมิติ เหมือนเรนเดอร์จาก Blender
sketch	ภาพร่าง	เส้นดินสอ ดูเหมือนร่างในสมุด
impressionist	อิมเพรสชันนิสม์	ฝีแปรงชัดเจน เหมือน Monet
5. แสงสี (Lighting & Color)

การระบุแสงและสีจะเปลี่ยนอารมณ์ของภาพได้มาก

"golden hour lighting" — แสงพระอาทิตย์ตกดินสีทอง อบอุ่น
"dramatic studio lighting" — แสงสตูดิโอ คมชัด มีเงาชัดเจน
"soft diffused light" — แสงนุ่ม ไม่มีเงาแข็ง
"neon lights" — แสงนีออนสีสดใส สไตล์ cyberpunk
"moonlit" — แสงจันทร์ สีเย็น บรรยากาศลึกลับ
"high contrast" — ความต่างระหว่างสว่างกับมืดสูง
6. มุมกล้อง (Camera Angle)
"close-up" — ภาพระยะใกล้ เห็นรายละเอียด
"wide angle" — มุมกว้าง เห็นฉากทั้งหมด
"bird's eye view" — มุมมองจากด้านบน
"low angle" — มุมต่ำ วัตถุดูยิ่งใหญ่
"portrait" — ภาพเหมือนบุคคล เน้นใบหน้าและท่าทาง
"macro" — ภาพมาโคร รายละเอียดสูงมาก เหมือนส่องด้วยแว่นขยาย
เทคนิค Prompt ขั้นสูง
เทคนิคที่ 1: ใช้คำคุณศัพท์ที่เจาะจง

แทนที่จะพูดว่า "สวย" ให้ระบุว่าสวยแบบไหน:

❌ "a beautiful forest"
✅ "an ancient forest with towering oak trees, dappled sunlight filtering through the canopy, misty morning atmosphere"

เทคนิคที่ 2: ระบุสัดส่วน (Aspect Ratio — อัตราส่วนภาพ)

ใน DALL·E 3 คุณสามารถระบุทิศทางของภาพได้:

"landscape orientation" → ภาพแนวนอน (1792×1024)
"portrait orientation" → ภาพแนวตั้ง (1024×1792)
"square format" → ภาพสี่เหลี่ยมจัตุรัส (1024×1024)
เทคนิคที่ 3: อ้างอิงศิลปินหรือสไตล์ที่รู้จัก
in the style of Monet's impressionist paintings
in the style of Studio Ghibli anime
in the style of concept art for AAA video games
reminiscent of National Geographic photography


หมายเหตุ: ควรใช้เพื่ออ้างอิงสไตล์เท่านั้น ไม่ควรขอให้ "คัดลอก" งานของศิลปินโดยตรง

เทคนิคที่ 4: ระบุสิ่งที่ไม่ต้องการ (Negative Elements)

บอก ChatGPT ว่าไม่ต้องการอะไรในภาพ:

Create an image of a beach scene, but without any people or buildings, just pure nature

เทคนิคที่ 5: ใช้การเปรียบเทียบ (Similes)
a cityscape that looks like a glowing circuit board
clouds that look like cotton candy
a building shaped like a seashell

ตัวอย่าง Prompt จริงพร้อมคำอธิบาย
ตัวอย่าง 1: ภาพโปรดักต์ (Product Photography)
A sleek black smartphone lying on a white marble surface,
professional product photography, studio lighting, soft shadows,
high resolution, commercial advertisement style


ใช้สำหรับ: ภาพสินค้าสำหรับเว็บไซต์หรือโฆษณา

ตัวอย่าง 2: ภาพประกอบบทความ (Article Illustration)
An isometric illustration of a smart city with solar panels,
electric vehicles, and green spaces, flat design style,
bright and optimistic color palette, vector art look


ใช้สำหรับ: ภาพประกอบบทความเกี่ยวกับเทคโนโลยีหรือสิ่งแวดล้อม

ตัวอย่าง 3: ภาพตัวละคร (Character Art)
A female warrior in ornate golden armor, holding a glowing sword,
standing on a cliff overlooking a stormy sea, epic fantasy art,
dramatic lighting, highly detailed, concept art style


ใช้สำหรับ: ตัวละครสำหรับเกม นิยาย หรือโปรเจกต์สร้างสรรค์

ตัวอย่าง 4: ภาพโลโก้ (Logo Design)
A minimalist logo of a mountain peak inside a circle,
monochrome black and white, clean lines, modern design,
vector style, suitable for outdoor adventure brand


ใช้สำหรับ: ไอเดียโลโก้หรือแบรนดิ้ง

ตัวอย่าง 5: ภาพพื้นหลัง (Background/Wallpaper)
A breathtaking aurora borealis over a snow-covered pine forest,
purple and green lights dancing in the sky, reflection in a frozen lake,
long exposure photography effect, ultra high resolution, cinematic


ใช้สำหรับ: วอลเปเปอร์หน้าจอหรือพื้นหลังพรีเซนเตชัน

ข้อผิดพลาดที่พบบ่อยและวิธีแก้ไข
ปัญหา: ภาพที่ได้ไม่ตรงกับที่ต้องการ

สาเหตุ: Prompt ไม่ชัดเจนพอ หรือใช้คำที่คลุมเครือ

วิธีแก้:

เพิ่มรายละเอียดเฉพาะเจาะจงมากขึ้น
ระบุสไตล์ แสง และบรรยากาศ
ลองแบ่ง Prompt ออกเป็นส่วนๆ
ปัญหา: ข้อความในภาพสะกดผิด

สาเหตุ: DALL·E ยังไม่สมบูรณ์แบบในการสร้างตัวหนังสือ

วิธีแก้:

ใช้ข้อความสั้นๆ ที่เรียบง่าย
ระบุว่า "clear legible text" หรือ "bold readable font"
สำหรับข้อความสำคัญควรเพิ่มในโปรแกรมแก้ไขภาพหลังจากนั้น
ปัญหา: AI ปฏิเสธ Prompt (Content Policy Violation)

สาเหตุ: Prompt มีคำที่ระบบตรวจพบว่าอาจสร้างเนื้อหาที่ไม่เหมาะสม

วิธีแก้:

ปรับคำให้สุภาพและชัดเจนขึ้น
หลีกเลี่ยงคำที่มีความหมายสองแง่
ระบุบริบทที่ถูกต้อง เช่น "for educational purposes" หรือ "historical painting"
สรุปหลักการเขียน Prompt ที่ดี
ชัดเจน — บอกสิ่งที่ต้องการอย่างตรงไปตรงมา
มีรายละเอียด — ยิ่งละเอียดมาก ยิ่งได้ภาพที่ตรงใจ
ระบุสไตล์ — บอกว่าต้องการภาพสไตล์ใด
ระบุอารมณ์ — บรรยายบรรยากาศและความรู้สึกที่ต้องการ
ทดลองและปรับ — อย่ากลัวที่จะลองหลายๆ ครั้ง ผลลัพธ์จะดีขึ้นเรื่อยๆ

การเขียน Prompt ที่ดีเป็นทักษะที่ต้องฝึกฝน ยิ่งใช้บ่อยก็จะยิ่งเก่งขึ้นเรื่อยๆ

 ก่อนหน้า
ใช้ DALL·E ใน ChatGPT — วิธีสร้างภาพผ่านการแชต
ถัดไป
ภาพรวม Images API — Authentication และการเริ่มต้นใช้งาน
```

## Page 4 (หน้า 1 / 5)
```text
DALL·E
คู่มืออย่างเป็นทางการ
13 เอกสาร
ระดับกลาง
ภาพรวม Images API — Authentication และการเริ่มต้นใช้งาน

แนะนำ OpenAI Images API สำหรับนักพัฒนา ครอบคลุม Authentication, API Key, และโครงสร้างพื้นฐานของ API ·  6 นาที

หน้า 1 / 5
ภาพรวม Images API — Authentication และการเริ่มต้นใช้งาน

อ้างอิงหลัก: OpenAI Images API Reference

Images API คืออะไร

Images API คือ REST API (ช่องทางการสื่อสารระหว่างโปรแกรมผ่านอินเทอร์เน็ต — ส่งคำขอและรับผลลัพธ์ในรูปแบบ JSON) ของ OpenAI ที่ให้นักพัฒนาสามารถนำความสามารถของ DALL·E ไปรวมกับแอปพลิเคชันของตัวเองได้

ด้วย Images API คุณสามารถ:

สร้างภาพจากข้อความ ผ่าน Generation Endpoint (จุดปลายทาง API สำหรับสร้างภาพใหม่)
แก้ไขภาพที่มีอยู่ ผ่าน Edit Endpoint (จุดปลายทาง API สำหรับแก้ไขภาพ)
สร้างภาพแปรผัน ผ่าน Variation Endpoint (จุดปลายทาง API สำหรับสร้างหลายเวอร์ชันจากภาพต้นฉบับ)
ขั้นตอนการเริ่มต้น
ขั้นตอนที่ 1: สมัครบัญชี OpenAI

ไปที่ platform.openai.com และสมัครบัญชี OpenAI (ถ้ายังไม่มี)

ขั้นตอนที่ 2: สร้าง API Key

API Key (รหัสลับสำหรับยืนยันตัวตนในการเรียกใช้ API — เหมือนรหัสผ่านที่โปรแกรมของคุณต้องใช้เพื่อพิสูจน์ว่าเป็นคุณ) คือสิ่งสำคัญที่สุดในการใช้งาน API

ไปที่ platform.openai.com/api-keys
คลิก "Create new secret key"
ตั้งชื่อ Key ให้จำได้ เช่น "my-dall-e-project"
คัดลอกและเก็บ Key ไว้ในที่ปลอดภัย — คุณจะเห็น Key นี้ได้ครั้งเดียวเท่านั้น!

คำเตือน: ไม่ควรแชร์ API Key กับใคร และไม่ควรเขียน Key ลงใน Source Code (โค้ดต้นฉบับ) โดยตรง ควรใช้ Environment Variable (ตัวแปรสภาพแวดล้อม — วิธีเก็บข้อมูลลับแยกจากโค้ดหลัก) แทน

ขั้นตอนที่ 3: ติดตั้ง OpenAI Library

สำหรับ Python:

pip install openai


สำหรับ Node.js:

npm install openai

ขั้นตอนที่ 4: ตั้งค่า API Key

วิธีที่แนะนำ — ใช้ Environment Variable:

สำหรับ macOS/Linux:

export OPENAI_API_KEY="sk-xxxxxxxxxxxxxxxxxxxxxxxx"


สำหรับ Windows (PowerShell):

$env:OPENAI_API_KEY = "sk-xxxxxxxxxxxxxxxxxxxxxxxx"


หรือสร้างไฟล์ .env:

OPENAI_API_KEY=sk-xxxxxxxxxxxxxxxxxxxxxxxx

Authentication (การยืนยันตัวตน)

ทุก Request (คำขอ — ข้อมูลที่ส่งไปยัง API) ต้องมี API Key ในส่วน Authorization Header (ส่วนหัวของคำขอสำหรับยืนยันตัวตน)

รูปแบบ HTTP Request พื้นฐาน
Authorization: Bearer YOUR_API_KEY
Content-Type: application/json

ตัวอย่างการเรียก API ด้วย Python
from openai import OpenAI

# สร้าง Client (ตัวเชื่อมต่อกับ API — จัดการการส่งและรับข้อมูลอัตโนมัติ)
client = OpenAI(
    api_key="sk-xxxxxxxx"  # ควรใช้ os.environ.get("OPENAI_API_KEY") แทน
)

# เรียก Images API เพื่อสร้างภาพ
response = client.images.generate(
    model="dall-e-3",
    prompt="A beautiful sunset over the mountains",
    size="1024x1024",
    quality="standard",
    n=1,
)

# ดึง URL ของภาพที่สร้าง
image_url = response.data[0].url
print(image_url)

ตัวอย่างการเรียก API ด้วย Node.js
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const response = await openai.images.generate({
  model: "dall-e-3",
  prompt: "A beautiful sunset over the mountains",
  size: "1024x1024",
  quality: "standard",
  n: 1,
});

const imageUrl = response.data[0].url;
console.log(imageUrl);

ตัวอย่างการเรียก API ด้วย cURL (คำสั่งในเทอร์มินัล)
curl https://api.openai.com/v1/images/generations \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -d '{
    "model": "dall-e-3",
    "prompt": "A beautiful sunset over the mountains",
    "n": 1,
    "size": "1024x1024"
  }'

Base URL และ Endpoint หลัก

Base URL (URL พื้นฐาน — ที่อยู่หลักของ API ก่อนระบุประเภทคำขอ): https://api.openai.com/v1

Endpoint	HTTP Method	วัตถุประสงค์
/images/generations	POST	สร้างภาพจาก Prompt
/images/edits	POST	แก้ไขภาพที่มีอยู่
/images/variations	POST	สร้างภาพแปรผัน
โครงสร้าง Response (ข้อมูลที่ API ส่งกลับ)

เมื่อ API สร้างภาพสำเร็จ จะส่ง JSON กลับมาในรูปแบบนี้:

{
  "created": 1589478378,
  "data": [
    {
      "url": "https://oaidalleapiprodscus.blob.core.windows.net/private/...",
      "revised_prompt": "A majestic mountain landscape at golden hour..."
    }
  ]
}

Field	คำอธิบาย
created	Timestamp (ประทับเวลา — บอกเวลาที่สร้างในรูปแบบ Unix timestamp)
data	Array (ชุดข้อมูล — รายการภาพที่สร้าง) ของภาพที่สร้าง
data[].url	URL ชั่วคราวของภาพ (หมดอายุหลัง 1 ชั่วโมง)
data[].b64_json	ข้อมูลภาพในรูปแบบ Base64 (ถ้าเลือก response_format เป็น b64_json)
data[].revised_prompt	Prompt ที่ DALL·E 3 ปรับแก้ให้อัตโนมัติ
Error Handling (การจัดการข้อผิดพลาด)

เมื่อเกิดข้อผิดพลาด API จะส่ง Error Response (การตอบสนองเมื่อเกิดข้อผิดพลาด) กลับมา:

{
  "error": {
    "code": "content_policy_violation",
    "message": "Your request was rejected as a result of our safety system...",
    "type": "invalid_request_error"
  }
}

Error Codes ที่พบบ่อย
Error Code	ความหมาย	วิธีแก้
invalid_api_key	API Key ไม่ถูกต้อง	ตรวจสอบ API Key อีกครั้ง
content_policy_violation	Prompt ละเมิดนโยบายเนื้อหา	แก้ไข Prompt ให้เหมาะสม
rate_limit_exceeded	ใช้ API เกินขีดจำกัด	รอและลองใหม่, หรืออัปเกรดแผน
insufficient_quota	เครดิตในบัญชีหมด	เติมเครดิตใน OpenAI Dashboard
invalid_request_error	คำขอมีรูปแบบไม่ถูกต้อง	ตรวจสอบ Parameter ต่างๆ
ตัวอย่างการจัดการ Error ใน Python
from openai import OpenAI, OpenAIError

client = OpenAI()

try:
    response = client.images.generate(
        model="dall-e-3",
        prompt="A sunset landscape",
        size="1024x1024",
        n=1,
    )
    image_url = response.data[0].url
    print(f"ภาพสร้างสำเร็จ: {image_url}")

except OpenAIError as e:
    print(f"เกิดข้อผิดพลาด: {e.message}")

ข้อควรรู้สำหรับนักพัฒนาเริ่มต้น
1. URL ของภาพมีอายุ 1 ชั่วโมง

URL ที่ API ส่งกลับมาจะหมดอายุภายใน 1 ชั่วโมง ถ้าต้องการเก็บภาพไว้ ให้:

ดาวน์โหลดไฟล์ภาพแล้วเก็บไว้ใน Storage ของตัวเอง
หรือใช้ response_format: "b64_json" เพื่อรับข้อมูลภาพโดยตรงโดยไม่ผ่าน URL
2. ต้องเติมเครดิตก่อนใช้งาน

Images API ใช้เครดิตในบัญชี OpenAI ซึ่งต้องซื้อก่อน (Pay-as-you-go — จ่ายตามที่ใช้จริง) ไปที่ platform.openai.com/settings/billing เพื่อเติมเครดิต

3. ตรวจสอบ Usage ของคุณ

ดูปริมาณการใช้งานและค่าใช้จ่ายได้ที่ platform.openai.com/usage

สรุป

Images API ของ OpenAI ช่วยให้นักพัฒนาสามารถนำความสามารถของ DALL·E ไปรวมกับแอปพลิเคชันของตัวเองได้ง่ายๆ เพียงแค่มี API Key ติดตั้ง Library ที่ต้องการ และเรียกใช้ Endpoint ที่เหมาะสม ในบทถัดไปเราจะเรียนรู้รายละเอียดของแต่ละ Endpoint อย่างละเอียด

 ก่อนหน้า
การเขียน Prompt สำหรับสร้างภาพ — เทคนิคและตัวอย่าง
ถัดไป
Generate Endpoint — สร้างภาพจากข้อความ
```

## Page 5 (หน้า 2 / 5)
```text
DALL·E
คู่มืออย่างเป็นทางการ
13 เอกสาร
ระดับกลาง
Generate Endpoint — สร้างภาพจากข้อความ

เรียนรู้การใช้งาน POST /images/generations ทุก Parameter ที่รองรับ พร้อมตัวอย่างโค้ดและผลลัพธ์จริง ·  8 นาที

หน้า 2 / 5
Generate Endpoint — สร้างภาพจากข้อความ

อ้างอิงหลัก: OpenAI API Reference — Create image

Generate Endpoint คืออะไร

Generate Endpoint (จุดปลายทาง API สำหรับสร้างภาพ — รับ Prompt แล้วสร้างภาพใหม่ขึ้นมาตั้งแต่ต้น) คือ API หลักที่ใช้ในการสร้างภาพจากคำอธิบาย

Endpoint:

POST https://api.openai.com/v1/images/generations

Parameters ทั้งหมด (ตัวแปรที่กำหนดรายละเอียดของคำขอ)
Parameter หลัก
Parameter	Type	Required	คำอธิบาย
prompt	string	✅ ต้องมี	คำอธิบายภาพที่ต้องการสร้าง
model	string	❌ ไม่บังคับ	โมเดลที่ใช้ (dall-e-2 หรือ dall-e-3)
n	integer	❌ ไม่บังคับ	จำนวนภาพที่ต้องการ (ค่าเริ่มต้น: 1)
size	string	❌ ไม่บังคับ	ขนาดภาพ (ค่าเริ่มต้น: 1024×1024)
quality	string	❌ ไม่บังคับ	คุณภาพภาพ (เฉพาะ DALL·E 3)
style	string	❌ ไม่บังคับ	สไตล์ภาพ (เฉพาะ DALL·E 3)
response_format	string	❌ ไม่บังคับ	รูปแบบผลลัพธ์ (url หรือ b64_json)
user	string	❌ ไม่บังคับ	ID ผู้ใช้สำหรับการติดตาม
Parameter prompt (คำสั่งให้ AI สร้างภาพ)

Prompt (คำสั่งให้ AI สร้างภาพ — อธิบายภาพที่ต้องการเป็นภาษาอังกฤษหรือไทย) คือหัวใจหลักของการสร้างภาพ

DALL·E 2: ความยาว Prompt สูงสุด 1,000 ตัวอักษร
DALL·E 3: ความยาว Prompt สูงสุด 4,000 ตัวอักษร
# ตัวอย่าง Prompt สั้น
prompt = "A red apple on a white table"

# ตัวอย่าง Prompt ละเอียด
prompt = """
A cozy Thai coffee shop at sunset, wooden interior, warm Edison bulb lighting,
potted tropical plants near the window, a barista preparing pour-over coffee,
watercolor painting style, soft muted colors, peaceful atmosphere
"""

Parameter model (โมเดลที่ใช้สร้างภาพ)
model = "dall-e-3"   # ใช้ DALL·E 3 (แนะนำ — ผลลัพธ์ดีกว่า)
model = "dall-e-2"   # ใช้ DALL·E 2 (ถูกกว่า, รองรับ Edit และ Variation)


ถ้าไม่ระบุ ค่าเริ่มต้นจะเป็น dall-e-2

Parameter size (ขนาดภาพ)

Size (ขนาดภาพ — ความกว้างxความสูงของภาพในหน่วย pixel) ที่รองรับแตกต่างกันตามโมเดล:

สำหรับ DALL·E 3
Size	ความหมาย	ใช้กับ
"1024x1024"	ภาพสี่เหลี่ยมจัตุรัส	ทั่วไป, โปรไฟล์, โลโก้
"1792x1024"	ภาพแนวนอน (Landscape)	วอลเปเปอร์, แบนเนอร์
"1024x1792"	ภาพแนวตั้ง (Portrait)	ภาพหน้าปก, เนื้อหามือถือ
สำหรับ DALL·E 2
Size	ความหมาย
"256x256"	ภาพเล็ก ราคาถูกสุด
"512x512"	ภาพกลาง
"1024x1024"	ภาพใหญ่ คุณภาพดีสุด
# ตัวอย่างการกำหนด size
response = client.images.generate(
    model="dall-e-3",
    prompt="A wide panoramic mountain landscape",
    size="1792x1024",  # เลือกแนวนอนสำหรับภาพแนวกว้าง
    n=1,
)

Parameter quality (คุณภาพภาพ)

Quality (คุณภาพ — ระดับรายละเอียดในการสร้างภาพ) รองรับเฉพาะ DALL·E 3:

Quality	คำอธิบาย	ราคาเทียบกัน
"standard"	คุณภาพมาตรฐาน เร็วกว่า	ถูกกว่า
"hd"	คุณภาพสูง (High Definition — ความละเอียดสูง รายละเอียดมากขึ้น) เส้นชัดขึ้น รายละเอียดมากขึ้น	แพงกว่า (ประมาณ 2x)
# Standard — เหมาะกับการทดสอบและใช้งานทั่วไป
response = client.images.generate(
    model="dall-e-3",
    prompt="A forest scene",
    size="1024x1024",
    quality="standard",
)

# HD — เหมาะกับงานที่ต้องการคุณภาพสูงสุด
response = client.images.generate(
    model="dall-e-3",
    prompt="A detailed portrait of a wise old man",
    size="1024x1024",
    quality="hd",
)


เคล็ดลับ: ใช้ standard สำหรับการทดสอบ Prompt เมื่อพอใจแล้วค่อยสร้างใหม่ด้วย hd เพื่อประหยัดค่าใช้จ่าย

Parameter style (สไตล์ภาพ)

Style (สไตล์ภาพ — ลักษณะโดยรวมของภาพที่สร้าง) รองรับเฉพาะ DALL·E 3:

Style	คำอธิบาย	เหมาะกับ
"vivid"	สีสันจัดจ้าน (Vivid — สีสันสดใส คมชัด ดราม่า) ค่าเริ่มต้น	ภาพศิลปะ, โฆษณา, งาน Creative
"natural"	สีสันธรรมชาติ (Natural — ดูสมจริง ไม่เกินจริง)	ภาพถ่ายจริง, ภาพประกอบบทความ
# Vivid — สีจัด ดราม่า เหมาะกับงาน Creative
response = client.images.generate(
    model="dall-e-3",
    prompt="A dragon flying over a volcano",
    size="1024x1024",
    style="vivid",
)

# Natural — ดูสมจริง เหมาะกับภาพสถานที่หรือบุคคล
response = client.images.generate(
    model="dall-e-3",
    prompt="A quiet morning in a Thai village",
    size="1024x1024",
    style="natural",
)

Parameter n (จำนวนภาพ)

n คือจำนวนภาพที่ต้องการสร้างในครั้งเดียว

DALL·E 3: รองรับ n=1 เท่านั้น (สร้างได้ครั้งละ 1 ภาพ)
DALL·E 2: รองรับ n ตั้งแต่ 1-10
# DALL·E 2 — สร้าง 4 ภาพพร้อมกัน
response = client.images.generate(
    model="dall-e-2",
    prompt="A cute robot",
    size="1024x1024",
    n=4,  # ได้ 4 ภาพพร้อมกัน
)

# วนลูปแสดง URL ทุกภาพ
for i, image in enumerate(response.data):
    print(f"ภาพที่ {i+1}: {image.url}")

Parameter response_format (รูปแบบผลลัพธ์)

Response Format (รูปแบบของข้อมูลที่ API ส่งกลับ — เลือกได้ว่าจะรับเป็น URL หรือข้อมูลภาพโดยตรง):

Format	คำอธิบาย	เหมาะกับ
"url"	ส่งกลับ URL ชั่วคราว (หมดอายุใน 1 ชั่วโมง) ค่าเริ่มต้น	แสดงภาพในเว็บทันที
"b64_json"	ส่งกลับข้อมูลภาพในรูปแบบ Base64 (ข้อมูลภาพเข้ารหัสเป็นข้อความ)	บันทึกไฟล์โดยตรง, ไม่อยากพึ่ง URL
import base64

# รับภาพเป็น Base64 และบันทึกเป็นไฟล์
response = client.images.generate(
    model="dall-e-3",
    prompt="A mountain landscape",
    size="1024x1024",
    response_format="b64_json",
)

# Decode (แปลงรหัส — แปลง Base64 กลับเป็นข้อมูลภาพ) และบันทึกไฟล์
image_data = base64.b64decode(response.data[0].b64_json)
with open("output.png", "wb") as f:
    f.write(image_data)
print("บันทึกภาพสำเร็จ: output.png")

ตัวอย่างโค้ดสมบูรณ์
Python — สร้างและบันทึกภาพ
import os
import requests
from openai import OpenAI

client = OpenAI(api_key=os.environ.get("OPENAI_API_KEY"))

def generate_image(prompt: str, output_path: str = "output.png"):
    """สร้างภาพจาก Prompt และบันทึกเป็นไฟล์"""

    print(f"กำลังสร้างภาพ: {prompt}")

    response = client.images.generate(
        model="dall-e-3",
        prompt=prompt,
        size="1024x1024",
        quality="standard",
        style="vivid",
        n=1,
    )

    # แสดง Revised Prompt (Prompt ที่ DALL·E 3 ปรับให้อัตโนมัติ)
    if response.data[0].revised_prompt:
        print(f"Revised Prompt: {response.data[0].revised_prompt}")

    # ดาวน์โหลดและบันทึกภาพ
    image_url = response.data[0].url
    image_response = requests.get(image_url)

    with open(output_path, "wb") as f:
        f.write(image_response.content)

    print(f"บันทึกภาพสำเร็จ: {output_path}")
    return output_path

# ใช้งาน
generate_image(
    prompt="A serene Thai temple at dawn, surrounded by misty mountains, golden light, photorealistic",
    output_path="thai_temple.png"
)

JavaScript/TypeScript — สร้างภาพและแสดงใน Browser
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function generateImage(prompt: string): Promise<string> {
  const response = await openai.images.generate({
    model: "dall-e-3",
    prompt: prompt,
    size: "1024x1024",
    quality: "standard",
    style: "vivid",
    n: 1,
  });

  const imageUrl = response.data[0].url!;
  const revisedPrompt = response.data[0].revised_prompt;

  console.log("Revised Prompt:", revisedPrompt);
  console.log("Image URL:", imageUrl);

  return imageUrl;
}

// ใช้งาน
generateImage("A futuristic Bangkok skyline at night with flying cars")
  .then(url => console.log("สำเร็จ:", url))
  .catch(err => console.error("ผิดพลาด:", err));

ตารางสรุป DALL·E 2 vs DALL·E 3 ใน Generate Endpoint
ความสามารถ	DALL·E 2	DALL·E 3
n (จำนวนภาพ/ครั้ง)	1-10	1 เท่านั้น
size	256, 512, 1024	1024, 1792×1024, 1024×1792
quality	ไม่รองรับ	standard / hd
style	ไม่รองรับ	vivid / natural
Prompt สูงสุด	1,000 ตัวอักษร	4,000 ตัวอักษร
Revised Prompt	ไม่รองรับ	✅ รองรับ
สรุป

Generate Endpoint เป็น API หลักของ DALL·E สำหรับสร้างภาพจากข้อความ DALL·E 3 มีความสามารถสูงกว่า DALL·E 2 มากในด้านคุณภาพและตัวเลือก แต่มีข้อจำกัดที่สร้างได้ครั้งละ 1 ภาพ ในการใช้งานจริงควรเลือก dall-e-3 กับ quality: "hd" สำหรับงานสำคัญ และ dall-e-3 กับ quality: "standard" สำหรับการทดสอบ Prompt

 ก่อนหน้า
ภาพรวม Images API — Authentication และการเริ่มต้นใช้งาน
ถัดไป
Edit Endpoint — แก้ไขและเติมภาพด้วย AI
```

## Page 6 (หน้า 3 / 5)
```text
DALL·E
คู่มืออย่างเป็นทางการ
13 เอกสาร
ระดับกลาง
Edit Endpoint — แก้ไขและเติมภาพด้วย AI

เรียนรู้การใช้ POST /images/edits สำหรับแก้ไขบางส่วนของภาพ (Inpainting) และเติมเต็มภาพ ด้วย DALL·E 2 ·  7 นาที

หน้า 3 / 5
Edit Endpoint — แก้ไขและเติมภาพด้วย AI

อ้างอิงหลัก: OpenAI API Reference — Create image edit

Edit Endpoint คืออะไร

Edit Endpoint (จุดปลายทาง API สำหรับแก้ไขภาพ — รับภาพต้นฉบับพร้อม Prompt แล้วแก้ไขหรือเติมเนื้อหาในภาพ) ช่วยให้คุณสามารถ:

แก้ไขบางส่วนของภาพ โดยใช้ Mask (หน้ากาก — ภาพขาวดำที่บอกว่าส่วนไหนของภาพต้องการแก้ไข)
เติมพื้นที่ว่างในภาพ (Outpainting — การขยายภาพออกไปนอกขอบเดิม)
ลบหรือแทนที่วัตถุ ในภาพ

หมายเหตุสำคัญ: Edit Endpoint รองรับเฉพาะ DALL·E 2 เท่านั้น ไม่รองรับ DALL·E 3

Endpoint:

POST https://api.openai.com/v1/images/edits

Inpainting คืออะไร

Inpainting (แก้ไขบางส่วนของภาพ — เลือกพื้นที่แล้วให้ AI เติมใหม่) คือเทคนิคที่ทำให้คุณระบุส่วนที่ต้องการแก้ไขในภาพโดยใช้ Mask แล้วให้ DALL·E สร้างเนื้อหาใหม่มาแทนที่ในพื้นที่นั้น

ตัวอย่างการใช้ Inpainting:

ลบรถยนต์ออกจากภาพถนน และให้ AI เติมพื้นถนนเปล่าๆ แทน
แทนที่ท้องฟ้าในภาพด้วยท้องฟ้าพระอาทิตย์ตก
เปลี่ยนเสื้อผ้าของบุคคลในภาพ
เพิ่มวัตถุใหม่ในภาพที่มีอยู่
Parameters ของ Edit Endpoint
Parameter	Type	Required	คำอธิบาย
image	file	✅ ต้องมี	ไฟล์ภาพต้นฉบับ (PNG, RGBA, ขนาดไม่เกิน 4MB)
prompt	string	✅ ต้องมี	คำอธิบายภาพที่ต้องการในส่วนที่แก้ไข
mask	file	❌ ไม่บังคับ	ไฟล์ Mask PNG (พื้นที่โปร่งใส = แก้ไข, ทึบแสง = คงเดิม)
model	string	❌ ไม่บังคับ	ต้องเป็น dall-e-2
n	integer	❌ ไม่บังคับ	จำนวนภาพที่สร้าง (1-10, ค่าเริ่มต้น: 1)
size	string	❌ ไม่บังคับ	ขนาดภาพ (256×256, 512×512, 1024×1024)
response_format	string	❌ ไม่บังคับ	url หรือ b64_json
ข้อกำหนดของไฟล์ภาพ
ภาพต้นฉบับ (image)
รูปแบบ: PNG เท่านั้น
ขนาดไฟล์: ไม่เกิน 4MB
ต้องเป็น ภาพสี่เหลี่ยมจัตุรัส (กว้าง = สูง)
ถ้าไม่ใส่ Mask ภาพทั้งหมดจะถูกแก้ไขตาม Prompt
Mask Image (mask)
รูปแบบ: PNG เท่านั้น
ขนาดต้อง เท่ากับภาพต้นฉบับ
พื้นที่ โปร่งใส (Transparent — ไม่มีสี Alpha=0) = บริเวณที่ DALL·E จะแก้ไข
พื้นที่ ทึบแสง (Opaque — สีเต็ม Alpha=255) = บริเวณที่คงเดิมไม่แก้ไข
วิธีสร้าง Mask
วิธีที่ 1: ใช้โปรแกรมแก้ไขภาพ (Photoshop, GIMP)
เปิดภาพต้นฉบับในโปรแกรมแก้ไขภาพ
สร้าง Layer ใหม่ที่มีพื้นหลังสีขาวทึบแสง
วาดสีโปร่งใส (ลบ pixel ออก) ในบริเวณที่ต้องการแก้ไข
บันทึกเป็นไฟล์ PNG ที่มี Alpha Channel (ช่องโปร่งใส — ข้อมูลส่วนที่โปร่งในภาพ)
วิธีที่ 2: สร้าง Mask ด้วย Python และ Pillow
from PIL import Image
import numpy as np

def create_mask(image_path: str, mask_area: tuple, output_path: str = "mask.png"):
    """
    สร้าง Mask สำหรับ DALL·E Edit
    mask_area: (x_start, y_start, x_end, y_end) — พื้นที่ที่ต้องการแก้ไข
    """
    # เปิดภาพต้นฉบับเพื่อดูขนาด
    original = Image.open(image_path)
    width, height = original.size

    # สร้าง Mask ขาวทึบแสง (ไม่แก้ไขอะไร)
    mask = Image.new("RGBA", (width, height), (255, 255, 255, 255))

    # ทำให้พื้นที่ที่ต้องการแก้ไขโปร่งใส
    x1, y1, x2, y2 = mask_area
    mask_array = np.array(mask)
    mask_array[y1:y2, x1:x2] = [0, 0, 0, 0]  # โปร่งใส (Alpha=0)

    # บันทึก Mask
    mask_image = Image.fromarray(mask_array)
    mask_image.save(output_path, "PNG")
    print(f"สร้าง Mask สำเร็จ: {output_path}")
    return output_path

# ตัวอย่าง: สร้าง Mask สำหรับบริเวณตรงกลางของภาพ 1024x1024
create_mask(
    image_path="original.png",
    mask_area=(300, 300, 700, 700),  # พื้นที่ตรงกลาง
    output_path="mask.png"
)

ตัวอย่างการใช้งาน Edit Endpoint
ตัวอย่าง 1: แทนที่ท้องฟ้าในภาพ
import os
from openai import OpenAI

client = OpenAI(api_key=os.environ.get("OPENAI_API_KEY"))

# แทนที่ท้องฟ้า (ส่วนบนของภาพ) ด้วยท้องฟ้าพระอาทิตย์ตก
with open("landscape.png", "rb") as image_file, \
     open("sky_mask.png", "rb") as mask_file:

    response = client.images.edit(
        model="dall-e-2",
        image=image_file,
        mask=mask_file,
        prompt="A dramatic sunset sky with orange and purple clouds",
        size="1024x1024",
        n=1,
    )

new_image_url = response.data[0].url
print(f"ภาพที่แก้ไขแล้ว: {new_image_url}")

ตัวอย่าง 2: เติมพื้นที่ว่าง (ไม่ใช้ Mask)

เมื่อไม่ใส่ Mask ภาพทั้งหมดจะถูกแก้ไขตาม Prompt:

# เปลี่ยนทั้งภาพตาม Prompt ใหม่
with open("photo.png", "rb") as image_file:

    response = client.images.edit(
        model="dall-e-2",
        image=image_file,
        prompt="The same scene but during winter with snow",
        size="1024x1024",
        n=2,  # สร้าง 2 ตัวเลือก
    )

for i, img in enumerate(response.data):
    print(f"ตัวเลือก {i+1}: {img.url}")

ตัวอย่าง 3: ลบวัตถุออกจากภาพ
# ลบบุคคลออกจากภาพ (ต้องสร้าง Mask ที่ครอบคลุมบุคคล)
with open("crowded_street.png", "rb") as image_file, \
     open("person_mask.png", "rb") as mask_file:

    response = client.images.edit(
        model="dall-e-2",
        image=image_file,
        mask=mask_file,
        prompt="An empty street with no people, just the buildings and pavement",
        size="1024x1024",
        n=1,
    )

print(f"ภาพที่ลบบุคคลแล้ว: {response.data[0].url}")

ตัวอย่างด้วย Node.js
import OpenAI from "openai";
import fs from "fs";

const openai = new OpenAI();

async function editImage() {
  const response = await openai.images.edit({
    model: "dall-e-2",
    image: fs.createReadStream("original.png"),
    mask: fs.createReadStream("mask.png"),
    prompt: "A sunlit indoor lounge area with a pool containing a flamingo",
    n: 1,
    size: "1024x1024",
  });

  console.log("URL ภาพที่แก้ไข:", response.data[0].url);
}

editImage();

ตัวอย่าง cURL
curl https://api.openai.com/v1/images/edits \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -F image="@original.png" \
  -F mask="@mask.png" \
  -F prompt="A sunlit indoor lounge area with a pool containing a flamingo" \
  -F n=1 \
  -F size="1024x1024"

ข้อผิดพลาดที่พบบ่อย
ปัญหา	สาเหตุ	วิธีแก้
image must be a PNG	ไฟล์ไม่ใช่ PNG	แปลงเป็น PNG ก่อน
image must be square	ภาพไม่เป็นสี่เหลี่ยมจัตุรัส	ตัดหรือปรับขนาดให้กว้าง = สูง
image too large	ไฟล์เกิน 4MB	บีบอัด (Compress — ลดขนาดไฟล์) ให้เล็กลง
mask and image must be same size	ขนาด Mask ไม่ตรงกับภาพ	ปรับขนาด Mask ให้ตรงกัน
เคล็ดลับการใช้ Edit Endpoint
ทำ Mask ให้ใหญ่กว่าที่ต้องการเล็กน้อย — ให้ AI มีพื้นที่เพียงพอในการสร้างขอบเขตที่เป็นธรรมชาติ
Prompt ควรอธิบายภาพทั้งหมด ไม่ใช่แค่ส่วนที่แก้ไข — บอก AI ถึงบริบทรอบข้างด้วย
สร้างหลาย n แล้วเลือกผลลัพธ์ที่ดีที่สุด — แต่ละครั้งจะได้ผลลัพธ์ที่ต่างกัน
ภาพที่มีเนื้อหาเรียบง่าย มักได้ผลดีกว่าภาพที่ซับซ้อนมาก
สรุป

Edit Endpoint เป็นเครื่องมือทรงพลังสำหรับการแก้ไขภาพที่มีอยู่ด้วย AI โดยใช้เทคนิค Inpainting ผ่านการกำหนด Mask ซึ่งบอก DALL·E 2 ว่าต้องการแก้ไขบริเวณใด แม้จะรองรับเฉพาะ DALL·E 2 และต้องการไฟล์ PNG สี่เหลี่ยมจัตุรัส แต่ความยืดหยุ่นในการแก้ไขภาพทำให้มันมีประโยชน์มากสำหรับงานที่ต้องการปรับแต่งภาพที่มีอยู่แล้ว

 ก่อนหน้า
Generate Endpoint — สร้างภาพจากข้อความ
ถัดไป
Variations Endpoint — สร้างภาพแปรผันจากภาพต้นฉบับ
```

## Page 7 (หน้า 4 / 5)
```text
DALL·E
คู่มืออย่างเป็นทางการ
13 เอกสาร
ระดับกลาง
Variations Endpoint — สร้างภาพแปรผันจากภาพต้นฉบับ

เรียนรู้การใช้ POST /images/variations เพื่อสร้างหลายเวอร์ชันจากภาพต้นฉบับ ด้วย DALL·E 2 ·  5 นาที

หน้า 4 / 5
Variations Endpoint — สร้างภาพแปรผันจากภาพต้นฉบับ

อ้างอิงหลัก: OpenAI API Reference — Create image variation

Variations Endpoint คืออะไร

Variations Endpoint (จุดปลายทาง API สำหรับสร้างภาพแปรผัน — รับภาพต้นฉบับแล้วสร้างภาพใหม่หลายเวอร์ชันที่มีสไตล์คล้ายกันแต่แตกต่างกันในรายละเอียด) เป็นฟีเจอร์เฉพาะของ DALL·E 2 ที่ช่วยให้คุณสร้าง Variation (ภาพแปรผัน — สร้างรูปหลายเวอร์ชันจากภาพต้นฉบับ) ได้หลายแบบจากภาพเพียงภาพเดียว

ใช้กรณีที่:

ต้องการตัวเลือกหลายแบบจากงานออกแบบเดียวกัน
อยากได้ภาพที่ "คล้าย" กับต้นฉบับแต่มีความแตกต่างเล็กน้อย
ต้องการ A/B Testing (ทดสอบ A/B — เปรียบเทียบ 2 เวอร์ชันเพื่อเลือกที่ดีกว่า) ระหว่างหลายตัวเลือก

หมายเหตุ: Variations Endpoint รองรับเฉพาะ DALL·E 2 เท่านั้น

Endpoint:

POST https://api.openai.com/v1/images/variations

Parameters ของ Variations Endpoint
Parameter	Type	Required	คำอธิบาย
image	file	✅ ต้องมี	ไฟล์ภาพต้นฉบับ (PNG, สี่เหลี่ยมจัตุรัส, ไม่เกิน 4MB)
model	string	❌ ไม่บังคับ	ต้องเป็น dall-e-2
n	integer	❌ ไม่บังคับ	จำนวนภาพแปรผัน (1-10, ค่าเริ่มต้น: 1)
size	string	❌ ไม่บังคับ	ขนาดภาพ: 256x256, 512x512, 1024x1024
response_format	string	❌ ไม่บังคับ	url หรือ b64_json
user	string	❌ ไม่บังคับ	ID ผู้ใช้สำหรับติดตาม
ข้อกำหนดของไฟล์ภาพ
รูปแบบ: PNG เท่านั้น
ขนาดไฟล์: ไม่เกิน 4MB
ขนาดภาพ: ต้องเป็น สี่เหลี่ยมจัตุรัส (กว้าง = สูง)
ไม่จำเป็นต้องมี Alpha Channel (ช่องโปร่งใส)
ตัวอย่างการใช้งาน
Python — สร้าง Variation จำนวนมาก
import os
import requests
from openai import OpenAI

client = OpenAI(api_key=os.environ.get("OPENAI_API_KEY"))

def create_variations(image_path: str, num_variations: int = 4):
    """สร้างภาพแปรผันจากภาพต้นฉบับ"""

    print(f"กำลังสร้าง {num_variations} Variation จาก: {image_path}")

    with open(image_path, "rb") as image_file:
        response = client.images.create_variation(
            model="dall-e-2",
            image=image_file,
            n=num_variations,
            size="1024x1024",
        )

    # บันทึกทุกภาพ
    for i, image_data in enumerate(response.data):
        url = image_data.url
        img_response = requests.get(url)

        output_path = f"variation_{i+1}.png"
        with open(output_path, "wb") as f:
            f.write(img_response.content)

        print(f"บันทึก Variation {i+1}: {output_path}")

    return [img.url for img in response.data]

# ใช้งาน
urls = create_variations("original_logo.png", num_variations=4)
print(f"สร้างสำเร็จ {len(urls)} Variation")

Python — รับผลลัพธ์เป็น Base64
import base64
import os
from openai import OpenAI

client = OpenAI(api_key=os.environ.get("OPENAI_API_KEY"))

with open("original.png", "rb") as image_file:
    response = client.images.create_variation(
        model="dall-e-2",
        image=image_file,
        n=2,
        size="512x512",
        response_format="b64_json",  # รับข้อมูลภาพโดยตรง
    )

# บันทึกแต่ละ Variation
for i, img_data in enumerate(response.data):
    image_bytes = base64.b64decode(img_data.b64_json)
    output_file = f"variation_{i+1}.png"

    with open(output_file, "wb") as f:
        f.write(image_bytes)

    print(f"บันทึก: {output_file}")

Node.js — สร้าง Variation
import OpenAI from "openai";
import fs from "fs";

const openai = new OpenAI();

async function createVariations(imagePath: string, count: number = 3) {
  const response = await openai.images.createVariation({
    model: "dall-e-2",
    image: fs.createReadStream(imagePath),
    n: count,
    size: "1024x1024",
  });

  response.data.forEach((image, index) => {
    console.log(`Variation ${index + 1}: ${image.url}`);
  });

  return response.data.map(img => img.url);
}

// ใช้งาน
createVariations("logo.png", 4);

cURL — คำสั่งตรง
curl https://api.openai.com/v1/images/variations \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -F image="@original.png" \
  -F n=4 \
  -F size="1024x1024"

ความแตกต่างระหว่าง Variations กับ Generation
คุณสมบัติ	Generate Endpoint	Variations Endpoint
Input (ข้อมูลนำเข้า)	Prompt (ข้อความ)	ภาพต้นฉบับ
ผลลัพธ์	ภาพใหม่ตาม Prompt	ภาพที่คล้ายต้นฉบับ
การควบคุม	ควบคุมผ่าน Prompt	ควบคุมน้อยกว่า
โมเดลที่รองรับ	DALL·E 2 และ 3	DALL·E 2 เท่านั้น
กรณีใช้งานจริง
1. ทดสอบหลายแบบสำหรับโลโก้
# อัปโหลดโลโก้ต้นแบบและสร้างหลายเวอร์ชัน
create_variations("company_logo_draft.png", num_variations=5)
# เลือกเวอร์ชันที่ชอบจาก 5 ตัวเลือก

2. สร้าง Avatar หลายแบบ
# สร้าง Avatar หลายสไตล์จากภาพต้นแบบ
create_variations("character_design.png", num_variations=6)

3. ภาพสินค้าหลายมุม
# สร้างภาพสินค้าหลายเวอร์ชันจากภาพต้นฉบับเดียว
create_variations("product_photo.png", num_variations=4)

เคล็ดลับการใช้ Variations
ยิ่งภาพต้นฉบับชัดเจน ยิ่งได้ผลดี — ภาพที่มีองค์ประกอบหลักชัดเจนจะให้ Variation ที่ดีกว่า
ลองขนาดต่างๆ — 512x512 เร็วกว่าและถูกกว่า เหมาะกับการทดสอบ
สร้างทีละมาก — การส่ง n=8 ครั้งเดียวจะเร็วกว่าการส่ง n=1 แปดครั้ง
เก็บภาพทันที — URL หมดอายุใน 1 ชั่วโมง ควรดาวน์โหลดหรือบันทึกทันที
ข้อผิดพลาดที่พบบ่อย
ปัญหา	สาเหตุ	วิธีแก้
invalid image format	ไฟล์ไม่ใช่ PNG	แปลงเป็น PNG ก่อน
image must be square	ภาพไม่เป็นสี่เหลี่ยมจัตุรัส	ปรับขนาดให้ Width = Height
file size too large	ไฟล์เกิน 4MB	บีบอัดหรือลดความละเอียด
n must be between 1 and 10	ระบุ n เกิน 10	ลด n ให้ไม่เกิน 10
สรุป

Variations Endpoint เป็นเครื่องมือที่ดีสำหรับการสร้างตัวเลือกหลายแบบจากภาพต้นฉบับเดียว เหมาะกับงานออกแบบที่ต้องการหลาย Iteration (การทำซ้ำ — สร้างหลายเวอร์ชันแล้วเลือกที่ดีที่สุด) แม้จะรองรับเฉพาะ DALL·E 2 และไม่มี Prompt ในการควบคุม แต่ความสะดวกในการสร้างหลายตัวเลือกทำให้มีประโยชน์มากในงาน Creative

 ก่อนหน้า
Edit Endpoint — แก้ไขและเติมภาพด้วย AI
ถัดไป
ขนาด รูปแบบ และคุณภาพภาพ — Size, Format, Quality
```

## Page 8 (หน้า 5 / 5)
```text
DALL·E
คู่มืออย่างเป็นทางการ
13 เอกสาร
ระดับกลาง
ขนาด รูปแบบ และคุณภาพภาพ — Size, Format, Quality

คู่มือครบถ้วนเรื่องขนาดภาพที่รองรับ รูปแบบไฟล์ผลลัพธ์ และการตั้งค่าคุณภาพ standard vs hd สำหรับแต่ละโมเดล ·  6 นาที

หน้า 5 / 5
ขนาด รูปแบบ และคุณภาพภาพ — Size, Format, Quality

อ้างอิงหลัก: OpenAI Images API Reference

ภาพรวม

เมื่อใช้ DALL·E API คุณสามารถควบคุมผลลัพธ์ของภาพได้ผ่านตัวเลือกสำคัญ 3 อย่าง:

Size (ขนาดภาพ — ความกว้างxความสูงของภาพในหน่วย pixel)
Response Format (รูปแบบผลลัพธ์ — วิธีที่ API ส่งภาพกลับมา)
Quality (คุณภาพ — ระดับรายละเอียดและความคมชัด สำหรับ DALL·E 3 เท่านั้น)
Size (ขนาดภาพ)
DALL·E 3 — Sizes ที่รองรับ
Size	Orientation	ใช้กับงานประเภทไหน
1024x1024	Square (สี่เหลี่ยมจัตุรัส)	โพสต์โซเชียล, โปรไฟล์, โลโก้, Thumbnail
1792x1024	Landscape (แนวนอน — กว้างกว่าสูง)	วอลเปเปอร์, แบนเนอร์เว็บ, ฉากกว้าง
1024x1792	Portrait (แนวตั้ง — สูงกว่ากว้าง)	Story บน Instagram, โปสเตอร์, เนื้อหามือถือ
DALL·E 2 — Sizes ที่รองรับ
Size	จำนวน Pixel รวม	ใช้กับงานประเภทไหน
256x256	65,536 px	ไอคอน, Thumbnail เล็ก, ทดสอบ Prompt
512x512	262,144 px	ภาพขนาดกลาง, ทดสอบ, ประหยัดค่าใช้จ่าย
1024x1024	1,048,576 px	ภาพคุณภาพสูง, งาน Final
เปรียบเทียบขนาดภาพ
DALL·E 3:                          DALL·E 2:
┌─────────┐  ┌──────────────────┐  ┌──┐ ┌────┐ ┌────────┐
│         │  │                  │  │  │ │    │ │        │
│1024x1024│  │   1792x1024      │  │  │ │    │ │        │
│         │  │                  │  └──┘ └────┘ │        │
└─────────┘  └──────────────────┘  256  512    │        │
                                               └────────┘
  1024                                           1024
  x1792

Quality (คุณภาพ)

Quality (คุณภาพ — ระดับความพยายามในการสร้างรายละเอียดของภาพ) รองรับเฉพาะ DALL·E 3 เท่านั้น

standard — คุณภาพมาตรฐาน
การสร้างภาพปกติ รวดเร็ว
เหมาะกับการทดสอบ Prompt และงานที่ไม่ต้องการรายละเอียดสูงสุด
ราคาถูกกว่า hd
hd — คุณภาพสูง (High Definition)
กระบวนการสร้างภาพที่ละเอียดมากขึ้น
รายละเอียดและความสม่ำเสมอของภาพดีขึ้น
เส้นขอบชัดเจนกว่า รายละเอียดเล็กๆ ชัดขึ้น
ราคาแพงกว่า standard ประมาณ 2 เท่า
เหมาะกับงาน Final หรืองานที่ต้องการคุณภาพสูงสุด
เมื่อไหรที่ควรใช้ hd

ใช้ hd เมื่อ:

ภาพจะถูกพิมพ์หรือแสดงขนาดใหญ่
งานที่มีรายละเอียดสถาปัตยกรรม เครื่องประดับ หรือพื้นผิวซับซ้อน
ภาพ Final ที่จะนำไปใช้จริงใน Production (การใช้งานจริง — ระบบที่ผู้ใช้จริงเห็น)
Portrait ที่ต้องการรายละเอียดใบหน้าสูง

ใช้ standard เมื่อ:

ทดสอบ Prompt หาแบบที่ต้องการก่อน
สร้างภาพจำนวนมาก เช่น Batch Processing (การประมวลผลแบบกลุ่ม — สร้างหลายภาพพร้อมกัน)
ภาพที่ใช้ชั่วคราว
# ทดสอบด้วย standard ก่อน
test_response = client.images.generate(
    model="dall-e-3",
    prompt="A detailed architectural blueprint of a modern house",
    size="1024x1024",
    quality="standard",  # ทดสอบก่อน
)

# เมื่อพอใจกับ Prompt แล้ว สร้างใหม่ด้วย hd
final_response = client.images.generate(
    model="dall-e-3",
    prompt="A detailed architectural blueprint of a modern house",
    size="1024x1024",
    quality="hd",  # สำหรับงาน Final
)

Style (สไตล์) — เฉพาะ DALL·E 3

Style (สไตล์ภาพ — เช่น vivid สีสันจัด, natural ดูเป็นธรรมชาติ) ควบคุมลักษณะโดยรวมของภาพ:

vivid — สีสันสดใส (ค่าเริ่มต้น)
สีสดใส คมชัด
ดูดราม่า มีชีวิตชีวา
เหมาะกับงาน Illustration (ภาพประกอบ), Fantasy Art, โฆษณา
ภาพมักดู "เกินจริง" นิดหน่อย
natural — สีธรรมชาติ
สีสมจริง ไม่สด
ดูเป็นภาพถ่ายจริงมากกว่า
เหมาะกับ Photorealistic (ภาพสมจริงเหมือนภาพถ่าย), Documentary (สารคดี), ภาพบุคคล
ภาพดูธรรมชาติและเรียบกว่า
# vivid — เหมาะกับงาน Fantasy และ Illustration
vivid_response = client.images.generate(
    model="dall-e-3",
    prompt="A mystical forest with glowing mushrooms",
    size="1024x1024",
    style="vivid",
)

# natural — เหมาะกับภาพสมจริง
natural_response = client.images.generate(
    model="dall-e-3",
    prompt="A quiet morning at a Thai rice paddy",
    size="1024x1024",
    style="natural",
)

Response Format (รูปแบบผลลัพธ์)

Response Format (รูปแบบของข้อมูลที่ API ส่งกลับ — เลือกว่าจะรับเป็น URL หรือข้อมูลภาพโดยตรง) ควบคุมวิธีที่ API ส่งภาพกลับมา:

url — URL ชั่วคราว (ค่าเริ่มต้น)
{
  "data": [
    {
      "url": "https://oaidalleapiprodscus.blob.core.windows.net/private/..."
    }
  ]
}

ได้รับ HTTPS URL สำหรับดาวน์โหลดภาพ
URL หมดอายุหลัง 1 ชั่วโมง
เหมาะสำหรับแสดงภาพในเว็บหรือแอปทันที
ต้องดาวน์โหลดไฟล์แยกต่างหากถ้าต้องการเก็บ
b64_json — Base64 JSON
{
  "data": [
    {
      "b64_json": "iVBORw0KGgoAAAANSUhEUgAA..."
    }
  ]
}

ได้รับข้อมูลภาพในรูปแบบ Base64 String (ข้อมูลภาพเข้ารหัสเป็นข้อความ — สามารถแปลงกลับเป็นไฟล์ได้)
ไม่มีวันหมดอายุ
เหมาะสำหรับบันทึกไฟล์ทันทีโดยไม่ผ่าน URL
Response Size (ขนาดของข้อมูลที่ตอบกลับ) ใหญ่กว่า url มาก
import base64

# รับเป็น base64 และบันทึกไฟล์ทันที
response = client.images.generate(
    model="dall-e-3",
    prompt="A beautiful Thai temple",
    size="1024x1024",
    response_format="b64_json",
)

# แปลง Base64 กลับเป็นไฟล์
image_data = base64.b64decode(response.data[0].b64_json)
with open("temple.png", "wb") as f:
    f.write(image_data)
print("บันทึกสำเร็จ!")

ตารางสรุปตัวเลือกทั้งหมด
DALL·E 3
Parameter	ค่าที่รองรับ	ค่าเริ่มต้น
size	1024x1024, 1792x1024, 1024x1792	1024x1024
quality	standard, hd	standard
style	vivid, natural	vivid
response_format	url, b64_json	url
n	1 เท่านั้น	1
DALL·E 2
Parameter	ค่าที่รองรับ	ค่าเริ่มต้น
size	256x256, 512x512, 1024x1024	1024x1024
quality	ไม่รองรับ	—
style	ไม่รองรับ	—
response_format	url, b64_json	url
n	1-10	1
คำแนะนำในการเลือก Size
สำหรับโซเชียลมีเดีย
Platform	Size ที่แนะนำ
Instagram Post	1024x1024 (square)
Instagram Story	1024x1792 (portrait)
Facebook Cover	1792x1024 (landscape)
Twitter Header	1792x1024 (landscape)
LinkedIn Post	1024x1024 (square)
สำหรับเว็บไซต์
การใช้งาน	Size ที่แนะนำ
Hero Banner (แบนเนอร์หลักบนเว็บ)	1792x1024 (landscape)
Blog Thumbnail	1024x1024 (square)
Mobile Content	1024x1792 (portrait)
Icon / Logo	1024x1024 → ย่อขนาดภายหลัง
สรุป

การเลือก Size, Quality, Style และ Response Format ที่เหมาะสมจะช่วยให้ได้ภาพที่ตรงความต้องการและคุ้มค่าเงิน สูตรง่ายๆ คือ: ทดสอบ Prompt ด้วย standard + 1024x1024 ก่อน เมื่อพอใจแล้วสร้างงาน Final ด้วย hd + ขนาดที่เหมาะกับการใช้งาน

 ก่อนหน้า
Variations Endpoint — สร้างภาพแปรผันจากภาพต้นฉบับ
ถัดไป
Content Policy — นโยบายเนื้อหาและการใช้งานที่ปลอดภัย
```

## Page 9 (หน้า 1 / 5)
```text
DALL·E
คู่มืออย่างเป็นทางการ
13 เอกสาร
ขั้นโปร
Content Policy — นโยบายเนื้อหาและการใช้งานที่ปลอดภัย

เข้าใจนโยบายเนื้อหาของ DALL·E ว่าภาพประเภทใดที่ไม่อนุญาต เหตุผลเบื้องหลัง และวิธีเขียน Prompt ที่ผ่านระบบกรอง ·  6 นาที

หน้า 1 / 5
Content Policy — นโยบายเนื้อหาและการใช้งานที่ปลอดภัย

อ้างอิงหลัก: OpenAI Usage Policies | DALL·E Content Policy

Content Policy คืออะไร

Content Policy (นโยบายเนื้อหา — กฎเกณฑ์ที่ OpenAI กำหนดว่าภาพประเภทใดที่ DALL·E อนุญาตหรือไม่อนุญาตให้สร้าง) คือชุดกฎที่ OpenAI สร้างขึ้นเพื่อ:

ป้องกันการสร้างเนื้อหาที่เป็นอันตรายต่อสังคม
ปกป้องผู้คนจากการถูกนำภาพไปใช้ในทางที่ผิด
ป้องกันลิขสิทธิ์และทรัพย์สินทางปัญญา
รักษาความปลอดภัยในการใช้งาน AI

DALL·E มีระบบ Safety System (ระบบความปลอดภัย — โปรแกรมที่ตรวจสอบทั้ง Prompt และภาพที่สร้างเพื่อกรองเนื้อหาที่ไม่เหมาะสม) ที่ทำงานอัตโนมัติทั้งก่อนสร้างภาพ (ตรวจสอบ Prompt) และหลังสร้างภาพ (ตรวจสอบภาพผลลัพธ์)

เนื้อหาที่ไม่อนุญาต
1. เนื้อหาสำหรับผู้ใหญ่ (Explicit Adult Content)

DALL·E ไม่อนุญาตสร้างภาพที่มี:

ภาพเปลือยทางเพศ (Nudity)
เนื้อหาทางเพศที่ชัดเจน (Explicit Sexual Content)
เนื้อหาที่มีเยาวชนในบริบททางเพศ (เป็นเรื่องผิดกฎหมายในทุกกรณี)
2. ความรุนแรง (Violence)

ไม่อนุญาตภาพที่:

แสดงความรุนแรงรุนแรงมากเกินไป เช่น ภาพกราฟิกที่แสดงการบาดเจ็บหนัก
ส่งเสริมการทรมาน
แสดงฉากการตายที่รุนแรง

หมายเหตุ: ภาพสงครามในประวัติศาสตร์, ภาพยนตร์ Action หรือเกมอาจได้รับอนุญาตในบริบทที่เหมาะสม

3. เนื้อหาที่สร้างความเกลียดชัง (Hate Speech / Hateful Content)

ไม่อนุญาตภาพที่:

แสดงการเลือกปฏิบัติทางเชื้อชาติ ศาสนา เพศ หรืออัตลักษณ์
ใช้สัญลักษณ์ที่เกี่ยวข้องกับกลุ่มเกลียดชัง (Hate Groups)
ส่งเสริมอุดมการณ์สุดโต่ง
4. บุคคลมีชื่อเสียง (Real People)

DALL·E มีข้อจำกัดเกี่ยวกับการสร้างภาพของ:

บุคคลสาธารณะในสถานการณ์ที่ทำให้เสียหาย
ผู้นำการเมืองในภาพที่มีนัยยะทางการเมือง
บุคคลใดก็ตามในบริบทที่อาจเป็น Deepfake (ภาพปลอม — ภาพที่สร้างด้วย AI เพื่อหลอกว่าเป็นภาพจริงของบุคคลนั้น)

เคล็ดลับ: แทนที่จะขอ "ภาพของ [ชื่อนักการเมือง]" ให้อธิบายลักษณะที่ต้องการแทน

5. การละเมิดลิขสิทธิ์ (Copyright Infringement)

ไม่อนุญาตภาพที่:

คัดลอกงานศิลปะของศิลปินเฉพาะเจาะจงโดยตรง
สร้างตัวละครที่มีเจ้าของลิขสิทธิ์ชัดเจน (เช่น Mickey Mouse, Superman)
เลียนแบบโลโก้หรือแบรนด์ที่มีจดทะเบียน

หมายเหตุ: การอ้างอิง "สไตล์" ของศิลปิน (เช่น "in the style of Monet") ต่างจากการ "คัดลอก" งานนั้น — อ้างอิงสไตล์โดยทั่วไปมักได้รับอนุญาต

6. ข้อมูลอันตราย (Dangerous Information)

ไม่อนุญาตภาพที่อาจถูกนำไปใช้ในทางอันตราย:

ภาพคู่มือการสร้างอาวุธ
ภาพที่แสดงการทำ Phishing (การหลอกลวงเพื่อขโมยข้อมูล) หรือ Scam
ภาพที่ส่งเสริมพฤติกรรมอันตรายต่อสุขภาพ
ระบบ Safety ทำงานอย่างไร

DALL·E ใช้ระบบตรวจสอบหลายชั้น:

ชั้นที่ 1: ตรวจสอบ Prompt

ก่อนสร้างภาพ ระบบจะวิเคราะห์ Prompt ที่คุณส่งมาเพื่อตรวจหาเนื้อหาที่ละเมิดนโยบาย ถ้าพบจะปฏิเสธทันทีโดยไม่สร้างภาพ

ชั้นที่ 2: ตรวจสอบภาพที่สร้าง

แม้ Prompt ผ่านการตรวจสอบ แต่ภาพที่สร้างก็ยังถูกตรวจสอบอีกครั้ง ถ้าภาพที่ออกมามีเนื้อหาไม่เหมาะสมจะถูกบล็อก

ชั้นที่ 3: Revised Prompt (DALL·E 3)

DALL·E 3 จะแก้ไข Prompt อัตโนมัติเพื่อหลีกเลี่ยงปัญหา Content Policy บางกรณี เช่น ลบชื่อบุคคลจริงออกจาก Prompt

ชั้นที่ 4: การรายงานและตรวจสอบหลังใช้งาน

OpenAI มีระบบ Monitor (ตรวจสอบ — ติดตามการใช้งาน) เพื่อตรวจหาพฤติกรรมที่ผิดปกติ บัญชีที่ละเมิดนโยบายซ้ำๆ อาจถูกระงับ (Suspend)

สิ่งที่ยังทำได้

เพื่อป้องกันความเข้าใจผิด สิ่งเหล่านี้ยังได้รับอนุญาต:

ภาพความรุนแรงในระดับปานกลาง เช่น ฉากสงครามประวัติศาสตร์ในบริบทการศึกษา
ภาพศิลปะนู้ดในลักษณะ Fine Art ที่ไม่ใช่เนื้อหาทางเพศ (ขึ้นอยู่กับบริบทและแพลตฟอร์ม)
ตัวละครสมมติที่ไม่มีลิขสิทธิ์ชัดเจน
ภาพสัตว์ประหลาด สิ่งมีชีวิตสมมติ ภาพ Fantasy ทั่วไป
ภาพที่อ้างอิง "สไตล์" ของศิลปิน (ไม่ใช่การคัดลอกงานเฉพาะเจาะจง)
ภาพการ์ตูนหรือ Illustration ที่มีเนื้อหาเหมาะสม
วิธีรับมือเมื่อถูกปฏิเสธ

เมื่อ DALL·E ปฏิเสธ Prompt คุณจะได้รับข้อความแจ้ง เช่น:

"Your request was rejected as a result of our safety system.
Your prompt may contain text that is not allowed by our safety system."

แนวทางแก้ไข

1. ระบุบริบทที่ชัดเจน

แทนที่จะ: "A person being hurt"
ลองใช้: "A historical painting showing the aftermath of a medieval battle, educational illustration"

2. หลีกเลี่ยงคำที่มีความหมายสองแง่

บางคำที่ดูไม่มีปัญหาอาจถูกระบบตรวจจับ ลองเปลี่ยนคำใหม่

3. เพิ่มบริบทสำหรับงานสร้างสรรค์

"for a children's book illustration"
"concept art for a science fiction film"
"educational diagram for a science textbook"

4. แบ่ง Prompt ให้สั้นลง

บาง Prompt ยาวที่รวมหลายองค์ประกอบอาจทำให้ระบบตีความผิด ลองแบ่งเป็น Prompt ย่อยๆ

นโยบายการใช้ภาพที่สร้าง
สิทธิ์การใช้งาน

ตามนโยบาย OpenAI ผู้ใช้ที่สร้างภาพผ่าน DALL·E มีสิทธิ์ใช้งานภาพนั้น รวมถึง:

Commercial Use (การใช้งานเชิงพาณิชย์ — ขาย, พิมพ์, ใช้ในโฆษณา) ✅
Personal Use (การใช้ส่วนตัว) ✅
Modification (การดัดแปลง) ✅
Distribution (การเผยแพร่) ✅
สิ่งที่ห้ามทำกับภาพที่สร้าง
ใช้เพื่อสร้างเนื้อหาที่ละเมิดนโยบาย
อ้างว่าภาพที่สร้างด้วย AI เป็นภาพถ่ายจริงในบริบทที่อาจหลอกลวง
ใช้ภาพเพื่อทำ Deepfake หรือใส่ร้ายบุคคล
ความปลอดภัยของข้อมูล

OpenAI เก็บ Prompt และภาพที่สร้างตาม Privacy Policy อย่างไรก็ตาม:

อย่าส่งข้อมูลส่วนตัว เช่น ชื่อ-นามสกุล ที่อยู่ เลขบัตรประชาชน ใน Prompt
อย่าส่งภาพที่มีข้อมูลลับ เช่น ภาพเอกสารราชการ ข้อมูลธุรกิจลับ
API Key ควรเก็บเป็นความลับและไม่ควรเขียนลงใน Source Code โดยตรง
สรุป

Content Policy ของ DALL·E ออกแบบมาเพื่อป้องกันการใช้งานที่เป็นอันตราย ในขณะเดียวกันก็เปิดกว้างสำหรับงานสร้างสรรค์ที่หลากหลาย การเข้าใจนโยบายเหล่านี้จะช่วยให้คุณเขียน Prompt ที่ผ่านระบบกรองได้ง่ายขึ้น และใช้งาน DALL·E ได้อย่างมีประสิทธิภาพและรับผิดชอบ

 ก่อนหน้า
ขนาด รูปแบบ และคุณภาพภาพ — Size, Format, Quality
ถัดไป
Rate Limits และราคา — ขีดจำกัดและค่าใช้จ่าย
```

## Page 10 (หน้า 2 / 5)
```text
DALL·E
คู่มืออย่างเป็นทางการ
13 เอกสาร
ขั้นโปร
Rate Limits และราคา — ขีดจำกัดและค่าใช้จ่าย

ข้อมูลครบถ้วนเรื่อง Rate Limits ของ DALL·E API จำนวนภาพที่สร้างได้ต่อนาที ราคาต่อภาพแต่ละขนาดและคุณภาพ ·  5 นาที

หน้า 2 / 5
Rate Limits และราคา — ขีดจำกัดและค่าใช้จ่าย

อ้างอิงหลัก: OpenAI Rate Limits | OpenAI Pricing

Rate Limits คืออะไร

Rate Limits (ขีดจำกัดอัตราการใช้งาน — จำนวนครั้งสูงสุดที่คุณเรียก API ได้ในช่วงเวลาหนึ่ง เพื่อป้องกันการใช้งานเกินควร) ของ DALL·E API กำหนดว่าในแต่ละนาทีคุณสร้างภาพได้กี่ภาพ

หน่วยวัด Rate Limits
RPM — Requests Per Minute (จำนวน Request ต่อนาที — นับจำนวนครั้งที่ส่งคำขอไปยัง API ต่อนาที)
IPM — Images Per Minute (จำนวนภาพต่อนาที — นับจำนวนภาพทั้งหมดที่สร้างต่อนาที)
Rate Limits แต่ละโมเดล
DALL·E 3
Tier	RPM	IPM
Free / Trial	1 RPM	1 IPM
Tier 1	5 RPM	5 IPM
Tier 2	7 RPM	7 IPM
Tier 3	7 RPM	7 IPM
Tier 4	15 RPM	15 IPM
Tier 5	50 RPM	50 IPM
DALL·E 2
Tier	RPM	IPM
Free / Trial	5 RPM	5 IPM
Tier 1	20 RPM	40 IPM
Tier 2	40 RPM	40 IPM
Tier 3	60 RPM	60 IPM
Tier 4	100 RPM	100 IPM
Tier 5	200 RPM	200 IPM

หมายเหตุ: DALL·E 2 มี Rate Limits สูงกว่า DALL·E 3 เนื่องจาก DALL·E 3 ใช้ทรัพยากรในการสร้างภาพมากกว่า

Tier System (ระบบระดับการเข้าถึง)

OpenAI แบ่งระดับการเข้าถึง API ออกเป็น Tier (ระดับ — กลุ่มผู้ใช้ที่มีสิทธิ์และขีดจำกัดแตกต่างกัน):

Tier	เงื่อนไขการเลื่อนระดับ
Free	สมัครบัญชีใหม่
Tier 1	ชำระเงินครั้งแรก $5+
Tier 2	ใช้ API ไปแล้ว $50+ และผ่านไป 7 วันนับจาก Tier 1
Tier 3	ใช้ API ไปแล้ว $100+ และผ่านไป 7 วันนับจาก Tier 2
Tier 4	ใช้ API ไปแล้ว $250+ และผ่านไป 14 วันนับจาก Tier 3
Tier 5	ใช้ API ไปแล้ว $1,000+ และผ่านไป 30 วันนับจาก Tier 4
ราคา DALL·E 3

DALL·E 3 คิดราคาตามขนาดและคุณภาพ:

Standard Quality
Size	ราคา/ภาพ
1024x1024	$0.040
1024x1792	$0.080
1792x1024	$0.080
HD Quality
Size	ราคา/ภาพ
1024x1024	$0.080
1024x1792	$0.120
1792x1024	$0.120
ราคา DALL·E 2

DALL·E 2 ถูกกว่า DALL·E 3 มาก:

Size	ราคา/ภาพ
1024x1024	$0.020
512x512	$0.018
256x256	$0.016
เปรียบเทียบราคา DALL·E 2 vs DALL·E 3
โมเดล	Size	Quality	ราคา/ภาพ
DALL·E 2	256x256	-	$0.016 (ถูกสุด)
DALL·E 2	512x512	-	$0.018
DALL·E 2	1024x1024	-	$0.020
DALL·E 3	1024x1024	standard	$0.040
DALL·E 3	1024x1792	standard	$0.080
DALL·E 3	1024x1024	hd	$0.080
DALL·E 3	1024x1792	hd	$0.120 (แพงสุด)
วิธีคำนวณค่าใช้จ่าย
ตัวอย่างที่ 1: สร้างภาพบล็อก 100 ภาพ

สถานการณ์: เว็บบล็อกต้องการภาพประกอบ 100 ภาพ/เดือน ขนาด 1024x1024 DALL·E 3 Standard

จำนวน: 100 ภาพ
ราคา: $0.040/ภาพ
รวม: 100 × $0.040 = $4.00/เดือน

ตัวอย่างที่ 2: แอปสร้างภาพสำหรับ 1,000 ผู้ใช้

สถานการณ์: แอปที่ผู้ใช้แต่ละคนสร้างภาพ 5 ภาพ/วัน ขนาด 1024x1024 DALL·E 3 Standard

จำนวน: 1,000 × 5 = 5,000 ภาพ/วัน
ราคา: $0.040/ภาพ
รวม/วัน: 5,000 × $0.040 = $200/วัน
รวม/เดือน: $200 × 30 = $6,000/เดือน

ตัวอย่างที่ 3: ทดสอบ Prompt ประหยัดค่าใช้จ่าย

สถานการณ์: ทดสอบ Prompt 50 ครั้ง ใช้ DALL·E 2 512x512 แทน DALL·E 3

DALL·E 2 512x512: 50 × $0.018 = $0.90
DALL·E 3 Standard: 50 × $0.040 = $2.00
ประหยัดได้: $1.10 (55%)

เทคนิคประหยัดค่าใช้จ่าย
1. ทดสอบด้วย DALL·E 2 ก่อน

เมื่อพัฒนาและทดสอบ Prompt ใช้ DALL·E 2 ซึ่งถูกกว่ามาก แล้วเปลี่ยนมาใช้ DALL·E 3 ตอนจะสร้างงาน Final

2. ใช้ standard ในระหว่างทดสอบ
# ทดสอบ — ถูก
test = client.images.generate(
    model="dall-e-3",
    prompt=your_prompt,
    quality="standard",  # $0.040
)

# Final — แพงกว่าแต่คุณภาพสูง
final = client.images.generate(
    model="dall-e-3",
    prompt=your_prompt,
    quality="hd",  # $0.080
)

3. ตั้ง Budget Alert (การแจ้งเตือนงบประมาณ)

ใน OpenAI Dashboard ตั้งค่า Spending Limit (ขีดจำกัดการใช้จ่าย) เพื่อไม่ให้เกินงบ:

ไปที่ platform.openai.com/settings/billing
ตั้ง Monthly Budget (งบประมาณรายเดือน)
ตั้ง Email Alert (การแจ้งเตือนทางอีเมล) เมื่อถึง 80% ของงบ
4. Cache ผลลัพธ์ที่ใช้บ่อย
import hashlib
import json
import os

def generate_with_cache(prompt: str, **kwargs) -> str:
    """สร้างภาพพร้อม Caching (การเก็บผลลัพธ์ไว้ใช้ซ้ำ — ไม่ต้องเรียก API ซ้ำสำหรับ Prompt เดิม)"""

    # สร้าง Cache Key จาก Prompt และ Parameters
    cache_key = hashlib.md5(
        json.dumps({"prompt": prompt, **kwargs}, sort_keys=True).encode()
    ).hexdigest()

    cache_path = f"cache/{cache_key}.png"

    # ถ้ามีในแคชแล้ว ใช้จาก Cache แทน
    if os.path.exists(cache_path):
        print("ใช้ภาพจาก Cache (ประหยัดค่าใช้จ่าย)")
        return cache_path

    # ถ้าไม่มี ค่อยเรียก API
    response = client.images.generate(prompt=prompt, **kwargs)
    # ... บันทึกและ return

การจัดการเมื่อเกิน Rate Limit

เมื่อเกิน Rate Limit API จะตอบกลับด้วย HTTP 429:

{
  "error": {
    "message": "Rate limit reached for images per minute...",
    "type": "requests",
    "code": "rate_limit_exceeded"
  }
}

วิธีจัดการด้วย Exponential Backoff (การรอแบบเพิ่มเวลาทีละขั้น — รอ 1 วินาที, 2, 4, 8... ก่อนลองใหม่)
import time
import random
from openai import OpenAI, RateLimitError

client = OpenAI()

def generate_with_retry(prompt: str, max_retries: int = 5):
    """สร้างภาพพร้อม Retry อัตโนมัติเมื่อเกิน Rate Limit"""

    for attempt in range(max_retries):
        try:
            response = client.images.generate(
                model="dall-e-3",
                prompt=prompt,
                size="1024x1024",
            )
            return response.data[0].url

        except RateLimitError:
            if attempt == max_retries - 1:
                raise  # ลองครบแล้ว ยอมแพ้

            # คำนวณเวลารอแบบ Exponential Backoff
            wait_time = (2 ** attempt) + random.uniform(0, 1)
            print(f"Rate limit เกิน รอ {wait_time:.1f} วินาทีก่อนลองใหม่...")
            time.sleep(wait_time)

# ใช้งาน
url = generate_with_retry("A beautiful sunset")
print(f"สำเร็จ: {url}")

ตรวจสอบการใช้งาน

ดูปริมาณการใช้งานและค่าใช้จ่ายได้ที่:

Usage Dashboard: platform.openai.com/usage
Billing: platform.openai.com/settings/billing
สรุป

Rate Limits และราคาของ DALL·E API แตกต่างกันตาม Tier และโมเดลที่ใช้ DALL·E 3 มีคุณภาพสูงกว่าแต่ราคาแพงกว่าและ Rate Limits ต่ำกว่า ส่วน DALL·E 2 ถูกกว่าและมี Rate Limits สูงกว่า เหมาะกับการทดสอบหรือใช้งานปริมาณมาก การวางแผนการใช้งานที่ดีและ Cache ผลลัพธ์จะช่วยประหยัดค่าใช้จ่ายได้อย่างมีนัยสำคัญ

 ก่อนหน้า
Content Policy — นโยบายเนื้อหาและการใช้งานที่ปลอดภัย
ถัดไป
Best Practices — แนวทางปฏิบัติที่ดีที่สุด
```

## Page 11 (หน้า 3 / 5)
```text
DALL·E
คู่มืออย่างเป็นทางการ
13 เอกสาร
ขั้นโปร
Best Practices — แนวทางปฏิบัติที่ดีที่สุด

รวมแนวทางปฏิบัติที่ดีที่สุดสำหรับการใช้ DALL·E API ในโปรเจกต์จริง ครอบคลุมการเขียน Prompt ที่มีประสิทธิภาพ การออกแบบระบบ และการจัดการค่าใช้จ่าย ·  8 นาที

หน้า 3 / 5
Best Practices — แนวทางปฏิบัติที่ดีที่สุด

อ้างอิงหลัก: OpenAI Images Guide — Best Practices

ภาพรวม

การใช้ DALL·E API ในโปรเจกต์จริงต้องคำนึงถึงหลายปัจจัย ตั้งแต่การเขียน Prompt ที่มีประสิทธิภาพ ไปจนถึงการออกแบบระบบที่รองรับการใช้งานจริง บทนี้รวบรวม Best Practices (แนวทางปฏิบัติที่ดีที่สุด — วิธีที่ผู้เชี่ยวชาญแนะนำจากประสบการณ์จริง) ที่จะช่วยให้คุณใช้ DALL·E ได้อย่างมีประสิทธิภาพและประหยัด

หมวดที่ 1: การเขียน Prompt อย่างมืออาชีพ
1.1 ใช้ภาษาอังกฤษสำหรับผลลัพธ์ที่ดีที่สุด

แม้ DALL·E 3 รองรับ Prompt ภาษาไทย แต่ภาษาอังกฤษมักให้ผลลัพธ์ที่ดีกว่า เนื่องจากโมเดลถูกฝึกมาด้วยข้อมูลภาษาอังกฤษเป็นหลัก

# ดีกว่า
prompt = "A serene Thai mountain village at dawn, mist rolling through valley, traditional wooden houses, photorealistic"

# ได้ผลแต่อาจไม่ดีเท่า
prompt = "หมู่บ้านบนภูเขาในประเทศไทยยามรุ่งอรุณ มีหมอกลอยในหุบเขา บ้านไม้แบบดั้งเดิม ดูสมจริง"

1.2 โครงสร้าง Prompt ที่เป็นระบบ

สร้าง Template (แม่แบบ — โครงสร้าง Prompt ที่นำมาใช้ซ้ำได้) สำหรับแต่ละประเภทงาน:

def build_product_prompt(product: str, setting: str, style: str = "photorealistic") -> str:
    """สร้าง Prompt สำหรับภาพสินค้า"""
    return f"""
    Professional product photography of {product},
    {setting},
    studio lighting with soft shadows,
    white or neutral background,
    {style} style,
    high resolution, commercial advertisement quality
    """.strip()

def build_portrait_prompt(subject: str, mood: str, setting: str) -> str:
    """สร้าง Prompt สำหรับภาพบุคคล"""
    return f"""
    Portrait of {subject},
    {mood} mood and expression,
    {setting},
    professional photography, natural lighting,
    sharp focus, bokeh background
    """.strip()

# ใช้งาน
product_prompt = build_product_prompt(
    product="a sleek black leather wallet",
    setting="on a wooden surface with autumn leaves",
    style="photorealistic"
)

1.3 เก็บคลังPrompt ที่ใช้บ่อย
PROMPT_TEMPLATES = {
    "hero_banner": "Wide cinematic landscape of {subject}, golden hour lighting, photorealistic, 8K quality",
    "social_post": "Square format illustration of {subject}, vibrant colors, modern flat design style",
    "blog_thumbnail": "Minimal clean illustration of {subject}, pastel colors, simple background",
    "product_shot": "Professional product photography of {subject}, white background, studio lighting",
}

def get_prompt(template_name: str, **kwargs) -> str:
    template = PROMPT_TEMPLATES.get(template_name)
    if not template:
        raise ValueError(f"ไม่พบ template: {template_name}")
    return template.format(**kwargs)

หมวดที่ 2: การออกแบบระบบ API
2.1 จัดการ API Key อย่างปลอดภัย
import os
from dotenv import load_dotenv  # pip install python-dotenv

# โหลดค่าจากไฟล์ .env
load_dotenv()

# ไม่ดี — เขียน Key ตรงๆ ใน Code
client = OpenAI(api_key="sk-xxxxx")

# ดี — ใช้ Environment Variable
client = OpenAI(api_key=os.environ.get("OPENAI_API_KEY"))

# ดีที่สุด — ตรวจสอบว่ามี Key ก่อนใช้งาน
api_key = os.environ.get("OPENAI_API_KEY")
if not api_key:
    raise ValueError("ไม่พบ OPENAI_API_KEY — กรุณาตั้งค่า Environment Variable")
client = OpenAI(api_key=api_key)


ไฟล์ .env:

OPENAI_API_KEY=sk-xxxxxxxxxxxxxxxxxxxxxxxx


ไฟล์ .gitignore (บอก Git ว่าไม่ต้อง Track ไฟล์นี้):

.env
*.env

2.2 บันทึกภาพทันทีหลังสร้าง

URL ของภาพหมดอายุใน 1 ชั่วโมง ควรดาวน์โหลดและบันทึกทันที:

import os
import time
import requests
from openai import OpenAI
from pathlib import Path

client = OpenAI()

def generate_and_save(prompt: str, output_dir: str = "generated_images") -> str:
    """สร้างภาพและบันทึกทันที"""

    # สร้างโฟลเดอร์ถ้ายังไม่มี
    Path(output_dir).mkdir(parents=True, exist_ok=True)

    # สร้างชื่อไฟล์จาก Timestamp (ประทับเวลา)
    timestamp = int(time.time())
    filename = f"image_{timestamp}.png"
    filepath = os.path.join(output_dir, filename)

    # เรียก API
    response = client.images.generate(
        model="dall-e-3",
        prompt=prompt,
        size="1024x1024",
        response_format="b64_json",  # รับข้อมูลโดยตรง ไม่ต้องพึ่ง URL
    )

    # บันทึกไฟล์ทันที
    import base64
    image_data = base64.b64decode(response.data[0].b64_json)

    with open(filepath, "wb") as f:
        f.write(image_data)

    print(f"บันทึกแล้ว: {filepath}")
    return filepath

2.3 Implement Queue สำหรับ Batch Processing
import asyncio
import time
from typing import List

async def generate_batch(prompts: List[str], delay_seconds: float = 12.0) -> List[str]:
    """
    สร้างภาพหลายภาพโดยเว้นระยะห่าง เพื่อไม่เกิน Rate Limit
    DALL·E 3: 5 RPM = 1 ภาพทุก 12 วินาที
    """
    results = []

    for i, prompt in enumerate(prompts):
        print(f"กำลังสร้างภาพที่ {i+1}/{len(prompts)}: {prompt[:50]}...")

        try:
            response = client.images.generate(
                model="dall-e-3",
                prompt=prompt,
                size="1024x1024",
            )
            results.append(response.data[0].url)

        except Exception as e:
            print(f"ผิดพลาดภาพที่ {i+1}: {e}")
            results.append(None)

        # รอก่อนสร้างภาพถัดไป (ยกเว้นภาพสุดท้าย)
        if i < len(prompts) - 1:
            await asyncio.sleep(delay_seconds)

    return results

# ใช้งาน
prompts = [
    "A sunrise over the ocean",
    "A quiet forest path in autumn",
    "A futuristic city at night",
]

# รัน asyncio
urls = asyncio.run(generate_batch(prompts))

หมวดที่ 3: การจัดการภาพ
3.1 ตั้งชื่อไฟล์อย่างมีระบบ
import re
import time

def sanitize_filename(prompt: str, max_length: int = 50) -> str:
    """สร้างชื่อไฟล์ที่อ่านได้จาก Prompt"""
    # เอาเฉพาะตัวอักษร ตัวเลข และเว้นวรรค
    clean = re.sub(r'[^a-zA-Z0-9\s-]', '', prompt.lower())
    # แทนที่เว้นวรรคด้วย underscore
    clean = re.sub(r'\s+', '_', clean.strip())
    # ตัดให้สั้นลง
    clean = clean[:max_length]

    timestamp = int(time.time())
    return f"{timestamp}_{clean}.png"

# ตัวอย่าง
filename = sanitize_filename("A beautiful sunset over the mountains")
# output: "1703123456_a_beautiful_sunset_over_the_mountains.png"

3.2 บันทึก Metadata พร้อมภาพ
import json
from datetime import datetime

def save_image_with_metadata(response, prompt: str, parameters: dict, output_path: str):
    """บันทึกภาพพร้อม Metadata (ข้อมูลเพิ่มเติมที่อธิบายภาพ — เช่น Prompt ที่ใช้, เวลาสร้าง)"""

    # บันทึกภาพ
    import base64
    image_data = base64.b64decode(response.data[0].b64_json)
    with open(output_path, "wb") as f:
        f.write(image_data)

    # บันทึก Metadata ไว้ด้วย
    metadata = {
        "created_at": datetime.now().isoformat(),
        "original_prompt": prompt,
        "revised_prompt": response.data[0].revised_prompt,
        "parameters": parameters,
        "file": output_path,
    }

    metadata_path = output_path.replace(".png", "_metadata.json")
    with open(metadata_path, "w", encoding="utf-8") as f:
        json.dump(metadata, f, ensure_ascii=False, indent=2)

    print(f"บันทึกภาพ: {output_path}")
    print(f"บันทึก Metadata: {metadata_path}")

หมวดที่ 4: การทดสอบ Prompt
4.1 ใช้ DALL·E 2 ขนาดเล็กสำหรับทดสอบ
def test_prompt(prompt: str):
    """ทดสอบ Prompt ด้วยต้นทุนต่ำสุด"""
    response = client.images.generate(
        model="dall-e-2",   # ถูกกว่า DALL·E 3 มาก
        prompt=prompt,
        size="256x256",     # ขนาดเล็กสุด ราคาถูกสุด
        n=1,
    )
    return response.data[0].url

def produce_final(prompt: str):
    """สร้างภาพ Final หลังจาก Prompt ผ่านการทดสอบแล้ว"""
    response = client.images.generate(
        model="dall-e-3",
        prompt=prompt,
        size="1024x1024",
        quality="hd",
        style="vivid",
    )
    return response.data[0].url

# ขั้นตอนที่แนะนำ:
# 1. ทดสอบ Prompt
test_url = test_prompt("A cozy cabin in the mountains")

# 2. ดูผลลัพธ์ ถ้าพอใจแล้วสร้าง Final
final_url = produce_final("A cozy cabin in the mountains, surrounded by pine trees, snow-covered landscape")

4.2 เปรียบเทียบ Style และ Quality
def compare_styles(prompt: str):
    """สร้างภาพ 2 สไตล์เพื่อเปรียบเทียบ"""
    results = {}

    for style in ["vivid", "natural"]:
        response = client.images.generate(
            model="dall-e-3",
            prompt=prompt,
            size="1024x1024",
            quality="standard",
            style=style,
        )
        results[style] = response.data[0].url

    return results

# ใช้งาน
urls = compare_styles("A mountain landscape at sunset")
print("Vivid:", urls["vivid"])
print("Natural:", urls["natural"])

หมวดที่ 5: Monitoring และ Logging
5.1 บันทึก Log การใช้งาน
import logging
from datetime import datetime

# ตั้งค่า Logger (ระบบบันทึก Log — เก็บประวัติการทำงานของโปรแกรม)
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler('dall_e_usage.log'),
        logging.StreamHandler()
    ]
)
logger = logging.getLogger(__name__)

def generate_with_logging(prompt: str, **kwargs) -> str:
    """สร้างภาพพร้อมบันทึก Log"""

    logger.info(f"เริ่มสร้างภาพ | Prompt: {prompt[:100]}...")
    start_time = time.time()

    try:
        response = client.images.generate(prompt=prompt, **kwargs)
        elapsed = time.time() - start_time

        logger.info(f"สำเร็จ | เวลา: {elapsed:.2f}s | Model: {kwargs.get('model', 'default')}")
        return response.data[0].url

    except Exception as e:
        logger.error(f"ผิดพลาด | {type(e).__name__}: {e}")
        raise

5.2 ติดตามค่าใช้จ่าย
PRICE_PER_IMAGE = {
    ("dall-e-3", "1024x1024", "standard"): 0.040,
    ("dall-e-3", "1024x1024", "hd"): 0.080,
    ("dall-e-3", "1792x1024", "standard"): 0.080,
    ("dall-e-3", "1792x1024", "hd"): 0.120,
    ("dall-e-3", "1024x1792", "standard"): 0.080,
    ("dall-e-3", "1024x1792", "hd"): 0.120,
    ("dall-e-2", "1024x1024", "standard"): 0.020,
    ("dall-e-2", "512x512", "standard"): 0.018,
    ("dall-e-2", "256x256", "standard"): 0.016,
}

class CostTracker:
    """ติดตามค่าใช้จ่ายการใช้ DALL·E API"""

    def __init__(self):
        self.total_cost = 0.0
        self.image_count = 0

    def track(self, model: str, size: str, quality: str = "standard", n: int = 1):
        key = (model, size, quality)
        price = PRICE_PER_IMAGE.get(key, 0)
        cost = price * n

        self.total_cost += cost
        self.image_count += n

        print(f"ค่าใช้จ่ายภาพนี้: ${cost:.4f} | รวมทั้งหมด: ${self.total_cost:.4f} ({self.image_count} ภาพ)")
        return cost

tracker = CostTracker()
tracker.track("dall-e-3", "1024x1024", "hd")
tracker.track("dall-e-3", "1024x1024", "standard", n=3)

สรุป Checklist สำหรับโปรเจกต์จริง
 เก็บ API Key ใน Environment Variable ไม่ใช่ใน Code
 เพิ่ม .env ลงใน .gitignore
 ใช้ b64_json หรือดาวน์โหลดภาพทันทีหลังสร้าง (URL หมดอายุ 1 ชั่วโมง)
 Implement Retry Logic สำหรับ Rate Limit Error
 ทดสอบ Prompt ด้วย DALL·E 2 ขนาดเล็กก่อน
 บันทึก Metadata พร้อมภาพ
 ตั้ง Spending Limit ใน OpenAI Dashboard
 บันทึก Log การใช้งาน
 ติดตามค่าใช้จ่าย
 เคารพ Content Policy และทดสอบกับ Prompt หลากหลาย
สรุป

Best Practices เหล่านี้จะช่วยให้การใช้งาน DALL·E API ในโปรเจกต์จริงมีความน่าเชื่อถือ ปลอดภัย และประหยัดค่าใช้จ่าย สิ่งสำคัญที่สุดคือการจัดการ API Key อย่างปลอดภัย การบันทึกภาพทันที และการวางแผนการจัดการ Rate Limits อย่างเหมาะสม

 ก่อนหน้า
Rate Limits และราคา — ขีดจำกัดและค่าใช้จ่าย
ถัดไป
Use Cases ขั้นสูง — ตัวอย่างการนำ DALL·E ไปใช้จริง
```

## Page 12 (หน้า 4 / 5)
```text
DALL·E
คู่มืออย่างเป็นทางการ
13 เอกสาร
ขั้นโปร
Use Cases ขั้นสูง — ตัวอย่างการนำ DALL·E ไปใช้จริง

ตัวอย่างการนำ DALL·E API ไปใช้ในโปรเจกต์จริง ครอบคลุมการสร้างระบบภาพอัตโนมัติ การผสมกับ ChatGPT และการสร้าง Pipeline สำหรับงาน Content ·  9 นาที

หน้า 4 / 5
Use Cases ขั้นสูง — ตัวอย่างการนำ DALL·E ไปใช้จริง

อ้างอิงหลัก: OpenAI Images Guide

ภาพรวม

บทนี้แสดงตัวอย่างการใช้ DALL·E API ในสถานการณ์จริง โดยรวม DALL·E เข้ากับ GPT และเครื่องมืออื่นๆ เพื่อสร้างระบบที่มีประสิทธิภาพสูง

Use Case 1: ระบบสร้างภาพบล็อกอัตโนมัติ
โจทย์

เว็บบล็อกต้องการภาพประกอบบทความโดยอัตโนมัติ เมื่อ Editor (บรรณาธิการ) บันทึกบทความ ระบบจะสร้างภาพ Thumbnail (ภาพขนาดเล็กที่แสดงตัวอย่างบทความ) โดยอัตโนมัติ

แนวทาง
from openai import OpenAI

client = OpenAI()

def generate_blog_thumbnail(article_title: str, article_summary: str) -> str:
    """
    สร้าง Thumbnail สำหรับบทความบล็อกโดยอัตโนมัติ
    ใช้ GPT สร้าง Prompt จาก Title และ Summary ก่อน
    แล้วใช้ DALL·E สร้างภาพ
    """

    # ขั้นตอนที่ 1: ใช้ GPT สร้าง Prompt ที่เหมาะสม
    prompt_response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {
                "role": "system",
                "content": """You are an expert at creating DALL·E prompts for blog thumbnails.
                Create a concise, vivid image prompt (max 200 chars) that:
                - Represents the article visually
                - Uses photorealistic or illustration style
                - Avoids text in the image
                - Has professional, clean composition"""
            },
            {
                "role": "user",
                "content": f"Article title: {article_title}\nSummary: {article_summary}"
            }
        ],
        max_tokens=200,
    )

    image_prompt = prompt_response.choices[0].message.content
    print(f"Generated prompt: {image_prompt}")

    # ขั้นตอนที่ 2: สร้างภาพด้วย DALL·E 3
    image_response = client.images.generate(
        model="dall-e-3",
        prompt=image_prompt,
        size="1792x1024",  # Landscape สำหรับ Thumbnail บล็อก
        quality="standard",
        style="vivid",
    )

    return image_response.data[0].url

# ทดสอบ
url = generate_blog_thumbnail(
    article_title="10 วิธีประหยัดพลังงานในบ้าน",
    article_summary="บทความแนะนำวิธีลดค่าไฟและประหยัดพลังงานในบ้านด้วยเทคนิคง่ายๆ"
)
print(f"Thumbnail URL: {url}")

Use Case 2: ระบบสร้างภาพสินค้า E-Commerce
โจทย์

ร้านค้าออนไลน์ต้องการสร้างภาพสินค้าในหลาย Background และสไตล์ต่างๆ โดยอัตโนมัติ

import os
from openai import OpenAI

client = OpenAI()

PRODUCT_BACKGROUNDS = {
    "minimal_white": "clean white background, studio lighting, professional product photography",
    "lifestyle_kitchen": "modern kitchen counter, natural window light, lifestyle photography",
    "outdoor_natural": "outdoor setting with natural greenery, soft sunlight",
    "dark_luxury": "dark marble surface, dramatic lighting, luxury product photography",
    "seasonal_christmas": "festive holiday background with bokeh lights, warm atmosphere",
}

def generate_product_images(product_description: str, backgrounds: list = None) -> dict:
    """สร้างภาพสินค้าในหลาย Background"""

    if backgrounds is None:
        backgrounds = list(PRODUCT_BACKGROUNDS.keys())

    results = {}

    for bg_key in backgrounds:
        bg_desc = PRODUCT_BACKGROUNDS.get(bg_key, bg_key)

        prompt = f"""
        Professional product photography of {product_description},
        {bg_desc},
        sharp focus, high resolution, commercial quality,
        no text or watermarks
        """

        response = client.images.generate(
            model="dall-e-3",
            prompt=prompt.strip(),
            size="1024x1024",
            quality="hd",
            style="natural",  # natural เหมาะกับภาพสินค้า
        )

        results[bg_key] = {
            "url": response.data[0].url,
            "revised_prompt": response.data[0].revised_prompt,
        }

        print(f"สร้างภาพ {bg_key} สำเร็จ")

    return results

# ใช้งาน
product_images = generate_product_images(
    product_description="a handcrafted ceramic coffee mug with blue geometric patterns",
    backgrounds=["minimal_white", "lifestyle_kitchen", "dark_luxury"]
)

for bg, data in product_images.items():
    print(f"\n{bg}:")
    print(f"  URL: {data['url']}")

Use Case 3: สร้าง Avatar สำหรับแอปโซเชียล
โจทย์

แอปโซเชียลต้องการสร้าง Avatar (รูปโปรไฟล์ผู้ใช้ — ภาพที่ใช้แทนตัวเองในระบบ) อัตโนมัติจากคำอธิบาย User

AVATAR_STYLES = {
    "cartoon": "cute cartoon style, vibrant colors, simple design, digital illustration",
    "pixel": "pixel art style, 32x32 grid aesthetic, retro video game character",
    "anime": "anime style, clean line art, expressive eyes, Studio Ghibli inspired",
    "watercolor": "soft watercolor portrait, artistic, gentle colors",
    "3d_render": "3D rendered character, Pixar-like style, detailed, appealing",
}

def create_avatar(
    description: str,
    style: str = "cartoon",
    mood: str = "happy"
) -> str:
    """
    สร้าง Avatar จากคำอธิบายผู้ใช้
    description: เช่น "young woman with curly red hair and glasses"
    """

    style_desc = AVATAR_STYLES.get(style, style)

    prompt = f"""
    Profile avatar portrait of {description},
    {mood} expression,
    {style_desc},
    centered composition, suitable for social media profile picture,
    square format, clean background
    """

    response = client.images.generate(
        model="dall-e-3",
        prompt=prompt.strip(),
        size="1024x1024",
        quality="standard",
        style="vivid",
    )

    return response.data[0].url

# ใช้งาน
avatar_url = create_avatar(
    description="friendly robot with a round head and big blue eyes",
    style="cartoon",
    mood="cheerful"
)
print(f"Avatar: {avatar_url}")

Use Case 4: ระบบ Inpainting อัตโนมัติสำหรับแก้ไขรูปภาพ
โจทย์

บริการถ่ายภาพต้องการระบบที่ลบ Background ออกจากภาพสินค้าโดยอัตโนมัติ แล้วเติม Background ใหม่ที่ต้องการ

from PIL import Image, ImageDraw
import numpy as np

def remove_background_with_dalle(
    image_path: str,
    new_background: str,
    output_path: str
) -> str:
    """
    ใช้ DALL·E 2 Edit เพื่อเปลี่ยน Background
    ต้องการ Mask ที่ระบุพื้นที่ Background
    """

    # เปิดภาพต้นฉบับ
    original = Image.open(image_path).convert("RGBA")
    width, height = original.size

    # สร้าง Mask (ต้องสร้างด้วยมือหรือใช้ Background Removal API แยก)
    # ในตัวอย่างนี้สมมติว่ามี Mask อยู่แล้ว
    mask = Image.open("background_mask.png").convert("RGBA")

    # ส่ง API
    with open(image_path, "rb") as img_file, \
         open("background_mask.png", "rb") as mask_file:

        response = client.images.edit(
            model="dall-e-2",
            image=img_file,
            mask=mask_file,
            prompt=f"Replace background with: {new_background}, maintain the main subject",
            size="1024x1024",
        )

    # ดาวน์โหลดและบันทึก
    import requests
    img_data = requests.get(response.data[0].url).content
    with open(output_path, "wb") as f:
        f.write(img_data)

    return output_path

Use Case 5: Content Pipeline สำหรับ Social Media
โจทย์

Agency โฆษณาต้องการ Pipeline (กระบวนการทำงานอัตโนมัติ — ชุดขั้นตอนที่รันต่อกันโดยอัตโนมัติ) ที่รับ Brief (สรุปงาน) จาก Client แล้วสร้างภาพหลายแบบสำหรับแต่ละ Platform (แพลตฟอร์ม — ช่องทางโซเชียลมีเดียต่างๆ)

PLATFORM_SPECS = {
    "instagram_post": {"size": "1024x1024", "style": "vivid"},
    "instagram_story": {"size": "1024x1792", "style": "vivid"},
    "facebook_banner": {"size": "1792x1024", "style": "natural"},
    "linkedin_post": {"size": "1024x1024", "style": "natural"},
}

def create_social_media_set(
    campaign_brief: str,
    brand_style: str = "modern, professional",
    platforms: list = None
) -> dict:
    """
    สร้างชุดภาพสำหรับโซเชียลมีเดียหลาย Platform จาก Brief เดียว
    """

    if platforms is None:
        platforms = list(PLATFORM_SPECS.keys())

    # ขั้นตอนที่ 1: ให้ GPT สร้าง Prompt สำหรับแต่ละ Platform
    prompt_gen_response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {
                "role": "system",
                "content": "Create concise DALL·E image prompts for social media campaigns. Return JSON only."
            },
            {
                "role": "user",
                "content": f"""
                Campaign brief: {campaign_brief}
                Brand style: {brand_style}

                Create image prompts for: {', '.join(platforms)}
                Format: {{"platform_name": "image prompt"}}
                """
            }
        ],
        response_format={"type": "json_object"},
    )

    import json
    prompts = json.loads(prompt_gen_response.choices[0].message.content)

    # ขั้นตอนที่ 2: สร้างภาพสำหรับแต่ละ Platform
    results = {}

    for platform in platforms:
        if platform not in prompts:
            continue

        specs = PLATFORM_SPECS.get(platform, {"size": "1024x1024", "style": "vivid"})

        response = client.images.generate(
            model="dall-e-3",
            prompt=prompts[platform],
            size=specs["size"],
            quality="standard",
            style=specs["style"],
        )

        results[platform] = {
            "url": response.data[0].url,
            "prompt_used": prompts[platform],
            "specs": specs,
        }

        print(f"สร้างภาพ {platform} สำเร็จ")

    return results

# ใช้งาน
campaign_images = create_social_media_set(
    campaign_brief="โปรโมชัน Summer Sale ลด 50% สินค้า Fashion สำหรับ Gen Z",
    brand_style="vibrant, youthful, trendy, colorful",
    platforms=["instagram_post", "instagram_story", "facebook_banner"]
)

for platform, data in campaign_images.items():
    print(f"\n{platform}:")
    print(f"  URL: {data['url']}")
    print(f"  Prompt: {data['prompt_used'][:80]}...")

Use Case 6: Interactive Image Generation Web App
โจทย์

สร้าง Web Application ที่ผู้ใช้พิมพ์ Prompt แล้วเห็นภาพทันที โดยใช้ Next.js และ DALL·E API

API Route (เส้นทาง API — โค้ดฝั่ง Server ที่รับ Request จาก Client)
// app/api/generate/route.ts (Next.js App Router)
import OpenAI from "openai";
import { NextRequest, NextResponse } from "next/server";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const { prompt, size = "1024x1024", quality = "standard", style = "vivid" } =
      await request.json();

    if (!prompt || prompt.trim().length === 0) {
      return NextResponse.json(
        { error: "Prompt ไม่สามารถว่างได้" },
        { status: 400 }
      );
    }

    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt,
      size,
      quality,
      style,
      n: 1,
    });

    return NextResponse.json({
      url: response.data[0].url,
      revisedPrompt: response.data[0].revised_prompt,
    });

  } catch (error: any) {
    if (error.code === "content_policy_violation") {
      return NextResponse.json(
        { error: "Prompt ละเมิดนโยบายเนื้อหา กรุณาแก้ไข Prompt" },
        { status: 400 }
      );
    }

    if (error.code === "rate_limit_exceeded") {
      return NextResponse.json(
        { error: "API เกินขีดจำกัด กรุณารอสักครู่แล้วลองใหม่" },
        { status: 429 }
      );
    }

    return NextResponse.json(
      { error: "เกิดข้อผิดพลาด กรุณาลองใหม่" },
      { status: 500 }
    );
  }
}

Frontend Component
// components/ImageGenerator.tsx
"use client";
import { useState } from "react";

export default function ImageGenerator() {
  const [prompt, setPrompt] = useState("");
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [revisedPrompt, setRevisedPrompt] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateImage = async () => {
    if (!prompt.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt,
          size: "1024x1024",
          quality: "standard",
          style: "vivid",
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error);
      }

      setImageUrl(data.url);
      setRevisedPrompt(data.revisedPrompt);

    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">DALL·E Image Generator</h1>

      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="อธิบายภาพที่ต้องการ..."
        className="w-full p-3 border rounded-lg h-24 resize-none"
      />

      <button
        onClick={generateImage}
        disabled={loading || !prompt.trim()}
        className="mt-3 px-6 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-50"
      >
        {loading ? "กำลังสร้างภาพ..." : "สร้างภาพ"}
      </button>

      {error && (
        <div className="mt-3 p-3 bg-red-100 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      {imageUrl && (
        <div className="mt-6">
          <img src={imageUrl} alt="Generated" className="w-full rounded-lg shadow-lg" />
          {revisedPrompt && (
            <p className="mt-2 text-sm text-gray-500">
              Prompt ที่ใช้จริง: {revisedPrompt}
            </p>
          )}
          <a href={imageUrl} download className="mt-2 inline-block text-blue-600 hover:underline">
            ดาวน์โหลดภาพ
          </a>
        </div>
      )}
    </div>
  );
}

สรุป

Use Cases เหล่านี้แสดงให้เห็นว่า DALL·E API สามารถนำไปรวมกับระบบต่างๆ ได้หลากหลาย ไม่ว่าจะเป็นระบบบล็อกอัตโนมัติ แพลตฟอร์ม E-Commerce, Social Media Pipeline หรือ Web Application แบบ Interactive การรวม DALL·E กับ GPT เพื่อสร้าง Prompt อัตโนมัติเป็นแนวทางที่ทรงพลังและนิยมมากในการสร้างระบบสร้างภาพ AI แบบสมบูรณ์

 ก่อนหน้า
Best Practices — แนวทางปฏิบัติที่ดีที่สุด
ถัดไป
DALL·E 2 vs DALL·E 3 — เปรียบเทียบเชิงลึก
```

## Page 13 (หน้า 5 / 5)
```text
DALL·E
คู่มืออย่างเป็นทางการ
13 เอกสาร
ขั้นโปร
DALL·E 2 vs DALL·E 3 — เปรียบเทียบเชิงลึก

เปรียบเทียบ DALL·E 2 และ DALL·E 3 อย่างละเอียดในทุกมิติ ช่วยตัดสินใจว่าควรใช้โมเดลไหนสำหรับงานประเภทต่างๆ ·  7 นาที

หน้า 5 / 5
DALL·E 2 vs DALL·E 3 — เปรียบเทียบเชิงลึก

อ้างอิงหลัก: OpenAI Images Guide | OpenAI DALL·E 3 Announcement

ภาพรวม

DALL·E 2 และ DALL·E 3 เป็นโมเดลสร้างภาพ AI ของ OpenAI ที่มีจุดแข็งต่างกัน การเลือกโมเดลที่เหมาะสมขึ้นอยู่กับงานที่ต้องทำ งบประมาณ และฟีเจอร์ที่ต้องการ บทนี้เปรียบเทียบทั้งสองโมเดลในทุกมิติ

ประวัติและพัฒนาการ
DALL·E 2 (เปิดตัว เมษายน 2022)

DALL·E 2 เป็นการพัฒนาต่อยอดจาก DALL·E รุ่นแรก โดยใช้เทคนิค CLIP (Contrastive Language–Image Pre-training — โมเดลที่เรียนรู้ความสัมพันธ์ระหว่างข้อความและภาพ) และ Diffusion Model (โมเดลการแพร่กระจาย — เริ่มจากภาพสัญญาณรบกวนแล้วค่อยๆ สร้างเป็นภาพที่มีความหมาย) เป็นโมเดลแรกที่ทำให้สาธารณะชนเข้าถึงการสร้างภาพ AI ได้ในระดับคุณภาพสูง

เทคนิคหลัก:

Diffusion Model ที่เรียนรู้จากคู่ (ข้อความ, ภาพ) จำนวนมหาศาล
CLIP Guidance ช่วยให้ภาพตรงกับ Prompt มากขึ้น
รองรับ Inpainting (แก้ไขบางส่วน) และ Outpainting (ขยายภาพออกนอกขอบ)
DALL·E 3 (เปิดตัว ตุลาคม 2023)

DALL·E 3 เปลี่ยนแนวทางโดยผสาน GPT-4 เข้ากับกระบวนการสร้างภาพ ทำให้เข้าใจ Prompt ที่ซับซ้อนได้ดีขึ้นมาก

นวัตกรรมหลักของ DALL·E 3:

GPT-4 Recaptioning — ก่อนฝึกโมเดล OpenAI ใช้ GPT-4 สร้างคำอธิบายภาพใหม่ที่ละเอียดกว่าสำหรับทุกภาพในชุดข้อมูลฝึก (Training Dataset)
Better Prompt Following — ตามคำสั่งใน Prompt ได้แม่นยำกว่ามาก รวมถึงรายละเอียดเล็กๆ น้อยๆ
ChatGPT Integration — รวมเข้ากับ ChatGPT ได้โดยตรง
เปรียบเทียบคุณสมบัติ
ความสามารถหลัก
คุณสมบัติ	DALL·E 2	DALL·E 3
คุณภาพภาพโดยรวม	ดี	ดีมาก
ตามคำสั่ง Prompt	ปานกลาง	ดีเยี่ยม
รายละเอียดที่ซับซ้อน	บางครั้งพลาด	แม่นยำกว่า
ความสม่ำเสมอ	บางครั้งไม่แน่นอน	สม่ำเสมอกว่า
ข้อความในภาพ	ไม่ดี	ดีขึ้น (แต่ยังไม่สมบูรณ์)
ภาพบุคคล	ปานกลาง	ดีขึ้น
Abstract Art	ดี	ดี
Architecture	ดี	ดีมาก
ฟีเจอร์ API
ฟีเจอร์	DALL·E 2	DALL·E 3
Generate Endpoint	✅	✅
Edit Endpoint (Inpainting)	✅	❌
Variations Endpoint	✅	❌
Quality (standard/hd)	❌	✅
Style (vivid/natural)	❌	✅
Revised Prompt	❌	✅
n > 1 ต่อ Request	✅ (สูงสุด 10)	❌ (1 เท่านั้น)
Prompt สูงสุด	1,000 ตัวอักษร	4,000 ตัวอักษร
เปรียบเทียบราคา
โมเดล	Size	Quality	ราคา/ภาพ
DALL·E 2	256×256	—	$0.016
DALL·E 2	512×512	—	$0.018
DALL·E 2	1024×1024	—	$0.020
DALL·E 3	1024×1024	standard	$0.040
DALL·E 3	1024×1024	hd	$0.080
DALL·E 3	1792×1024	standard	$0.080
DALL·E 3	1792×1024	hd	$0.120

สรุป: DALL·E 3 แพงกว่า DALL·E 2 ประมาณ 2-6 เท่า

เปรียบเทียบ Rate Limits
โมเดล	Tier 1 RPM	Tier 5 RPM
DALL·E 2	20 RPM	200 RPM
DALL·E 3	5 RPM	50 RPM

สรุป: DALL·E 2 มี Rate Limits สูงกว่า DALL·E 3 มาก เหมาะกับงานที่ต้องสร้างภาพปริมาณมาก

เมื่อไหรที่ควรใช้ DALL·E 3

ใช้ DALL·E 3 เมื่อ:

1. Prompt ซับซ้อนหรือมีรายละเอียดมาก
# DALL·E 3 เข้าใจได้ดีกว่า
complex_prompt = """
A Victorian-era scientist in a cluttered laboratory, surrounded by bubbling potions
and brass instruments, holding a glowing orb, dramatic chiaroscuro lighting,
oil painting style with warm amber tones, visible brushstrokes
"""

2. ต้องการภาพ HD คุณภาพสูงสุด
response = client.images.generate(
    model="dall-e-3",
    quality="hd",  # เฉพาะ DALL·E 3
    prompt="A detailed portrait for print publication",
)

3. ต้องการภาพแนวนอนหรือแนวตั้ง
# รองรับเฉพาะ DALL·E 3
response = client.images.generate(
    model="dall-e-3",
    size="1792x1024",   # Landscape
    prompt="A wide panoramic city skyline",
)

4. ต้องการ Revised Prompt เพื่อเรียนรู้
response = client.images.generate(model="dall-e-3", prompt=my_prompt)
print(response.data[0].revised_prompt)  # ดูว่า DALL·E 3 แปล Prompt ยังไง

เมื่อไหรที่ควรใช้ DALL·E 2

ใช้ DALL·E 2 เมื่อ:

1. ต้องการ Edit / Inpainting
# เฉพาะ DALL·E 2 รองรับ Edit
response = client.images.edit(
    model="dall-e-2",
    image=open("photo.png", "rb"),
    mask=open("mask.png", "rb"),
    prompt="Replace the sky with a sunset",
)

2. ต้องการ Variations
# เฉพาะ DALL·E 2 รองรับ Variations
response = client.images.create_variation(
    model="dall-e-2",
    image=open("original.png", "rb"),
    n=5,  # 5 เวอร์ชัน
)

3. สร้างภาพปริมาณมาก (High Volume)
# DALL·E 2 มี Rate Limits สูงกว่าและราคาถูกกว่า
# เหมาะกับ Batch Processing
for prompt in large_prompt_list:
    response = client.images.generate(
        model="dall-e-2",  # Rate Limits สูงกว่า DALL·E 3
        prompt=prompt,
        size="512x512",    # ถูกที่สุดสำหรับทดสอบ
    )

4. ทดสอบ Prompt ด้วยงบประมาณน้อย
# ราคาถูกกว่ามาก เหมาะกับ Iteration เร็วๆ
test_response = client.images.generate(
    model="dall-e-2",
    prompt=test_prompt,
    size="256x256",    # $0.016/ภาพ
)

กลยุทธ์การใช้งานผสม (Hybrid Strategy)

กลยุทธ์ที่ดีที่สุดในหลายโปรเจกต์คือการใช้ทั้ง 2 โมเดลร่วมกัน:

class SmartImageGenerator:
    """เลือกโมเดลอัตโนมัติตามงานที่ต้องทำ"""

    def __init__(self):
        self.client = OpenAI()

    def generate(self, prompt: str, use_case: str = "standard") -> str:
        """
        use_case options:
        - "test": ทดสอบ Prompt (DALL·E 2 256x256)
        - "draft": ร่างงาน (DALL·E 3 standard)
        - "final": งาน Final (DALL·E 3 HD)
        - "batch": ปริมาณมาก (DALL·E 2 1024x1024)
        """

        configs = {
            "test": {
                "model": "dall-e-2",
                "size": "256x256",
            },
            "draft": {
                "model": "dall-e-3",
                "size": "1024x1024",
                "quality": "standard",
            },
            "final": {
                "model": "dall-e-3",
                "size": "1024x1024",
                "quality": "hd",
                "style": "vivid",
            },
            "batch": {
                "model": "dall-e-2",
                "size": "1024x1024",
            },
        }

        config = configs.get(use_case, configs["draft"])

        response = self.client.images.generate(
            prompt=prompt,
            **config,
        )

        return response.data[0].url

    def edit(self, image_path: str, mask_path: str, prompt: str) -> str:
        """แก้ไขภาพ — ต้องใช้ DALL·E 2 เสมอ"""
        with open(image_path, "rb") as img, open(mask_path, "rb") as mask:
            response = self.client.images.edit(
                model="dall-e-2",
                image=img,
                mask=mask,
                prompt=prompt,
                size="1024x1024",
            )
        return response.data[0].url

# ใช้งาน
gen = SmartImageGenerator()

# ทดสอบ Prompt ก่อน (ประหยัด)
test_url = gen.generate("A sunset over mountains", use_case="test")

# เมื่อพอใจ สร้าง Final (คุณภาพสูง)
final_url = gen.generate("A sunset over mountains with dramatic clouds", use_case="final")

สรุปการตัดสินใจ
ต้องการ Edit หรือ Variation? → DALL·E 2
        ↓ ไม่
ต้องสร้างภาพปริมาณมาก? → DALL·E 2
        ↓ ไม่
งบประมาณจำกัด? → DALL·E 2
        ↓ ไม่
ต้องการคุณภาพสูงสุด? → DALL·E 3 HD
ต้องการ Prompt ซับซ้อน? → DALL·E 3
ต้องการ Landscape/Portrait? → DALL·E 3

สรุป

ทั้ง DALL·E 2 และ DALL·E 3 มีจุดแข็งของตัวเอง ไม่มีโมเดลไหนดีที่สุดในทุกสถานการณ์ การใช้กลยุทธ์ Hybrid ที่เลือกโมเดลตามงานและงบประมาณจะให้ผลลัพธ์ที่ดีที่สุดในระยะยาว ในโปรเจกต์ส่วนใหญ่ แนะนำให้เริ่มทดสอบด้วย DALL·E 2 แล้วใช้ DALL·E 3 สำหรับงาน Final หรืองานที่ต้องการ Prompt ซับซ้อน

 ก่อนหน้า
Use Cases ขั้นสูง — ตัวอย่างการนำ DALL·E ไปใช้จริง
ถัดไป
```


---

## Beginner Guide

### DALL·E

Source: daily-ai-lab-ai-tools-32page-beginner-guide.docx

![DALL·E](assets/dall-e.png)

**หมวด:** Image
**บทเรียนใน /docs:** 13 หน้า

**ใช้ทำอะไร**
แนะนำ DALL·E โมเดล AI สร้างภาพจากข้อความของ OpenAI ตั้งแต่เวอร์ชันแรกจนถึงปัจจุบัน และสิ่งที่มันทำได้

**พื้นฐานที่ควรรู้**
พื้นฐานที่ควรรู้คือ subject, style, aspect ratio, reference image, และการคุมรายละเอียดภาพ. ก่อนจะเร่งคุณภาพ ให้ลอง prompt สั้น ๆ 2-3 รอบเพื่อหาภาษาที่โมเดลเข้าใจตรงกัน

**เหมาะกับมือใหม่แบบไหน**
เครื่องมือนี้เหมาะกับผู้เริ่มต้นที่อยากฝึกงาน Image แบบสั้นและดูผลลัพธ์ได้เร็ว

**วิธีเริ่มแบบสั้น**
1. เริ่มจาก subject, style, และ aspect ratio ที่ต้องการก่อน
2. ลอง 2-3 เวอร์ชันแรกเพื่อหาภาษาที่โมเดลเข้าใจตรงกับโจทย์
3. ค่อยเพิ่มรายละเอียด เช่น lighting, material, composition, หรือ reference image

**ราคา/Plan**
No standalone consumer plan; use it through ChatGPT or pay OpenAI API usage pricing.

**สิ่งที่ควรจำ**
- จุดแข็ง: เครื่องมือนี้เหมาะกับผู้เริ่มต้นที่อยากฝึกงาน Image แบบสั้นและดูผลลัพธ์ได้เร็ว
- ข้อควรระวัง: ภาพที่ดีมักมาจาก prompt ที่ชัด และบางแพลนจำกัดจำนวนหรือความละเอียดของผลลัพธ์.

**ตัวอย่างเริ่มต้น**
ลองเริ่มด้วย: สร้างภาพของ ตัวอย่างงาน โทน clean องค์ประกอบชัดเจน มุมมอง medium shot อัตราส่วน 16:9 รายละเอียดหลักคือ รายละเอียดหลักให้ชัด

---

---

<!-- merged-beginner-guide:DALL·E -->
## คู่มือพื้นฐานของ DALL·E

**หมวด:** Image
**บทเรียนใน /docs:** 13 หน้า

**ใช้ทำอะไร**
แนะนำ DALL·E โมเดล AI สร้างภาพจากข้อความของ OpenAI ตั้งแต่เวอร์ชันแรกจนถึงปัจจุบัน และสิ่งที่มันทำได้

**พื้นฐานที่ควรรู้**
พื้นฐานที่ควรรู้คือ subject, style, aspect ratio, reference image, และการคุมรายละเอียดภาพ. ก่อนจะเร่งคุณภาพ ให้ลอง prompt สั้น ๆ 2-3 รอบเพื่อหาภาษาที่โมเดลเข้าใจตรงกัน

**เหมาะกับมือใหม่แบบไหน**
เครื่องมือนี้เหมาะกับผู้เริ่มต้นที่อยากฝึกงาน Image แบบสั้นและดูผลลัพธ์ได้เร็ว

**วิธีเริ่มแบบสั้น**
1. เริ่มจาก subject, style, และ aspect ratio ที่ต้องการก่อน
2. ลอง 2-3 เวอร์ชันแรกเพื่อหาภาษาที่โมเดลเข้าใจตรงกับโจทย์
3. ค่อยเพิ่มรายละเอียด เช่น lighting, material, composition, หรือ reference image

**ราคา/Plan**
No standalone consumer plan; use it through ChatGPT or pay OpenAI API usage pricing.

**สิ่งที่ควรจำ**
- จุดแข็ง: เครื่องมือนี้เหมาะกับผู้เริ่มต้นที่อยากฝึกงาน Image แบบสั้นและดูผลลัพธ์ได้เร็ว
- ข้อควรระวัง: ภาพที่ดีมักมาจาก prompt ที่ชัด และบางแพลนจำกัดจำนวนหรือความละเอียดของผลลัพธ์.

**ตัวอย่างเริ่มต้น**
ลองเริ่มด้วย: สร้างภาพของ ตัวอย่างงาน โทน clean องค์ประกอบชัดเจน มุมมอง medium shot อัตราส่วน 16:9 รายละเอียดหลักคือ รายละเอียดหลักให้ชัด

---

![ElevenLabs](assets/elevenlabs.png)
