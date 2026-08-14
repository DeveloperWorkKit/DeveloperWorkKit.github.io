// nav.js - DWK 공통 네비게이션바 (루트 도메인 맞춤형)
document.addEventListener("DOMContentLoaded", function() {
    const BASE_URL = "https://developerworkkit.github.io";

    const navHTML = `
        <div id="dwk-common-nav" style="
            background-color: #121316;
            border-bottom: 1px solid #282a2e;
            padding: 9px 24px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            font-size: 13px;
            color: #d1d5db;
            z-index: 99999;
            position: relative;
            box-sizing: border-box;
            width: 100%;
        ">
            <div style="display: flex; align-items: center; gap: 16px; flex-wrap: wrap;">
                <a href="${BASE_URL}/" style="display: flex; align-items: center; gap: 8px; text-decoration: none;">
                    <span style="background-color: #2563eb; color: #ffffff; font-weight: 800; font-size: 11px; padding: 2px 6px; border-radius: 4px; letter-spacing: 0.5px;">DWK</span>
                    <span style="font-weight: 700; color: #ffffff; letter-spacing: -0.3px; font-size: 13.5px;">DevWorKit</span>
                </a>
                <span style="color: #374151;">|</span>
                <a href="${BASE_URL}/strget/" style="color: #9ca3af; text-decoration: none; font-weight: 500; transition: color 0.15s;" onmouseover="this.style.color='#ffffff'" onmouseout="this.style.color='#9ca3af'">문자열 추출기</a>
                <span style="color: #374151;">|</span>
                <a href="${BASE_URL}/fsee/" style="color: #9ca3af; text-decoration: none; font-weight: 500; transition: color 0.15s;" onmouseover="this.style.color='#ffffff'" onmouseout="this.style.color='#9ca3af'">폴더 구조 엑셀</a>
                <span style="color: #374151;">|</span>
                <a href="${BASE_URL}/strcmp/" style="color: #9ca3af; text-decoration: none; font-weight: 500; transition: color 0.15s;" onmouseover="this.style.color='#ffffff'" onmouseout="this.style.color='#9ca3af'">텍스트 비교</a>
                <span style="color: #374151;">|</span>
                <a href="${BASE_URL}/zbdkf/" style="color: #9ca3af; text-decoration: none; font-weight: 500; transition: color 0.15s;" onmouseover="this.style.color='#ffffff'" onmouseout="this.style.color='#9ca3af'">QR 마스터</a>
            </div>
            <div>
                <a href="${BASE_URL}/" style="color: #6b7280; text-decoration: none; font-size: 12px; font-weight: 500; transition: color 0.15s;" onmouseover="this.style.color='#9ca3af'" onmouseout="this.style.color='#6b7280'">DWK Hub ➔</a>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML('afterbegin', navHTML);
});
