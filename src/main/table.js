// Function to load data rows for the current page
function loadRows() {
    const loadingIndicator = document.getElementById('loading');
    loadingIndicator.style.display = 'block';

    const start = (currentPage - 1) * maxRows;
    const end = start + maxRows;

    // Get data for the current page
    const rowsToLoad = data.slice(start, end);
    const tableBody = document.getElementById('music-table-body');
    tableBody.innerHTML = ''; // Clear old rows

    rowsToLoad.forEach(row => {
        if (!row) return; // Skip if no data
        const tr = document.createElement('tr');

        const tdRow = document.createElement('td');
        const tdName = document.createElement('td');
        const tdAuthor = document.createElement('td');
        const tdLanguage = document.createElement('td');
        const tdLength = document.createElement('td');
        const tdInstrument = document.createElement('td');
        const tdMajor = document.createElement('td');
        const tdBpm = document.createElement('td');
        const tdLastUpdated = document.createElement('td');

        const nameLink = document.createElement('a');
        nameLink.href = row.link;
        nameLink.textContent = row.name;
        nameLink.target = '_blank';
        nameLink.className = 'link-name';

        tdRow.textContent = row.rowNumber;
        tdName.appendChild(nameLink);
        tdAuthor.textContent = row.author;
        tdLanguage.textContent = row.language;
        tdLength.textContent = row.length;
        tdInstrument.textContent = row.instrument;
        tdMajor.textContent = row.major;
        tdBpm.textContent = row.bpm;
        tdLastUpdated.textContent = row.lastUpdated;

        tr.appendChild(tdRow);
        tr.appendChild(tdName);
        tr.appendChild(tdAuthor);
        tr.appendChild(tdLanguage);
        tr.appendChild(tdLength);
        tr.appendChild(tdInstrument);
        tr.appendChild(tdMajor);
        tr.appendChild(tdBpm);
        tr.appendChild(tdLastUpdated);

        tableBody.appendChild(tr);
    });

    updatePagination(); // Update pagination info
    loadingIndicator.style.display = 'none';
}

// Function to update pagination buttons and info
function updatePagination() {
    const pageInfo = document.getElementById('pageInfo');
    const prevPageButton = document.getElementById('prevPage');
    const nextPageButton = document.getElementById('nextPage');

    const totalPages = Math.ceil(data.length / maxRows); // Calculate total pages
    pageInfo.textContent = `Page ${currentPage} of ${totalPages}`; // Update page info
    prevPageButton.disabled = currentPage === 1;
    nextPageButton.disabled = (currentPage * maxRows) >= data.length;
}

// Function to handle page change
function changePage(direction) {
    if (direction === 'next' && (currentPage * maxRows) < data.length) {
        currentPage++;
    } else if (direction === 'prev' && currentPage > 1) {
        currentPage--;
    }
    loadRows(); // Reload data for new page
}

// Add event listeners for pagination buttons
document.getElementById('nextPage').addEventListener('click', () => changePage('next'));
document.getElementById('prevPage').addEventListener('click', () => changePage('prev'));


