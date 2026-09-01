// nav.js - DevWorKit 글로벌 내비게이션 & 파스텔 틴트 뱃지 엔진
(function() {
    const HOST_URL = 'https://developerworkkit.github.io';

    // 1. 공통 메타태그 및 외부 nav.css 동적 주입
    const commonHeadHTML = `
        <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🛠️</text></svg>">
        <meta property="og:type" content="website">
        <meta property="og:url" content="${HOST_URL}/">
        <meta property="og:site_name" content="DevWorKit">
        <link rel="stylesheet" href="${HOST_URL}/nav.css">
    `;
    document.head.insertAdjacentHTML('beforeend', commonHeadHTML);

    // 2. 13개 전체 도구 데이터베이스
    const TOOLS_DATA = [{
            name: '문자열 추출기',
            tag: 'STRGET',
            url: `${HOST_URL}/strget/`,
            keywords: '정규식 이메일 전화번호 regex extract'
        },
        {
            name: '글자수 & 바이트 계산기',
            tag: 'COUNTER',
            url: `${HOST_URL}/counter/`,
            keywords: 'byte length 한글 euckr utf8'
        },
        {
            name: '텍스트 & 코드 비교기',
            tag: 'STRCMP',
            url: `${HOST_URL}/strcmp/`,
            keywords: 'diff 문자열 차이점 비교 대조 code compare'
        },
        {
            name: '마크다운 실시간 에디터',
            tag: 'MARKDOWN',
            url: `${HOST_URL}/markdown/`,
            keywords: 'latex mermaid katex checklist editor'
        },
        {
            name: '폴더 구조 엑셀 변환기',
            tag: 'FSEE',
            url: `${HOST_URL}/fsee/`,
            keywords: 'tree folder directory zip excel 스프레드시트'
        },
        {
            name: 'Base64 & URL 변환기',
            tag: 'CODER',
            url: `${HOST_URL}/coder/`,
            keywords: '인코딩 디코딩 encoding decoding uri html entity'
        },
        {
            name: '코드 뷰티파이어 & 뷰어',
            tag: 'BEAUTIFY',
            url: `${HOST_URL}/beautify/`,
            keywords: 'html css javascript js formatter 정렬 압축'
        },
        {
            name: 'JSON 포맷터 & 검사기',
            tag: 'JSON',
            url: `${HOST_URL}/json-viewer/`,
            keywords: 'formatter validator json format parse 구문오류'
        },
        {
            name: '타임스탬프 변환기',
            tag: 'TIME',
            url: `${HOST_URL}/time/`,
            keywords: 'unix timestamp epoch kst utc 시간 날짜 date'
        },
        {
            name: 'UUID & 해시 생성기',
            tag: 'HASH',
            url: `${HOST_URL}/hash/`,
            keywords: 'sha256 sha512 md5 암호화 식별자 unique id'
        },
        {
            name: 'QR 코드 생성기',
            tag: 'QR',
            url: `${HOST_URL}/qr/`,
            keywords: 'qr code 큐알코드 생성기 generator svg png'
        },
        {
            name: '크론탭 주기 생성기',
            tag: 'CRON',
            url: `${HOST_URL}/cron/`,
            keywords: 'crontab linux 스케줄러 expression 정기작업'
        },
        {
            name: '웹 색상 스튜디오',
            tag: 'COLOR',
            url: `${HOST_URL}/color/`,
            keywords: 'contrast wcag 명도대비 대비비 palette 색상표'
        }
    ];

    // 3. 글로벌 GNB HTML
    const navHTML = `
    <header class="dwk-global-nav">
        <div class="nav-left">
            <a href="${HOST_URL}/" class="nav-brand">
                <span class="dwk-logo-badge">DWK</span>
                <span class="dwk-brand-text">DevWorKit</span>
            </a>
            <nav class="nav-menu">
                <div class="nav-dropdown" id="dropdown-text">
                    <button class="nav-dropbtn" onclick="toggleMobileNav(event, 'dropdown-text')">
                        <span class="desktop-label">텍스트/문서</span><span class="mobile-label">문서</span> ▾
                    </button>
                    <div class="nav-dropdown-content">
                        <a href="${HOST_URL}/strget/">문자열 추출기 (STRGET)</a>
                        <a href="${HOST_URL}/counter/">글자수 & 바이트 계산기 (COUNTER)</a>
                        <a href="${HOST_URL}/strcmp/">텍스트 & 코드 비교기 (STRCMP)</a>
                        <a href="${HOST_URL}/markdown/">마크다운 실시간 에디터 (MARKDOWN)</a>
                    </div>
                </div>

                <div class="nav-dropdown" id="dropdown-data">
                    <button class="nav-dropbtn" onclick="toggleMobileNav(event, 'dropdown-data')">
                        <span class="desktop-label">개발/데이터</span><span class="mobile-label">데이터</span> ▾
                    </button>
                    <div class="nav-dropdown-content">
                        <a href="${HOST_URL}/fsee/">폴더 구조 엑셀 변환기 (FSEE)</a>
                        <a href="${HOST_URL}/coder/">Base64 & URL 변환기 (CODER)</a>
                        <a href="${HOST_URL}/beautify/">코드 뷰티파이어 & 뷰어 (BEAUTIFY)</a>
                        <a href="${HOST_URL}/json-viewer/">JSON 포맷터 & 검사기 (JSON)</a>
                    </div>
                </div>

                <div class="nav-dropdown" id="dropdown-util">
                    <button class="nav-dropbtn" onclick="toggleMobileNav(event, 'dropdown-util')">
                        <span class="desktop-label">시스템/디자인</span><span class="mobile-label">도구</span> ▾
                    </button>
                    <div class="nav-dropdown-content">
                        <a href="${HOST_URL}/time/">타임스탬프 변환기 (TIME)</a>
                        <a href="${HOST_URL}/hash/">UUID & 해시 생성기 (HASH)</a>
                        <a href="${HOST_URL}/qr/">QR 코드 생성기 (QR)</a>
                        <a href="${HOST_URL}/cron/">크론탭 주기 생성기 (CRON)</a>
                        <a href="${HOST_URL}/color/">웹 색상 스튜디오 (COLOR)</a>
                    </div>
                </div>
            </nav>
        </div>
        
        <div class="nav-right">
            <div class="nav-search-wrapper" id="nav-search-container">
                <input type="text" id="gnb-search-input" class="gnb-search-input" placeholder="검색..." oninput="handleGnbSearch(this.value)" onfocus="handleGnbFocus()" autocomplete="off">
                <span class="gnb-search-icon">🔍</span>
                <div class="gnb-search-results" id="gnb-search-results"></div>
            </div>

            <button id="theme-toggle-btn" class="theme-toggle-btn" onclick="toggleTheme()" title="다크/라이트 모드 전환">🌙</button>

            <a href="${HOST_URL}/about.html" class="nav-link-sub">소개/문의</a>
            <a href="${HOST_URL}/guide/" class="nav-link-sub">가이드</a>
            <a href="${HOST_URL}/" class="nav-hub-btn">DWK Hub ➔</a>
        </div>
    </header>
    `;

    // 4. 글로벌 푸터 HTML
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

    document.body.insertAdjacentHTML('afterbegin', navHTML);

    // 5. 다크모드 초기화 & 토글
    function initTheme() {
        const savedTheme = localStorage.getItem('dwk_theme');
        if (savedTheme === 'dark') {
            document.documentElement.classList.add('dark-theme');
        } else {
            document.documentElement.classList.remove('dark-theme');
        }
        updateToggleBtnIcon();
    }

    function updateToggleBtnIcon() {
        const btn = document.getElementById('theme-toggle-btn');
        if (!btn) return;
        const isDark = document.documentElement.classList.contains('dark-theme');
        btn.innerHTML = isDark ? '☀️' : '🌙';
    }

    window.toggleTheme = function() {
        const isDark = document.documentElement.classList.toggle('dark-theme');
        localStorage.setItem('dwk_theme', isDark ? 'dark' : 'light');
        updateToggleBtnIcon();
        applyBadgeColors();
    };

    // 6. 메인 허브 & 가이드 페이지 뱃지 매트 파스텔 틴트 동기화 엔진
    function applyBadgeColors() {
        const textTools = ['STRGET', 'COUNTER', 'STRCMP', 'MARKDOWN'];
        const dataTools = ['FSEE', 'CODER', 'BEAUTIFY', 'JSON'];
        const utilTools = ['TIME', 'HASH', 'QR', 'CRON', 'COLOR'];

        document.querySelectorAll('.card-badge, .logo-badge, .tool-badge, .badge').forEach(badge => {
            const txt = badge.innerText.trim().toUpperCase();
            badge.style.borderRadius = '4px';
            badge.style.fontWeight = '800';
            badge.style.padding = '2px 7px';
            badge.style.fontSize = '11.5px';
            badge.style.letterSpacing = '-0.2px';

            if (textTools.includes(txt)) {
                badge.style.backgroundColor = '#e0f2fe';
                badge.style.color = '#0369a1';
                badge.style.border = '1px solid #bae6fd';
            } else if (dataTools.includes(txt)) {
                badge.style.backgroundColor = '#ede9fe';
                badge.style.color = '#6d28d9';
                badge.style.border = '1px solid #ddd6fe';
            } else if (utilTools.includes(txt)) {
                badge.style.backgroundColor = '#ccfbf1';
                badge.style.color = '#0f766e';
                badge.style.border = '1px solid #99f6e4';
            } else {
                badge.style.backgroundColor = '#f1f5f9';
                badge.style.color = '#475569';
                badge.style.border = '1px solid #cbd5e1';
            }
        });
    }

    // 7. DOM 로드 완료 시
    window.addEventListener('DOMContentLoaded', () => {
        initTheme();
        applyBadgeColors();

        const targetContainer = document.getElementById('dwk-footer');
        if (targetContainer) {
            targetContainer.innerHTML = footerHTML;
        } else {
            document.body.insertAdjacentHTML('beforeend', footerHTML);
        }
    });

    // 8. GNB 검색
    window.handleGnbFocus = function() {
        const input = document.getElementById('gnb-search-input');
        if (input && input.value.trim().length > 0) {
            document.getElementById('gnb-search-results').style.display = 'block';
        }
    };

    window.handleGnbSearch = function(query) {
        const q = query.trim().toLowerCase();
        const resultsBox = document.getElementById('gnb-search-results');
        if (!resultsBox) return;

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
            resultsBox.innerHTML = '<div style="padding:12px;color:#94a3b8;font-size:12px;text-align:center;">검색 결과가 없습니다.</div>';
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

    // 9. 모바일 토글
    window.toggleMobileNav = function(e, dropdownId) {
        if (window.innerWidth <= 860) {
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

    // 10. 외부 클릭 닫기
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.nav-dropdown')) {
            document.querySelectorAll('.nav-dropdown').forEach(d => d.classList.remove('active'));
        }
        if (!e.target.closest('#nav-search-container')) {
            const resultsBox = document.getElementById('gnb-search-results');
            if (resultsBox) resultsBox.style.display = 'none';
        }
    });
})();
