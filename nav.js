// nav.js
(function () {
    const HOST_URL = 'https://developerworkkit.github.io';

    const navHTML = `
    <header class="dwk-global-nav">
        <div class="nav-left">
            <a href="${HOST_URL}/" class="nav-brand">
                <span class="dwk-logo-badge">DWK</span>
                <span class="dwk-brand-text">DevWorKit</span>
            </a>
            <nav class="nav-menu">
                <!-- 1. 텍스트 / 문서 도구 -->
                <div class="nav-dropdown" id="dropdown-text">
                    <button class="nav-dropbtn" onclick="toggleMobileNav(event, 'dropdown-text')">텍스트/문서 ▾</button>
                    <div class="nav-dropdown-content">
                        <a href="${HOST_URL}/strget/">문자열 추출기 (STRGET)</a>
                        <a href="${HOST_URL}/counter/">글자수 & 바이트 계산기 (COUNTER)</a>
                        <a href="${HOST_URL}/strcmp/">텍스트 문서 비교 (STRCMP)</a>
                        <a href="${HOST_URL}/fsee/">폴더 구조 엑셀 (FSEE)</a>
                    </div>
                </div>

                <!-- 2. 개발 / 데이터 도구 -->
                <div class="nav-dropdown" id="dropdown-dev">
                    <button class="nav-dropbtn" onclick="toggleMobileNav(event, 'dropdown-dev')">개발/데이터 ▾</button>
                    <div class="nav-dropdown-content">
                        <a href="${HOST_URL}/coder/">Base64 & URL 변환기 (CODER)</a>
                        <a href="${HOST_URL}/beautify/">코드 뷰티파이어 & 뷰어 (BEAUTIFY)</a>
                        <a href="${HOST_URL}/json-viewer/">JSON 포맷터 & 검사기 (JSON)</a>
                        <a href="${HOST_URL}/cron/">크론탭 주기 생성기 (CRON)</a>
                        <a href="${HOST_URL}/time/">타임스탬프 변환기 (TIME)</a>
                        <a href="${HOST_URL}/hash/">UUID & 해시 생성기 (HASH)</a>
                        <a href="${HOST_URL}/qrm/">QR 마스터 (QRM)</a>
                        <a href="${HOST_URL}/color/">웹 색상 스튜디오 (COLOR)</a>
                    </div>
                </div>
            </nav>
        </div>
        <div class="nav-right">
            <a href="${HOST_URL}/about.html" class="nav-link-sub">소개/문의</a>
            <a href="${HOST_URL}/blog/" class="nav-link-sub">가이드/블로그</a>
            <a href="${HOST_URL}/" class="nav-hub-btn">DWK Hub ➔</a>
        </div>
    </header>
    `;

    const navCSS = `
    <style>
        .dwk-global-nav {
            background-color: #111827;
            border-bottom: 1px solid #1f2937;
            padding: 0 24px;
            height: 52px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
            position: relative;
            z-index: 99999;
            box-sizing: border-box;
            width: 100%;
        }
        .nav-left { display: flex; align-items: center; gap: 20px; }
        .nav-brand {
            display: flex;
            align-items: center;
            gap: 8px;
            text-decoration: none;
            flex-shrink: 0;
        }
        .dwk-logo-badge {
            background-color: #007bff;
            color: #ffffff;
            font-size: 11.5px;
            font-weight: 800;
            padding: 2px 7px;
            border-radius: 4px;
        }
        .dwk-brand-text {
            color: #ffffff;
            font-size: 15px;
            font-weight: 700;
            letter-spacing: -0.3px;
        }
        .nav-menu { display: flex; align-items: center; gap: 6px; }

        .nav-dropdown { position: relative; display: inline-block; }
        .nav-dropbtn {
            background: transparent;
            color: #9ca3af;
            border: none;
            font-size: 13.5px;
            font-weight: 600;
            padding: 15px 10px;
            cursor: pointer;
            display: flex;
            align-items: center;
            gap: 4px;
            transition: color 0.15s;
            white-space: nowrap;
        }
        .nav-dropbtn:hover { color: #ffffff; }

        .nav-dropdown-content {
            display: none;
            position: absolute;
            top: 100%;
            left: 0;
            background-color: #1f2937;
            min-width: 230px;
            box-shadow: 0px 10px 20px rgba(0,0,0,0.3);
            border-radius: 6px;
            border: 1px solid #374151;
            padding: 6px 0;
            z-index: 100000;
        }
        .nav-dropdown-content a {
            color: #d1d5db;
            padding: 11px 18px;
            text-decoration: none;
            display: block;
            font-size: 13px;
            font-weight: 500;
            transition: all 0.15s;
            white-space: nowrap;
        }
        .nav-dropdown-content a:hover {
            background-color: #374151;
            color: #38bdf8;
        }

        /* PC 마우스 hover 지원 */
        @media (min-width: 769px) {
            .nav-dropdown:hover .nav-dropdown-content {
                display: block;
            }
        }

        .nav-right { display: flex; align-items: center; gap: 16px; flex-shrink: 0; }
        .nav-link-sub {
            color: #9ca3af;
            font-size: 13px;
            text-decoration: none;
            font-weight: 500;
            transition: color 0.15s;
            white-space: nowrap;
        }
        .nav-link-sub:hover { color: #ffffff; }

        .nav-right .nav-hub-btn {
            color: #38bdf8;
            font-size: 13px;
            text-decoration: none;
            font-weight: 700;
            transition: color 0.15s;
            white-space: nowrap;
        }
        .nav-right .nav-hub-btn:hover { color: #7dd3fc; }

        /* 모바일 최적화 (사진 문제 해결) */
        @media (max-width: 768px) {
            .dwk-global-nav { padding: 0 12px; height: 50px; }
            .nav-left { gap: 10px; }
            .nav-brand { gap: 6px; }
            .dwk-brand-text { font-size: 14px; }
            .nav-dropbtn { font-size: 12px; padding: 12px 4px; }
            .nav-link-sub { display: none; } /* 모바일에서 텍스트 숨겨 가로폭 확보 */
            .nav-hub-btn { font-size: 12px; }

            /* 모바일에서 화면 밖으로 나가지 않도록 꽉 찬 너비로 고정 */
            .nav-dropdown-content {
                position: fixed;
                top: 50px;
                left: 10px;
                right: 10px;
                min-width: auto;
                width: auto;
                max-width: calc(100vw - 20px);
                box-sizing: border-box;
            }
            .nav-dropdown.active .nav-dropdown-content {
                display: block !important;
            }
        }
    </style>
    `;

    document.head.insertAdjacentHTML('beforeend', navCSS);
    document.body.insertAdjacentHTML('afterbegin', navHTML);

    // 모바일 터치 토글 핸들러
    window.toggleMobileNav = function (e, dropdownId) {
        if (window.innerWidth <= 768) {
            e.preventDefault();
            e.stopPropagation();
            const target = document.getElementById(dropdownId);
            const isActive = target.classList.contains('active');

            document.querySelectorAll('.nav-dropdown').forEach(d => d.classList.remove('active'));
            if (!isActive) {
                target.classList.add('active');
            }
        }
    };

    document.addEventListener('click', function (e) {
        if (!e.target.closest('.nav-dropdown')) {
            document.querySelectorAll('.nav-dropdown').forEach(d => d.classList.remove('active'));
        }
    });
})();