function removeSpecialCharacters(str) {
    str = str.replace(/[!@#$%^&*()_+=~|\\{}[\];:'"<>,.?\/-]/g, ' ');
    return str.replace(/\s+/g, ' ');
}

// Function to remove diacritics from Vietnamese characters
function removeDiacritics(str) {
    const diacriticsMap = {
        'à': 'a', 'á': 'a', 'ả': 'a', 'ã': 'a', 'ạ': 'a',
        'ằ': 'a', 'ắ': 'a', 'ẳ': 'a', 'ẵ': 'a', 'ặ': 'a',
        'ầ': 'a', 'ấ': 'a', 'ẩ': 'a', 'ẫ': 'a', 'ậ': 'a',
        'è': 'e', 'é': 'e', 'ẻ': 'e', 'ẽ': 'e', 'ẹ': 'e',
        'ề': 'e', 'ế': 'e', 'ể': 'e', 'ễ': 'e', 'ệ': 'e',
        'ì': 'i', 'í': 'i', 'ỉ': 'i', 'ĩ': 'i', 'ị': 'i',
        'ò': 'o', 'ó': 'o', 'ỏ': 'o', 'õ': 'o', 'ọ': 'o',
        'ồ': 'o', 'ố': 'o', 'ổ': 'o', 'ỗ': 'o', 'ộ': 'o',
        'ờ': 'o', 'ớ': 'o', 'ở': 'o', 'ỡ': 'o', 'ợ': 'o',
        'ù': 'u', 'ú': 'u', 'ủ': 'u', 'ũ': 'u', 'ụ': 'u',
        'ừ': 'u', 'ứ': 'u', 'ử': 'u', 'ữ': 'u', 'ự': 'u',
        'ỳ': 'y', 'ý': 'y', 'ỷ': 'y', 'ỹ': 'y', 'ỵ': 'y',
        'ă': 'a', 'â': 'a', 'ê': 'e', 'ô': 'o', 'ơ': 'o',
        'ư': 'u', 'Ư': 'U',
        'À': 'A', 'Á': 'A', 'Ả': 'A', 'Ã': 'A', 'Ạ': 'A',
        'Ằ': 'A', 'Ắ': 'A', 'Ẳ': 'A', 'Ẵ': 'A', 'Ặ': 'A',
        'Ầ': 'A', 'Ấ': 'A', 'Ẩ': 'A', 'Ẫ': 'A', 'Ậ': 'A',
        'È': 'E', 'É': 'E', 'Ẻ': 'E', 'Ẽ': 'E', 'Ẹ': 'E',
        'Ề': 'E', 'Ế': 'E', 'Ể': 'E', 'Ễ': 'E', 'Ệ': 'E',
        'Ì': 'I', 'Í': 'I', 'Ỉ': 'I', 'Ĩ': 'I', 'Ị': 'I',
        'Ò': 'O', 'Ó': 'O', 'Ỏ': 'O', 'Õ': 'O', 'Ọ': 'O',
        'Ồ': 'O', 'Ố': 'O', 'Ổ': 'O', 'Ỗ': 'O', 'Ộ': 'O',
        'Ờ': 'O', 'Ớ': 'O', 'Ở': 'O', 'Ỡ': 'O', 'Ợ': 'O',
        'Ù': 'U', 'Ú': 'U', 'Ủ': 'U', 'Ũ': 'U', 'Ụ': 'U',
        'Ừ': 'U', 'Ứ': 'U', 'Ử': 'U', 'Ữ': 'U', 'Ự': 'U',
        'Ỳ': 'Y', 'Ý': 'Y', 'Ỷ': 'Y', 'Ỹ': 'Y', 'Ỵ': 'Y',
        'Ă': 'A', 'Â': 'A', 'Ê': 'E', 'Ô': 'O', 'Ơ': 'O',
        'đ': 'd', 'Đ': 'D'
    };

    return str.split('').map(char => diacriticsMap[char] || char).join('');
}

// Function to convert Japanese characters to Romaji (basic version)
function convertToRomaji(japaneseText) {
    const romajiMap = {
        'あ': 'a', 'い': 'i', 'う': 'u', 'え': 'e', 'お': 'o',
        'か': 'ka', 'き': 'ki', 'く': 'ku', 'け': 'ke', 'こ': 'ko',
        'さ': 'sa', 'し': 'shi', 'す': 'su', 'せ': 'se', 'そ': 'so',
        'た': 'ta', 'ち': 'chi', 'つ': 'tsu', 'て': 'te', 'と': 'to',
        'な': 'na', 'に': 'ni', 'ぬ': 'nu', 'ね': 'ne', 'の': 'no',
        'は': 'ha', 'ひ': 'hi', 'ふ': 'fu', 'へ': 'he', 'ほ': 'ho',
        'ま': 'ma', 'み': 'mi', 'む': 'mu', 'め': 'me', 'も': 'mo',
        'や': 'ya', 'ゆ': 'yu', 'よ': 'yo',
        'ら': 'ra', 'り': 'ri', 'る': 'ru', 'れ': 're', 'ろ': 'ro',
        'わ': 'wa', 'を': 'wo', 'ん': 'n',
        // Add more mappings for Kanji if needed
    };

    return japaneseText.split('').map(char => romajiMap[char] || char).join('');
}

// Function to convert Korean characters to Romaja using Revised Romanization
function convertToRomaja(koreanText) {
    const romajaMap = {
        '가': 'ga', '각': 'gak', '갂': 'gah', '간': 'gan', '갇': 'gan', '갈': 'gal', '감': 'gam', '갑': 'gak', '갔': 'gat', 
        '강': 'gang', '개': 'gae', '객': 'gaek', '갠': 'gaen', '갤': 'gael', '걀': 'gyal', '걍': 'gyang', 
        '거': 'geo', '걱': 'geok', '건': 'geon', '걷': 'geod', '걸': 'geol', '곁': 'gyeot', '곱': 'gop', 
        '곳': 'got', '공': 'gong', '과': 'gwa', '곽': 'gwak', '괄': 'gwal', '괘': 'gwae', '교': 'gyo', 
        '구': 'gu', '국': 'guk', '군': 'gun', '굳': 'gud', '굴': 'gul', '궁': 'gung', '귄': 'gwin', 
        '그': 'geu', '금': 'geum', '긍': 'geung', '기': 'gi', '긴': 'gin', '길': 'gil', 
        '김': 'gim', '까': 'kka', '꽈': 'kkwa', '꽂': 'kkot', '꾀': 'kkwe', '꾹': 'kkuk', 
        '나': 'na', '낙': 'nak', '난': 'nan', '날': 'nal', '남': 'nam', '낭': 'nang', 
        '내': 'nae', '냄': 'naem', '냉': 'naeng', '너': 'neo', '넉': 'neok', '넌': 'neon', 
        '널': 'neol', '놈': 'nom', '놈': 'nom', '놉': 'nop', '놋': 'not', '누': 'nu', 
        '눈': 'nun', '는': 'neun', '니': 'ni', '달': 'dal', '담': 'dam', '당': 'dang', 
        '대': 'dae', '도': 'do', '독': 'dok', '돈': 'don', '동': 'dong', '돼': 'dwae', 
        '딜': 'dil', '라': 'ra', '락': 'rak', '란': 'ran', '랄': 'ral', '램': 'raem', 
        '량': 'ryang', '려': 'ryeo', '로': 'ro', '록': 'rok', '론': 'ron', '룩': 'ruk', 
        '리': 'ri', '리': 'ri', '마': 'ma', '막': 'mak', '만': 'man', '말': 'mal', 
        '망': 'mang', '매': 'mae', '맥': 'maek', '면': 'myeon', '명': 'myeong', 
        '모': 'mo', '목': 'mok', '문': 'mun', '물': 'mul', '미': 'mi', '바': 'ba', 
        '박': 'bak', '반': 'ban', '발': 'bal', '방': 'bang', '배': 'bae', '밥': 'bap', 
        '봐': 'bwa', '부': 'bu', '북': 'buk', '분': 'bun', '불': 'bul', '비': 'bi', 
        '사': 'sa', '삭': 'sak', '산': 'san', '살': 'sal', '상': 'sang', '새': 'sae', 
        '색': 'saek', '샌': 'saen', '서': 'seo', '석': 'seok', '선': 'seon', 
        '설': 'seol', '섰': 'seot', '세': 'se', '소': 'so', '속': 'sok', 
        '순': 'sun', '술': 'sul', '습': 'seup', '시': 'si', '식': 'sik', 
        '신': 'sin', '실': 'sil', '씨': 'ssi', '아': 'a', '악': 'ak', 
        '안': 'an', '알': 'al', '암': 'am', '앙': 'ang', '애': 'ae', 
        '액': 'aek', '야': 'ya', '약': 'yak', '얌': 'yam', '얍': 'yap', 
        '얘': 'yae', '연': 'yeon', '열': 'yeol', '옌': 'yen', '옷': 'ot', 
        '왕': 'wang', '왜': 'wae', '외': 'oe', '우': 'u', '욱': 'uk', 
        '운': 'un', '울': 'ul', '은': 'eun', '을': 'eul', '이': 'i', 
        '익': 'ik', '인': 'in', '일': 'il', '임': 'im', '자': 'ja', 
        '작': 'jak', '잔': 'jan', '잘': 'jal', '장': 'jang', '재': 'jae', 
        '전': 'jeon', '절': 'jeol', '제': 'je', '조': 'jo', '족': 'jok', 
        '존': 'jon', '좀': 'jom', '주': 'ju', '죽': 'juk', '줄': 'jul', 
        '중': 'jung', '지': 'ji', '직': 'jik', '진': 'jin', '집': 'jip', 
        '차': 'cha', '착': 'chak', '찬': 'chan', '찬': 'chan', '창': 'chang', 
        '책': 'chaek', '쳐': 'cheo', '처': 'cheo', '초': 'cho', '최': 'choi', 
        '추': 'chu', '충': 'chung', '치': 'chi', '치': 'chi', '크': 'keu', 
        '타': 'ta', '탁': 'tak', '탄': 'tan', '탑': 'tap', '태': 'tae', 
        '피': 'pi', '편': 'pyeon', '포': 'po', '표': 'pyo', '프': 'peu', 
        '하': 'ha', '학': 'hak', '한': 'han', '할': 'hal', '함': 'ham', 
        '합': 'hap', '해': 'hae', '햇': 'haet', '햇': 'haet', '헐': 'heol', 
        '형': 'hyeong', '화': 'hwa', '황': 'hwang'
    };

    let romaja = '';
    
    for (let char of koreanText) {
        romaja += romajaMap[char] || char; // Append the mapped Romaja or the character itself
    }

    return romaja;
}

// Function to convert Chinese characters to Pinyin
function convertToPinyin(text) {
    return pinyin(text, {
        style: pinyin.STYLE_NORMAL,
        heteronym: false
    }).join(' ');
}

document.getElementById('searchInput').addEventListener('input', function() {
    const searchValue = removeDiacritics(this.value.toLowerCase());
    const rows = document.querySelectorAll('#music-table-body tr');

    rows.forEach(row => {
        const name = removeSpecialCharacters(row.querySelector('td:nth-child(2)').textContent.toLowerCase());
        const author = removeSpecialCharacters(row.querySelector('td:nth-child(3)').textContent.toLowerCase());

        const normalizedName = removeDiacritics(name);
        const normalizedAuthor = removeDiacritics(author);

        // Convert Chinese name and author to Pinyin
        //const chineseName = convertToPinyin(name);
        //const chineseAuthor = convertToPinyin(author);
        
        // Convert Korean name and author to Romaja
        const romajaName = convertToRomaja(name);
        const romajaAuthor = convertToRomaja(author);
        
        // Convert Japanese name and author to Romaji
        const romajiName = convertToRomaji(name);
        const romajiAuthor = convertToRomaji(author);

        // Check for matches
        const matches = normalizedName.includes(searchValue) ||
                        normalizedAuthor.includes(searchValue) ||
                        //chineseName.includes(searchValue) ||
                        //chineseAuthor.includes(searchValue) ||
                        romajaName.includes(searchValue) ||
                        romajaAuthor.includes(searchValue) ||
                        romajiName.includes(searchValue) ||
                        romajiAuthor.includes(searchValue);

        row.style.display = matches ? '' : 'none';
    });
});
