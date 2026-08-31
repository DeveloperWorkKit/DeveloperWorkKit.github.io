// nav.js
(function () {
    const HOST_URL = 'https://developerworkkit.github.io';

    // 13개 전체 도구 데이터베이스 (검색 인덱스)
    const TOOLS_DATA = [
        { name: '문자열 추출기', tag: 'STRGET', url: `${HOST_URL}/strget/`, keywords: '정규식 이메일 전화번호 regex extract' },
        { name: '글자수 & 바이트 계산기', tag: 'COUNTER', url: `${HOST_URL}/counter/`, keywords: 'byte length 한글 euckr utf8' },
        { name: '텍스트 문서 비교', tag: 'STRCMP', url: `${HOST_URL}/strcmp/`, keywords: 'diff 문자열 차이점 비교 대조 code compare' },
        { name: '마크다운 실시간 에디터', tag: 'MARKDOWN', url: `${HOST_URL}/markdown/`, keywords: 'latex mermaid katex checklist editor' },
        { name: '폴더 구조 엑셀', tag: 'FSEE', url: `${HOST_URL}/fsee/`, keywords: 'tree folder directory zip excel 스프레드시트' },
        { name: 'Base64 & URL 변환기', tag: 'CODER', url: `${HOST_URL}/coder/`, keywords: '인코딩 디코딩 encoding decoding uri html entity' },
        { name: '코드 뷰티파이어 & 뷰어', tag: 'BEAUTIFY', url: `${HOST_URL}/beautify/`, keywords: 'html css javascript js formatter 정렬 압축' },
        { name: 'JSON 포맷터 & 검사기', tag: 'JSON', url: `${HOST_URL}/json-viewer/`, keywords: 'formatter validator json format parse 구문오류' },
        { name: '타임스탬프 변환기', tag: 'TIME', url: `${HOST_URL}/time/`, keywords: 'unix timestamp epoch kst utc 시간 날짜 date' },
        { name: 'UUID & 해시 생성기', tag: 'HASH', url: `${HOST_URL}/hash/`, keywords: 'sha256 sha512 md5 암호화 식별자 unique id' },
        { name: 'QR 마스터', tag: 'QRM', url: `${HOST_URL}/qrm/`, keywords: 'qr code 큐알코드 생성기 generator svg png' },
        { name: '크론탭 주기 생성기', tag: 'CRON', url: `${HOST_URL}/cron/`, keywords: 'crontab linux 스케줄러 expression 정기작업' },
        { name: '웹 색상 스튜디오 & UI 가독성', tag: 'COLOR', url: `${HOST_URL}/color/`, keywords: 'contrast wcag 명도대비 대비비 palette 색상표' }
    ];

    // 1. 메타태그 주입
    const commonMetaHTML = `
        <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🛠️</text></svg>">
        <meta property="og:type" content="website">
        <meta property="og:url" content="${HOST_URL}/">
        <meta property="og:site_name" content="DevWorKit">
    `;
    document.head.insertAdjacentHTML('beforeend', commonMetaHTML);

    // 2. 글로벌 네비게이션 HTML
    const navHTML = `
    <header class="dwk-global-nav">
        <div class="nav-left">
            <a href="${HOST_URL}/" class="nav-brand">
                <span class="dwk-logo-badge">DWK</span>
                <span class="dwk-brand-text">DevWorKit</span>
            </a>
            <nav class="nav-menu">
                <div class="nav-dropdown" id="dropdown-text">
                    <button class="nav-dropbtn" onclick="toggleMobileNav(event, 'dropdown-text')">텍스트/문서 ▾</button>
                    <div class="nav-dropdown-content">
                        <a href="${HOST_URL}/strget/">문자열 추출기 (STRGET)</a>
                        <a href="${HOST_URL}/counter/">글자수 & 바이트 계산기 (COUNTER)</a>
                        <a href="${HOST_URL}/strcmp/">텍스트 문서 비교 (STRCMP)</a>
                        <a href="${HOST_URL}/markdown/">마크다운 실시간 에디터 (MARKDOWN)</a>
                        <a href="${HOST_URL}/fsee/">폴더 구조 엑셀 (FSEE)</a>
                    </div>
                </div>

                <div class="nav-dropdown" id="dropdown-dev">
                    <button class="nav-dropbtn" onclick="toggleMobileNav(event, 'dropdown-dev')">개발/데이터 ▾</button>
                    <div class="nav-dropdown-content">
                        <a href="${HOST_URL}/coder/">Base64 & URL 변환기 (CODER)</a>
                        <a href="${HOST_URL}/beautify/">코드 뷰티파이어 & 뷰어 (BEAUTIFY)</a>
                        <a href="${HOST_URL}/json-viewer/">JSON 포맷터 & 검사기 (JSON)</a>
                        <a href="${HOST_URL}/time/">타임스탬프 변환기 (TIME)</a>
                        <a href="${HOST_URL}/hash/">UUID & 해시 생성기 (HASH)</a>
                        <a href="${HOST_URL}/qrm/">QR 마스터 (QRM)</a>
                        <a href="${HOST_URL}/cron/">크론탭 주기 생성기 (CRON)</a>
                        <a href="${HOST_URL}/color/">웹 색상 스튜디오 (COLOR)</a>
                    </div>
                </div>
            </nav>
        </div>
        
        <div class="nav-right">
            <!-- GNB 실시간 빠른 도구 검색 (화이트 배경 최적화) -->
            <div class="nav-search-wrapper" id="nav-search-container">
                <input type="text" id="gnb-search-input" class="gnb-search-input" placeholder="도구 빠른 검색..." oninput="handleGnbSearch(this.value)" onfocus="handleGnbFocus()" autocomplete="off">
                <span class="gnb-search-icon">🔍</span>
                <div class="gnb-search-results" id="gnb-search-results"></div>
            </div>

            <a href="${HOST_URL}/about.html" class="nav-link-sub">소개/문의</a>
            <a href="${HOST_URL}/guide/" class="nav-link-sub">가이드</a>
            <a href="${HOST_URL}/" class="nav-hub-btn">DWK Hub ➔</a>
        </div>
    </header>
    `;

    // 3. 글로벌 푸터 HTML
    const footerHTML = `
    <footer class="dwk-global-footer">
        <div class="dwk-footer-links">
            <a href="${HOST_URL}/about.html">서비스 소개 및 문의</a>
            <a href="${HOST_URL}/privacy.html">개인정보처리방침</a>
            <a href="https://github.com/developerworkkit/developerworkkit.github.io" target="_blank" rel="noopener">GitHub</a>
        </div>
        <div class="dwk-footer-copy">
            © DevWorKit (DWK) - All Tools Built for Productivity
        </div>
    </footer>
    `;

    // 4. 스타일시트 (화이트 검색바 & 드롭다운 스타일)
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
            background-color: #0284c7;
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
            min-width: 240px;
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

        @media (min-width: 769px) {
            .nav-dropdown:hover .nav-dropdown-content {
                display: block;
            }
        }

        .nav-right { display: flex; align-items: center; gap: 16px; flex-shrink: 0; }
        
        /* GNB 검색창: 화이트 배경 최적화 */
        .nav-search-wrapper {
            position: relative;
            display: flex;
            align-items: center;
        }
        .gnb-search-input {
            background-color: #ffffff !important;
            border: 1px solid #cbd5e1 !important;
            color: #0f172a !important;
            font-size: 12.5px;
            font-weight: 600;
            padding: 6px 28px 6px 12px;
            border-radius: 6px;
            width: 150px;
            outline: none;
            box-shadow: 0 1px 3px rgba(0,0,0,0.1);
            transition: all 0.2s ease;
        }
        .gnb-search-input::placeholder {
            color: #64748b !important;
            font-weight: 500;
        }
        .gnb-search-input:focus {
            width: 220px;
            border-color: #0284c7 !important;
            box-shadow: 0 0 0 3px rgba(2, 132, 199, 0.25) !important;
        }
        .gnb-search-icon {
            position: absolute;
            right: 8px;
            font-size: 11px;
            color: #64748b;
            pointer-events: none;
        }
        .gnb-search-results {
            display: none;
            position: absolute;
            top: calc(100% + 8px);
            right: 0;
            width: 260px;
            background-color: #ffffff;
            border: 1px solid #e2e8f0;
            border-radius: 8px;
            box-shadow: 0 10px 25px rgba(0,0,0,0.15);
            max-height: 320px;
            overflow-y: auto;
            z-index: 100001;
        }
        .gnb-search-results a {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 10px 14px;
            color: #1e293b;
            text-decoration: none;
            font-size: 13px;
            font-weight: 600;
            border-bottom: 1px solid #f1f5f9;
            transition: background-color 0.15s;
        }
        .gnb-search-results a:last-child { border-bottom: none; }
        .gnb-search-results a:hover {
            background-color: #f8fafc;
            color: #0284c7;
        }
        .gnb-result-tag {
            font-size: 10.5px;
            background-color: #e0f2fe;
            color: #0369a1;
            padding: 2px 6px;
            border-radius: 4px;
            font-weight: 800;
        }

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

        /* 푸터 스타일 */
        .dwk-global-footer {
            border-top: 1px solid #dee2e6;
            padding: 24px 40px;
            background-color: #f8fafc;
            color: #666666;
            font-size: 13px;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 10px;
            flex-shrink: 0;
            text-align: center;
            margin-top: auto;
            width: 100%;
            box-sizing: border-box;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        }
        .dwk-footer-links {
            display: flex;
            gap: 20px;
            font-weight: 600;
        }
        .dwk-footer-links a {
            color: #475569;
            text-decoration: none;
            transition: color 0.15s;
        }
        .dwk-footer-links a:hover { color: #0284c7; }
        .dwk-footer-copy { color: #94a3b8; font-size: 12px; }

        /* 모바일 최적화 */
        @media (max-width: 768px) {
            .dwk-global-nav { padding: 0 12px; height: 50px; }
            .nav-left { gap: 10px; }
            .nav-brand { gap: 6px; }
            .dwk-brand-text { font-size: 14px; }
            .nav-dropbtn { font-size: 12px; padding: 12px 4px; }
            .nav-link-sub { display: none; }
            .nav-hub-btn { font-size: 12px; }
            .gnb-search-input { width: 105px; font-size: 11.5px; padding: 5px 22px 5px 8px; }
            .gnb-search-input:focus { width: 150px; }
            .gnb-search-results { width: 220px; }

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
            .dwk-global-footer { padding: 20px 16px; }
            .dwk-footer-links { gap: 12px; font-size: 12px; }
        }
    </style>
    `;

    document.head.insertAdjacentHTML('beforeend', navCSS);
    document.body.insertAdjacentHTML('afterbegin', navHTML);

    // 5. 푸터 주입 및 개별 도구 페이지 뱃지 소프트 틴트 자동 동기화
    window.addEventListener('DOMContentLoaded', () => {
        // 푸터 주입
        const targetContainer = document.getElementById('dwk-footer');
        if (targetContainer) {
            targetContainer.innerHTML = footerHTML;
        } else {
            document.body.insertAdjacentHTML('beforeend', footerHTML);
        }

        // 도구 상세 페이지 상단 뱃지 자동 색상 오버라이드
        const path = window.location.pathname.toLowerCase();
        const headerBadge = document.querySelector('.card-badge, .logo-badge, .tool-badge, .header-badge');
        
        if (headerBadge) {
            headerBadge.style.borderRadius = '6px';
            headerBadge.style.fontWeight = '800';
            headerBadge.style.padding = '4px 9px';
            headerBadge.style.letterSpacing = '0.5px';

            // 1. 텍스트 / 문서 도구군 (Soft Sky Blue)
            if (path.includes('/strget/') || path.includes('/counter/') || path.includes('/strcmp/') || path.includes('/markdown/')) {
                headerBadge.style.backgroundColor = '#e0f2fe';
                headerBadge.style.color = '#0369a1';
                headerBadge.style.border = '1px solid #bae6fd';
            }
            // 2. 개발 / 데이터 도구군 (Soft Violet)
            else if (path.includes('/fsee/') || path.includes('/coder/') || path.includes('/beautify/') || path.includes('/json-viewer/')) {
                headerBadge.style.backgroundColor = '#ede9fe';
                headerBadge.style.color = '#6d28d9';
                headerBadge.style.border = '1px solid #ddd6fe';
            }
            // 3. 시스템 / 디자인 유틸군 (Soft Teal)
            else if (path.includes('/time/') || path.includes('/hash/') || path.includes('/qrm/') || path.includes('/cron/') || path.includes('/color/')) {
                headerBadge.style.backgroundColor = '#ccfbf1';
                headerBadge.style.color = '#0f766e';
                headerBadge.style.border = '1px solid #99f6e4';
            }
        }
    });

    // 6. GNB 실시간 검색 핸들러
    window.handleGnbFocus = function () {
        const input = document.getElementById('gnb-search-input');
        if (input.value.trim().length > 0) {
            document.getElementById('gnb-search-results').style.display = 'block';
        }
    };

    window.handleGnbSearch = function (query) {
        const q = query.trim().toLowerCase();
        const resultsBox = document.getElementById('gnb-search-results');
        
        if (q.length === 0) {
            resultsBox.innerHTML = '';
            resultsBox.style.display = 'none';
            return;
        }

        const filtered = TOOLS_DATA.filter(t => 
            t.name.toLowerCase().includes(q) || 
            t.tag.toLowerCase().includes(q) || 
            t.keywords.toLowerCase().includes(q)
        );

        if (filtered.length === 0) {
            resultsBox.innerHTML = '<div style="padding:12px;color:#64748b;font-size:12px;text-align:center;">검색 결과가 없습니다.</div>';
        } else {
            resultsBox.innerHTML = filtered.map(t => `
                <a href="${t.url}">
                    <span>${t.name}</span>
                    <span class="gnb-result-tag">${t.tag}</span>
                </a>
            `).join('');
        }
        resultsBox.style.display = 'block';
    };

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

    // 외부 영역 클릭 시 닫기
    document.addEventListener('click', function (e) {
        if (!e.target.closest('.nav-dropdown')) {
            document.querySelectorAll('.nav-dropdown').forEach(d => d.classList.remove('active'));
        }
        if (!e.target.closest('#nav-search-container')) {
            const resultsBox = document.getElementById('gnb-search-results');
            if (resultsBox) resultsBox.style.display = 'none';
        }
    });
})();
