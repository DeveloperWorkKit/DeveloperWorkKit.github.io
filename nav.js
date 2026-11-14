// nav.js - DevWorKit 글로벌 내비게이션 & 파스텔 틴트 뱃지 엔진
(function () {
    'use strict';

    const HOST_URL = 'https://developerworkkit.github.io';
    const DEFAULT_TITLE = '직장인 업무 치트키 알려드릴까요? | devworkkit';
    const DEFAULT_DESC = '추출/변환/편집... 일일이 검색할 필요 없이 한 번에 해결!';
    const ADSENSE_CLIENT = 'ca-pub-3823705730142714';

    const descriptionEl = document.querySelector('meta[name="description"]');
    const pageTitle = document.title || DEFAULT_TITLE;
    const pageDescription = (descriptionEl && descriptionEl.content) || DEFAULT_DESC;

    // /folder/index.html은 /folder/로 정규화합니다.
    // .html을 사용하는 기존 가이드 URL은 그대로 유지합니다.
    function getDefaultCanonicalUrl() {
        let path = window.location.pathname || '/';

        if (/\/index\.html$/i.test(path)) {
            path = path.replace(/index\.html$/i, '');
        }

        if (path === '/index.html' || path === '') {
            path = '/';
        } else if (!path.endsWith('/') && !/\.[a-z0-9]+$/i.test(path)) {
            path += '/';
        }

        return HOST_URL + path;
    }

    function upsertMeta(attribute, key, content) {
        const selector = `meta[${attribute}="${key}"]`;
        let elements = Array.from(document.head.querySelectorAll(selector));
        let element = elements.shift();

        if (!element) {
            element = document.createElement('meta');
            element.setAttribute(attribute, key);
            document.head.appendChild(element);
        }

        // 같은 속성의 메타 태그가 이미 여러 개라면 하나만 유지합니다.
        elements.forEach(duplicate => duplicate.remove());

        element.setAttribute('content', content);
    }

    function upsertCanonical() {
        const canonicalElements = Array.from(
            document.head.querySelectorAll('link[rel="canonical"]')
        );

        let canonical = canonicalElements.shift();

        if (!canonical) {
            canonical = document.createElement('link');
            canonical.rel = 'canonical';
            document.head.appendChild(canonical);
        }

        // Canonical은 nav.js에서 계산한 페이지 정규 URL 하나로 통일합니다.
        canonical.href = getDefaultCanonicalUrl();

        // 기존 HTML이나 다른 스크립트가 추가한 중복 canonical을 제거합니다.
        canonicalElements.forEach(duplicate => duplicate.remove());
    }

    function addCommonHeadElements() {
        if (!document.head.querySelector('link[rel="icon"]')) {
            const icon = document.createElement('link');
            icon.rel = 'icon';
            icon.href = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ctext y='.9em' font-size='90'%3E%F0%9F%9B%A0%EF%B8%8F%3C/text%3E%3C/svg%3E";
            document.head.appendChild(icon);
        }

        const canonicalUrl = getDefaultCanonicalUrl();

        upsertMeta('property', 'og:type', 'website');
        upsertMeta('property', 'og:url', canonicalUrl);
        upsertMeta('property', 'og:site_name', 'DevWorKit');
        upsertMeta('property', 'og:title', pageTitle);
        upsertMeta('property', 'og:description', pageDescription);
        upsertMeta('property', 'og:image', HOST_URL + '/og-image.png');
        upsertMeta('property', 'og:image:width', '1200');
        upsertMeta('property', 'og:image:height', '630');

        upsertMeta('name', 'twitter:card', 'summary_large_image');
        upsertMeta('name', 'twitter:title', pageTitle);
        upsertMeta('name', 'twitter:description', pageDescription);
        upsertMeta('name', 'twitter:image', HOST_URL + '/og-image.png');

        upsertCanonical();

        const hasNavCss = Array.from(
            document.querySelectorAll('link[rel="stylesheet"]')
        ).some(link => {
            try {
                return new URL(link.href, window.location.href).pathname === '/nav.css';
            } catch (_) {
                return false;
            }
        });

        if (!hasNavCss) {
            const css = document.createElement('link');
            css.rel = 'stylesheet';
            css.href = HOST_URL + '/nav.css';
            document.head.appendChild(css);
        }
    }

    addCommonHeadElements();

    // AdSense 로더: 각 페이지에 이미 있으면 중복으로 삽입하지 않습니다.
    if (!document.querySelector('script[src*="pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"]')) {
        const adScript = document.createElement('script');
        adScript.async = true;
        adScript.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=' + ADSENSE_CLIENT;
        adScript.crossOrigin = 'anonymous';
        document.head.appendChild(adScript);
    }

    // 13개 전체 도구 데이터베이스
    const TOOLS_DATA = [
        { name: '문자열 추출기', tag: 'STRGET', url: `${HOST_URL}/strget/`, keywords: '정규식 이메일 전화번호 regex extract' },
        { name: '글자수 & 바이트 계산기', tag: 'COUNTER', url: `${HOST_URL}/counter/`, keywords: 'byte length 한글 euckr utf8' },
        { name: '텍스트 & 코드 비교기', tag: 'STRCMP', url: `${HOST_URL}/strcmp/`, keywords: 'diff 문자열 차이점 비교 대조 code compare' },
        { name: '마크다운 실시간 에디터', tag: 'MARKDOWN', url: `${HOST_URL}/markdown/`, keywords: 'latex mermaid katex checklist editor' },
        { name: '폴더 구조 엑셀 변환기', tag: 'FSEE', url: `${HOST_URL}/fsee/`, keywords: 'tree folder directory zip excel 스프레드시트' },
        { name: 'Base64 & URL 변환기', tag: 'CODER', url: `${HOST_URL}/coder/`, keywords: '인코딩 디코딩 encoding decoding uri html entity' },
        { name: '코드 뷰티파이어 & 뷰어', tag: 'BEAUTIFY', url: `${HOST_URL}/beautify/`, keywords: 'html css javascript js powershell ps1 파워쉘 formatter 정렬 압축' },
        { name: 'JSON 포맷터 & 검사기', tag: 'JSON', url: `${HOST_URL}/json/`, keywords: 'formatter validator json format parse 구문오류' },
        { name: '타임스탬프 변환기', tag: 'TIME', url: `${HOST_URL}/time/`, keywords: 'unix timestamp epoch kst utc 시간 날짜 date' },
        { name: 'UUID & 해시 생성기', tag: 'HASH', url: `${HOST_URL}/hash/`, keywords: 'sha256 sha512 md5 암호화 식별자 unique id' },
        { name: 'QR 코드 생성기', tag: 'QR', url: `${HOST_URL}/qr/`, keywords: 'qr code 큐알코드 생성기 generator svg png' },
        { name: '크론탭 주기 생성기', tag: 'CRON', url: `${HOST_URL}/cron/`, keywords: 'crontab linux 스케줄러 expression 정기작업' },
        { name: '웹 색상 스튜디오', tag: 'COLOR', url: `${HOST_URL}/color/`, keywords: 'contrast wcag 명도대비 대비비 palette 색상표' }
    ];

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
                        <a href="${HOST_URL}/json/">JSON 포맷터 & 검사기 (JSON)</a>
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
            <a href="${HOST_URL}/about/" class="nav-link-sub">소개/문의</a>
            <a href="${HOST_URL}/guide/" class="nav-link-sub">가이드</a>
            <a href="${HOST_URL}/" class="nav-hub-btn">DWK Hub ➔</a>
        </div>
    </header>`;

    const footerHTML = `
    <footer class="dwk-global-footer">
        <div class="dwk-footer-links">
            <a href="${HOST_URL}/about/">서비스 소개 및 문의</a>
            <a href="${HOST_URL}/privacy/">개인정보처리방침</a>
            <a href="https://github.com/developerworkkit/developerworkkit.github.io" target="_blank" rel="noopener">GitHub</a>
        </div>
        <div class="dwk-footer-copy">
            © DevWorKit (DWK) - All Tools Built for Productivity
        </div>
    </footer>`;

    if (!document.querySelector('.dwk-global-nav')) {
        document.body.insertAdjacentHTML('afterbegin', navHTML);
    }

    // 다크모드 초기화 및 토글
    function updateToggleBtnIcon() {
        const button = document.getElementById('theme-toggle-btn');
        if (!button) return;

        const isDark = document.documentElement.classList.contains('dark-theme');
        button.textContent = isDark ? '☀️' : '🌙';
    }

    function initTheme() {
        let savedTheme = 'light';

        try {
            savedTheme = localStorage.getItem('dwk_theme') || 'light';
        } catch (_) {
            // 저장소 접근이 차단된 환경에서는 기본 라이트 테마를 사용합니다.
        }

        document.documentElement.classList.toggle('dark-theme', savedTheme === 'dark');
        updateToggleBtnIcon();
    }

    window.toggleTheme = function () {
        const isDark = document.documentElement.classList.toggle('dark-theme');

        try {
            localStorage.setItem('dwk_theme', isDark ? 'dark' : 'light');
        } catch (_) {
            // 저장소 접근이 차단되어도 현재 페이지의 테마 전환은 동작합니다.
        }

        updateToggleBtnIcon();
        applyBadgeColors();
    };

    // 메인 허브 및 가이드 페이지 뱃지 색상 동기화
    function applyBadgeColors() {
        const textTools = ['STRGET', 'COUNTER', 'STRCMP', 'MARKDOWN'];
        const dataTools = ['FSEE', 'CODER', 'BEAUTIFY', 'JSON'];
        const utilTools = ['TIME', 'HASH', 'QR', 'CRON', 'COLOR'];

        document.querySelectorAll('.card-badge, .logo-badge, .tool-badge, .badge').forEach(badge => {
            const text = badge.innerText.trim().toUpperCase();

            badge.style.borderRadius = '4px';
            badge.style.fontWeight = '800';
            badge.style.padding = '2px 7px';
            badge.style.fontSize = '11.5px';
            badge.style.letterSpacing = '-0.2px';

            if (textTools.includes(text)) {
                badge.style.backgroundColor = '#e0f2fe';
                badge.style.color = '#0369a1';
                badge.style.border = '1px solid #bae6fd';
            } else if (dataTools.includes(text)) {
                badge.style.backgroundColor = '#ede9fe';
                badge.style.color = '#6d28d9';
                badge.style.border = '1px solid #ddd6fe';
            } else if (utilTools.includes(text)) {
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

    // 푸터 렌더링
    function renderFooter() {
        const targetContainer = document.getElementById('dwk-footer');

        if (targetContainer) {
            targetContainer.innerHTML = footerHTML;
        } else if (!document.querySelector('.dwk-global-footer')) {
            document.body.insertAdjacentHTML('beforeend', footerHTML);
        }
    }

    function initializePage() {
        initTheme();
        applyBadgeColors();
        renderFooter();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializePage, { once: true });
    } else {
        initializePage();
    }

    // GNB 검색
    window.handleGnbFocus = function () {
        const input = document.getElementById('gnb-search-input');
        const results = document.getElementById('gnb-search-results');

        if (input && results && input.value.trim().length > 0) {
            results.style.display = 'block';
        }
    };

    window.handleGnbSearch = function (query) {
        const searchTerm = String(query || '').trim().toLowerCase();
        const resultsBox = document.getElementById('gnb-search-results');

        if (!resultsBox) return;

        if (!searchTerm) {
            resultsBox.innerHTML = '';
            resultsBox.style.display = 'none';
            return;
        }

        const filtered = TOOLS_DATA.filter(tool =>
            tool.name.toLowerCase().includes(searchTerm) ||
            tool.tag.toLowerCase().includes(searchTerm) ||
            tool.keywords.toLowerCase().includes(searchTerm)
        );

        if (filtered.length === 0) {
            resultsBox.innerHTML = '<div style="padding:12px;color:#94a3b8;font-size:12px;text-align:center;">검색 결과가 없습니다.</div>';
        } else {
            resultsBox.innerHTML = filtered.map(tool => `
                <a href="${tool.url}">
                    <span>${tool.name}</span>
                    <span class="gnb-result-tag">${tool.tag}</span>
                </a>`).join('');
        }

        resultsBox.style.display = 'block';
    };

    // 모바일 메뉴 토글
    window.toggleMobileNav = function (event, dropdownId) {
        if (window.innerWidth > 860) return;

        event.preventDefault();
        event.stopPropagation();

        const target = document.getElementById(dropdownId);
        if (!target) return;

        const wasActive = target.classList.contains('active');

        document.querySelectorAll('.nav-dropdown').forEach(dropdown => {
            dropdown.classList.remove('active');
        });

        if (!wasActive) {
            target.classList.add('active');
        }
    };

    // 메뉴 및 검색 결과 외부 클릭 시 닫기
    document.addEventListener('click', function (event) {
        const target = event.target;

        if (!(target instanceof Element)) return;

        if (!target.closest('.nav-dropdown')) {
            document.querySelectorAll('.nav-dropdown').forEach(dropdown => {
                dropdown.classList.remove('active');
            });
        }

        if (!target.closest('#nav-search-container')) {
            const resultsBox = document.getElementById('gnb-search-results');

            if (resultsBox) {
                resultsBox.style.display = 'none';
            }
        }
    });
})();