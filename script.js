const ageGateOverlay = document.getElementById('age-gate-overlay');
const mainContent = document.getElementById('main-content');
const backgroundMusic = document.getElementById('background-music');

// ****************** ส่วนที่เพิ่ม: Hamburger Menu ******************
const hamburger = document.getElementById('hamburger-menu');
const navMenu = document.getElementById('nav-menu-list');
const navLinks = document.querySelectorAll('.nav-link'); // เลือกทุกลิงก์ในเมนู

// ฟังก์ชันเปิด-ปิดเมนู
function toggleMenu() {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
}

// ผูกฟังก์ชันเข้ากับปุ่ม Hamburger
hamburger.addEventListener('click', toggleMenu);

// ปิดเมนูเมื่อคลิกที่ลิงก์ในเมนู (เพื่อเลื่อนไปยัง Section นั้นๆ)
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        // ตรวจสอบเฉพาะในโหมด Mobile (เมื่อเมนูมีการใช้งาน 'active' class)
        if (window.innerWidth <= 767 && navMenu.classList.contains('active')) {
            toggleMenu(); // เรียกฟังก์ชันปิดเมนู
        }
    });
});
// *******************************************************************


// ฟังก์ชันเมื่อผู้ใช้กดปุ่มตรวจสอบอายุ 
function enterWebsite(ageGroup) {
    // 1. ซ่อน Age Gate ด้วย Transition (0.7s ตาม CSS)
    ageGateOverlay.classList.remove('age-gate-visible');
    ageGateOverlay.classList.add('age-gate-hidden');

    // 2. แสดง Main Content ทันที (เพื่อให้ Transition ของ Age Gate ไม่ซ้อนทับ)
    mainContent.classList.remove('content-hidden');

    // 3. รอให้ Age Gate หายไปก่อน (รอ 750ms ซึ่งมากกว่า transition: 0.7s) แล้วค่อยเล่นเพลง
    setTimeout(() => {
        playBackgroundMusic(); 
    }, 750); 
    
    // Optional: Log age group for tracking
    console.log(`User entered website: ${ageGroup}`);
}

// ฟังก์ชันควบคุมการเล่นเพลง BGM 
function playBackgroundMusic() {
    backgroundMusic.volume = 0.4; 
    backgroundMusic.play()
        .then(() => {
            console.log("BGM started successfully.");
        })
        .catch(e => {
            // นี่อาจเกิดขึ้นได้หากเบราว์เซอร์ยังคงบล็อก autoplay 
            console.log("BGM Play was blocked or failed:", e);
            // แจ้งผู้ใช้ให้คลิกที่ใดก็ได้เพื่อเริ่มเพลง
            // Note: เบราว์เซอร์ส่วนใหญ่จะอนุญาตการเล่นเพลงหากมีการโต้ตอบผู้ใช้ก่อนหน้า (การคลิกปุ่ม Age Gate)
        });
}

// เมื่อโหลดหน้าเสร็จ ให้แสดง Age Gate 
document.addEventListener('DOMContentLoaded', () => {
     ageGateOverlay.classList.add('age-gate-visible');
});
