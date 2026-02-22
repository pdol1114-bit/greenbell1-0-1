document.addEventListener('DOMContentLoaded', () => {
    const toggleBtn = document.querySelector('.menu-toggle');
    const introMenu = document.querySelector('.intro-menu');
    const greeting = document.querySelector('.intro-greeting');
    const menuLinks = document.querySelectorAll('.intro-menu a');
    const currentPath = window.location.pathname;

    /* =========================
       1. 초기 상태 설정: 현재 페이지 서브메뉴 자동 열기
    ========================= */
    if (window.innerWidth <= 768) {
        document.querySelectorAll('.intro-menu .has-sub').forEach(item => {
            const mainLink = item.querySelector('a');
            const href = mainLink.getAttribute('href');
            if (href && (currentPath.endsWith(href) || (currentPath === '/' && href === 'index.html'))) {
                item.classList.add('open');
            }
        });
    }

    /* =========================
       2. 모바일 햄버거 버튼 토글
    ========================= */
    if (toggleBtn && introMenu) {
        toggleBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            introMenu.classList.toggle('open');
            if (greeting) greeting.classList.toggle('hide');
        });
    }

    /* =========================
       3. 메뉴 링크 클릭 이벤트 (통합 관리)
    ========================= */
    menuLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            if (window.innerWidth > 768) return; // PC 영역은 제외

            const parentLi = link.parentElement;
            const hasSub = parentLi.classList.contains('has-sub');
            const href = link.getAttribute('href');

            // A. 서브메뉴가 있는 메인 항목 클릭 시
            if (hasSub) {
                const isOpen = parentLi.classList.contains('open');

                // 다른 서브메뉴 닫기
                document.querySelectorAll('.intro-menu .has-sub.open').forEach(openedItem => {
                    if (openedItem !== parentLi) openedItem.classList.remove('open');
                });

                // 토글 수행
                if (!isOpen) {
                    parentLi.classList.add('open');
                } else {
                    parentLi.classList.remove('open');
                }

                // 만약 href가 현재 페이지의 앵커인 경우 (예: a.html#sect-1)
                const isAnchorToCurrent = href && (href.startsWith('#') || (href.includes('#') && currentPath.endsWith(href.split('#')[0])));

                if (isAnchorToCurrent) {
                    // 동일 페이지 내 이동이므로 메뉴를 닫음 (약간의 지연 후)
                    setTimeout(() => {
                        introMenu.classList.remove('open');
                        if (greeting) greeting.classList.remove('hide');
                    }, 100);
                } else if (href === '#' || href.startsWith('#')) {
                    e.preventDefault();
                    e.stopPropagation();
                }
            }
            // B. 서브메뉴가 없는 일반 링크 또는 서브메뉴 내부 링크 클릭 시
            else {
                // 페이지 이동 또는 앵커 이동이 발생하므로 메뉴를 닫음
                introMenu.classList.remove('open');
                if (greeting) greeting.classList.remove('hide');
            }
        });
    });

    /* =========================
       4. 메뉴 영역 밖 클릭 시 닫기
    ========================= */
    document.addEventListener('click', (e) => {
        if (introMenu.classList.contains('open')) {
            if (!introMenu.contains(e.target) && !toggleBtn.contains(e.target)) {
                introMenu.classList.remove('open');
                if (greeting) greeting.classList.remove('hide');
            }
        }
    });
});

/* =========================
   5. 스크롤 시 Sticky 적용 (PC 전용)
========================= */
window.addEventListener('scroll', () => {
    const menuBar = document.querySelector('.intro-menu');
    if (window.innerWidth > 768 && menuBar) {
        if (window.scrollY > 160) {
            menuBar.classList.add('sticky');
        } else {
            menuBar.classList.remove('sticky');
        }
    }
});

/* =========================
   6. 창 크기 조절 시 초기화
========================= */
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        document.querySelectorAll('.intro-menu .has-sub.open').forEach(item => {
            item.classList.remove('open');
        });
        const introMenu = document.querySelector('.intro-menu');
        if (introMenu) introMenu.classList.remove('open');
    }
});

/* =================================================
   7. 간호 및 보건팀 Swiper 슬라이더 (index.html 전용일 수 있음)
================================================= */
if (document.querySelector('.staff-slider')) {
    const staffSwiper = new Swiper('.staff-slider', {
        slidesPerView: 1,
        spaceBetween: 20,
        loop: true,
        centeredSlides: true,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        breakpoints: {
            768: { slidesPerView: 2, spaceBetween: 30, centeredSlides: false },
            1024: { slidesPerView: 3, spaceBetween: 40, centeredSlides: false }
        }
    });
}