document.addEventListener('DOMContentLoaded', () => {
    const toggleBtn = document.querySelector('.menu-toggle');
    const introMenu = document.querySelector('.intro-menu');
    const greeting = document.querySelector('.intro-greeting');

    /* =========================
       모바일 햄버거 버튼 토글
    ========================= */
    if (toggleBtn && introMenu) {
        toggleBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation(); // 안드로이드 클릭 이벤트 중복 방지

            introMenu.classList.toggle('open');

            if (greeting) {
                greeting.classList.toggle('hide');
            }
        });
    }

    /* =========================
       서브메뉴 토글 (안드로이드/iOS 공통 최적화)
    ========================= */
    const menuLinks = document.querySelectorAll('.intro-menu .has-sub > a');

    menuLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            // PC View (Width > 768px): Ignore script (hover handles it)
            if (window.innerWidth > 768) return;

            e.preventDefault();
            e.stopPropagation(); // 이벤트 전파를 막아 오작동 방지

            const parent = link.parentElement;
            const isOpen = parent.classList.contains('open');

            // 다른 열려있는 서브메뉴 닫기
            document.querySelectorAll('.intro-menu .has-sub.open').forEach(item => {
                if (item !== parent) {
                    item.classList.remove('open');
                }
            });

            // 현재 클릭한 메뉴 토글
            if (isOpen) {
                parent.classList.remove('open');
            } else {
                parent.classList.add('open');
            }
        });
    });

    // 메뉴 영역 밖 클릭 시 서브메뉴 닫기 처리 (선택사항)
    document.addEventListener('click', (e) => {
        if (!introMenu.contains(e.target) && !toggleBtn.contains(e.target)) {
            introMenu.classList.remove('open');
            if (greeting) greeting.classList.remove('hide');
        }
    });
});
/* menu.js 하단 스크롤 부분 */
window.addEventListener('scroll', () => {
    const menuBar = document.querySelector('.intro-menu');

    if (window.innerWidth > 768) {
        // 스크롤이 메뉴 위치(160px)보다 더 내려갔을 때 sticky 적용
        if (window.scrollY > 160) {
            menuBar.classList.add('sticky');
        } else {
            menuBar.classList.remove('sticky');
        }
    }
});
/* 61행 부근 scroll 이벤트 종료 지점 바로 아래 추가 */

document.querySelectorAll('.intro-menu a').forEach(link => {
    link.addEventListener('click', (e) => {
        const introMenu = document.querySelector('.intro-menu');
        const greeting = document.querySelector('.intro-greeting');

        // If navigation is occurring (default NOT prevented), close the mobile menu.
        // This covers simple links AND parent links where toggle logic didn't fire (e.g. mixed input devices).
        if (introMenu.classList.contains('open') && !e.defaultPrevented) {
            introMenu.classList.remove('open');
            if (greeting) {
                greeting.classList.remove('hide');
            }
        }
    });
});

/* =================================================
   간호 및 보건팀 Swiper 슬라이더 초기화
================================================= */
const staffSwiper = new Swiper('.staff-slider', {
    // 기본 설정
    slidesPerView: 1,      // 한 번에 보여줄 카드 개수 (모바일 기본)
    spaceBetween: 20,     // 카드 사이 간격
    loop: true,           // 무한 반복 회전
    centeredSlides: true, // 활성 슬라이드 중앙 배치

    // 자동 재생
    autoplay: {
        delay: 3000,
        disableOnInteraction: false,
    },

    // 하단 페이지 점(dots)
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },

    // 좌우 화살표
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },

    // 화면 크기에 따른 반응형 설정
    breakpoints: {
        // 768px 이상 (태블릿/PC)
        768: {
            slidesPerView: 2,
            spaceBetween: 30,
            centeredSlides: false,
        },
        // 1024px 이상 (데스크톱)
        1024: {
            slidesPerView: 3,
            spaceBetween: 40,
            centeredSlides: false,
        }
    }
});

// Clean up .open class on resize to prevent mobile menu sticking in desktop view
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        document.querySelectorAll('.intro-menu .has-sub.open').forEach(item => {
            item.classList.remove('open');
        });
        document.querySelector('.intro-menu').classList.remove('open');
    }
});