
// Decrypt and display title function
function decryptTitle() {
    const titleElement = document.getElementById('mainTitle');
    if (titleElement) {
        let titleHTML = '<i class="fa-solid fa-graduation-cap mr-2 text-indigo-600"></i>';
        encryptedTitle.parts.forEach(part => {
            titleHTML += `<span class="${part.color}">${part.text}</span> `;
        });
        titleHTML += '<i class="fa-solid fa-id-card-clip ml-2 text-emerald-600"></i>';
        titleElement.innerHTML = titleHTML;
    }
}

// Location-based data configuration
let currentCountry = 'IN'; // Default to India
let countryData = {};

// Performance optimization: Debounce function
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Cache DOM elements for better performance
const domCache = {
    nameInput: null,
    cardName: null,
    mobileInput: null,
    cardMobile: null,
    websiteInput: null,
    cardWebsiteText: null,
    collegeInput: null,
    cardUniversity: null,
    addressInput: null,
    cardAddress: null,
    classInput: null,
    cardClass: null,
    idInput: null,
    cardId: null,
    principalNameInput: null,
    cardPrincipalName: null
};

// Initialize DOM cache
function initDOMCache() {
    domCache.nameInput = document.getElementById('nameInput');
    domCache.cardName = document.getElementById('cardName');
    domCache.mobileInput = document.getElementById('mobileInput');
    domCache.cardMobile = document.getElementById('card-mobile');
    domCache.websiteInput = document.getElementById('websiteInput');
    domCache.cardWebsite = document.getElementById('card-website');
    domCache.collegeInput = document.getElementById('collegeNameInput');
    domCache.cardUniversity = document.getElementById('cardUniversity');
    domCache.addressInput = document.getElementById('addressInput');
    domCache.cardAddress = document.getElementById('cardAddress');
    domCache.classInput = document.getElementById('classInput');
    domCache.cardClass = document.getElementById('cardClass');
    domCache.idInput = document.getElementById('idInput');
    domCache.cardId = document.getElementById('cardId');
    domCache.principalNameInput = document.getElementById('principalNameInput');
    domCache.cardPrincipalName = document.getElementById('card-principal-name');
}

// Enhanced IP-based location detection with faster timeout
async function detectUserLocation() {
    // Pre-read timezone for overrides (helps when VPN IP geolocation is off)
    const tz = (() => {
        try { return Intl.DateTimeFormat().resolvedOptions().timeZone || ''; } catch(_) { return ''; }
    })();
    // Developer/test override via URL: ?country=IN/BD/PK/UK/NG
    try {
        const params = new URLSearchParams(window.location.search);
        const override = (params.get('country') || '').toUpperCase();
        if (override === 'IN' || override === 'BD' || override === 'PK' || override === 'UK' || override === 'NG' || override === 'AU') {
            console.log('🔧 Country override via URL:', override);
            return override === 'UK' ? 'UK' : override;
        }
    } catch(_) {}

    const detectionMethods = [
        {
            name: 'ipapi.co',
            url: 'https://ipapi.co/json/',
            parser: (data) => data.country_code?.toUpperCase(),
            timeout: 2000  // Optimized timeout
        },
        {
            name: 'ipinfo.io',
            url: 'https://ipinfo.io/json',
            parser: (data) => data.country?.toUpperCase(),
            timeout: 2000  // Optimized timeout
        },
        {
            name: 'ip-api.com',
            url: 'https://ip-api.com/json/',
            parser: (data) => data.countryCode?.toUpperCase(),
            timeout: 2000  // Optimized timeout
        },
        {
            name: 'ipgeolocation.io',
            url: 'https://api.ipgeolocation.io/ipgeo?apiKey=free',
            parser: (data) => data.country_code2?.toUpperCase(),
            timeout: 3000
        },
        {
            name: 'ipapi.is',
            url: 'https://ipapi.is/json/',
            parser: (data) => data.country_code?.toUpperCase(),
            timeout: 3000
        },
        {
            name: 'ip-api.io',
            url: 'https://ip-api.io/json/',
            parser: (data) => data.country_code?.toUpperCase(),
            timeout: 3000
        }
    ];

     // Enhanced country detection with India/Pakistan priority
     console.log('🌍 Starting enhanced country detection...');
     const detectionAPIs = [
         'https://ipapi.co/json/',
         'https://ipinfo.io/json',
         'https://ip-api.com/json/',
         'https://ipwho.is/',
         'https://api.country.is/',
         'https://get.geojs.io/v1/ip/country.json'
     ];
    
     const detectionResults = await Promise.allSettled(
         detectionAPIs.map(async (url) => {
            const controller = new AbortController();
            const timeout = setTimeout(() => controller.abort(), 2000);
            try {
                const response = await fetch(url, { 
                    signal: controller.signal, 
                    headers: { 'Accept': 'application/json' } 
                });
                clearTimeout(timeout);
                if (response.ok) {
                    const data = await response.json();
                    // Try different field names for country code
                    let countryCode = data.country_code || data.country || data.countryCode || data.country_code2 || data.country_iso_code;
                    if (countryCode) {
                        countryCode = countryCode.toUpperCase();
                        if (countryCode === 'GB') countryCode = 'UK';
                        console.log(`🔍 ${url} returned: ${countryCode}`);
                        return countryCode;
                    }
                }
            } catch (error) {
                clearTimeout(timeout);
            }
            return null;
        })
    );
    
     const validResults = detectionResults
         .map(r => r.status === 'fulfilled' ? r.value : null)
         .filter(Boolean);
    
    console.log('🔍 All API results:', validResults);
    
    // Count occurrences and pick most common
    const counts = {};
    validResults.forEach(code => {
        counts[code] = (counts[code] || 0) + 1;
    });
    
    console.log('📊 Country code counts:', counts);
    
    // Priority order: IN > PK > BD > others
    // Special handling for UK misdetection in India
    if (counts['GB'] && counts['IN']) {
        console.log('⚠️ UK detected but India also detected, prioritizing India');
        return 'IN';
    }
    
    if (counts['IN'] && counts['IN'] >= 1) {
        console.log('✅ India detected by APIs');
        return 'IN';
    }
    if (counts['PK'] && counts['PK'] >= 1) {
        console.log('✅ Pakistan detected by APIs');
        return 'PK';
    }
    if (counts['BD'] && counts['BD'] >= 2) {
        console.log('✅ Bangladesh detected by majority of APIs');
        return 'BD';
    }
    
    // If only UK is detected, likely misdetection - use India as fallback
    if (counts['GB'] && !counts['IN'] && !counts['PK'] && !counts['BD']) {
        console.log('⚠️ Only UK detected, likely misdetection - using India fallback');
        return 'IN';
    }
    
    // If no clear majority, use the most common result
    const mostCommon = Object.keys(counts).reduce((a, b) => counts[a] > counts[b] ? a : b);
    if (mostCommon && counts[mostCommon] >= 1) {
        console.log(`✅ Most common result: ${mostCommon}`);
        return mostCommon;
    }

    // Fallback to original parallel detection
    console.log('🔄 Falling back to original parallel detection...');
    try {
        const parallelResults = await Promise.allSettled(
            detectionMethods.map(async (method) => {
                const controller = new AbortController();
                const t = setTimeout(() => controller.abort(), method.timeout);
                try {
                    const res = await fetch(method.url, { signal: controller.signal, headers: { 'Accept': 'application/json' } });
                    clearTimeout(t);
                    if (res.ok) {
                        const data = await res.json();
                        let code = method.parser(data);
                        if (code === 'GB') code = 'UK';
                        return code;
                    }
                } catch(_) { /* ignore */ }
                finally { clearTimeout(t); }
                return null;
            })
        );
        const codes = parallelResults
            .map(r => r.status === 'fulfilled' ? r.value : null)
            .filter(Boolean);
        if (codes.length) {
            console.log('🔍 IP Detection results:', codes);
            console.log('🌍 Current timezone:', tz);
            
            // Fix IN and PK detection specifically
            if (codes.includes('IN')) {
                console.log('✅ India detected via IP');
                return 'IN';
            }
            if (codes.includes('PK')) {
                console.log('✅ Pakistan detected via IP');
                return 'PK';
            }
            if (codes.includes('BD')) return 'BD';
            if (codes.includes('UK')) {
                // If UK via IP but timezone strongly indicates India, prefer IN
                if (tz.includes('Kolkata') || tz.includes('Mumbai') || tz.includes('Delhi') || tz.includes('Calcutta') || tz.includes('Asia/Kolkata') || tz.includes('Asia/Calcutta')) {
                    console.log('🧭 UK IP but India timezone → IN');
                    return 'IN';
                }
                return 'UK';
            }
            // Add new countries at the end without changing existing order
            if (codes.includes('NG')) {
                console.log('🇳🇬 Nigeria detected via parallel IP geolocation!');
                return 'NG';
            }
            if (codes.includes('AU')) {
                console.log('🇦🇺 Australia detected via parallel IP geolocation!');
                return 'AU';
            }
        }
    } catch(_) { /* ignore and fall back to sequential */ }

    // Try each detection method with improved error handling
    for (const method of detectionMethods) {
        try {
            console.log(`🌍 Trying ${method.name} for location detection...`);
            
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), method.timeout);
            
            const response = await fetch(method.url, {
                signal: controller.signal,
                headers: {
                    'Accept': 'application/json',
                    'User-Agent': 'Mozilla/5.0 (compatible; IDCardGenerator/1.0)',
                },
                mode: 'cors'
            });
            
            clearTimeout(timeoutId);
            
            if (response.ok) {
                const data = await response.json();
                let countryCode = method.parser(data);
                
                if (countryCode && (countryCode === 'BD' || countryCode === 'IN' || countryCode === 'PK' || countryCode === 'NG' || countryCode === 'GB' || countryCode === 'UK' || countryCode === 'AU')) {
                    console.log(`🔍 ${method.name} returned: ${countryCode}`);
                    console.log(`🌍 Current timezone: ${tz}`);
                    
                    // Override: if API says GB but system timezone is clearly India, prefer IN
                    if ((countryCode === 'GB' || countryCode === 'UK') && (
                        tz.includes('Kolkata') || tz.includes('Mumbai') || tz.includes('Delhi') || tz.includes('Calcutta') || tz.includes('Asia/Kolkata') || tz.includes('Asia/Calcutta')
                    )) {
                        console.log(`🧭 Timezone override (India) over ${method.name} → IN`);
                        return 'IN';
                    }
                    
                    // Fix IN and PK detection specifically
                    if (countryCode === 'IN') {
                        console.log(`✅ India detected via ${method.name}`);
                        return 'IN';
                    }
                    if (countryCode === 'PK') {
                        console.log(`✅ Pakistan detected via ${method.name}`);
                        return 'PK';
                    }
                    
                    console.log(`✅ Location detected via ${method.name}: ${countryCode}`);
                    if (countryCode === 'NG') {
                        console.log('🇳🇬 Nigeria detected via IP geolocation!');
                    }
                    return countryCode === 'UK' ? 'UK' : (countryCode === 'GB' ? 'UK' : countryCode);
                } else if (countryCode) {
                    console.log(`⚠️ ${method.name} returned unsupported country: ${countryCode}`);
                }
            } else {
                console.log(`❌ ${method.name} returned status: ${response.status}`);
            }
        } catch (error) {
            if (error.name === 'AbortError') {
                console.log(`⏰ ${method.name} timed out after ${method.timeout}ms`);
            } else {
                console.log(`❌ ${method.name} failed:`, error.message);
            }
        }
    }
    
    // Fallback methods
    console.log('🔄 Trying fallback detection methods...');
    
    // Method 1: Timezone detection (more reliable for location than language)
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (timezone.includes('Dhaka') || timezone.includes('Asia/Dhaka')) {
        console.log('✅ Detected via timezone: BD');
        return 'BD';
    }
    if (
        timezone.includes('Kolkata') ||
        timezone.includes('Mumbai') ||
        timezone.includes('Delhi') ||
        timezone.includes('Calcutta') ||
        timezone.includes('Asia/Kolkata') ||
        timezone.includes('Asia/Calcutta')
    ) {
        console.log('✅ Detected via timezone: IN');
        return 'IN';
    }
    if (timezone.includes('Karachi') || timezone.includes('Asia/Karachi')) {
        console.log('✅ Detected via timezone: PK');
        return 'PK';
    }
    if (timezone.includes('London') || timezone.includes('Europe/London')) {
        console.log('✅ Detected via timezone: UK');
        return 'UK';
    }
    if (timezone.includes('Lagos') || timezone.includes('Africa/Lagos')) {
        console.log('✅ Detected via timezone: NG');
        console.log('🇳🇬 Nigeria detected via timezone fallback!');
        return 'NG';
    }
    if (tz.includes('Sydney') || tz.includes('Melbourne') || tz.includes('Perth') || tz.includes('Brisbane') || tz.includes('Adelaide') || tz.includes('Australia/Sydney') || tz.includes('Australia/Melbourne') || tz.includes('Australia/Perth') || tz.includes('Australia/Brisbane') || tz.includes('Australia/Adelaide')) {
        console.log('🇦🇺 Australia detected via timezone fallback!');
        return 'AU';
    }
    
    // Method 2: Browser language detection (secondary, only if timezone inconclusive)
    const language = navigator.language || navigator.userLanguage;
    if (language.includes('bn') || language.includes('BD')) {
        console.log('✅ Detected via browser language: BD');
        return 'BD';
    }
    // Prefer PK if UR present
    if (language.toLowerCase().includes('ur') || language.toUpperCase().includes('PK')) {
        console.log('✅ Detected via browser language: PK');
        return 'PK';
    }
    // en-GB → UK (only used if timezone didn't already resolve to IN/BD/PK)
    if (language.toLowerCase().includes('en-gb') || language.toUpperCase().includes('GB') || language.toUpperCase().includes('UK')) {
        console.log('✅ Detected via browser language: UK');
        return 'UK';
    }
    if (language.toLowerCase().includes('en-ng') || language.toUpperCase().includes('NG')) {
        console.log('✅ Detected via browser language: NG');
        console.log('🇳🇬 Nigeria detected via language fallback!');
        return 'NG';
    }
    if (lang.toLowerCase().includes('en-au') || lang.toLowerCase().includes('australia')) {
        console.log('🇦🇺 Australia detected via language fallback!');
        return 'AU';
    }
    
    // Method 3: Date/time locale detection
    const dateLocale = new Date().toLocaleDateString();
    if (dateLocale.includes('বাংলা') || dateLocale.includes('বাংলাদেশ')) {
        console.log('✅ Detected via date locale: BD');
        return 'BD';
    }
    
    // Method 4: Navigator languages array
    if (navigator.languages) {
        for (const lang of navigator.languages) {
            if (lang.includes('bn') || lang.includes('BD')) {
                console.log('✅ Detected via navigator languages: BD');
                return 'BD';
            }
            if (lang.toLowerCase().includes('ur') || lang.toUpperCase().includes('PK')) {
                console.log('✅ Detected via navigator languages: PK');
                return 'PK';
            }
            if (lang.toLowerCase().includes('en-gb') || lang.toUpperCase().includes('GB') || lang.toUpperCase().includes('UK')) {
                console.log('✅ Detected via navigator languages: UK');
                return 'UK';
            }
        }
    }
    
    console.log('⚠️ All detection methods failed, defaulting to India');
    console.log('All detection methods failed, defaulting to India');
    return 'IN'; // Default to India
}

// Initialize country data based on location with visual feedback
async function initializeCountryData() {
    console.log('🔍 Starting country detection...');
    // Hide detection status immediately
    updateDetectionStatus('hidden', '');
    
    try {
        const detectedCountry = await detectUserLocation();
        console.log('📍 Detected country:', detectedCountry);
        currentCountry = detectedCountry;
        countryData = countryConfig[currentCountry];
        console.log('📊 Country data loaded:', countryData.name);
        
        // Update UI to show current country
        updateCountryDisplay();
        updateCountryButtons();
        
        // Set default university based on country
        const defaultUniversity = countryData.universities[0];
        console.log('🏫 Setting default university:', defaultUniversity);
        const collegeInputEl = document.getElementById('collegeNameInput');
        if (collegeInputEl) {
            collegeInputEl.value = defaultUniversity;
            collegeInputEl.disabled = false;
            collegeInputEl.placeholder = 'Enter university name';
            collegeInputEl.dispatchEvent(new Event('input'));
            console.log('✅ University input populated');
            
            // Auto-set website, address, logo, and principal for the default university
            setWebsiteByCollege(defaultUniversity);
            setAddressByCollege(defaultUniversity);
            setLogoByCollege(defaultUniversity);
            setPrincipalByCollege(defaultUniversity);
            applyDefaultsByCollege(defaultUniversity);
            console.log('✅ University data populated');
            
            // Update card elements immediately
            const cardUniversityEl = document.getElementById('card-university');
            if (cardUniversityEl) cardUniversityEl.textContent = defaultUniversity;
        }
        
        // Set default phone number based on country
        const mobileInput = document.getElementById('mobileInput');
        if (mobileInput) {
            if (currentCountry === 'BD') {
                mobileInput.value = '+8801865669791';
            } else {
                const firstVisitDigits = generateMobileDigits(currentCountry);
                mobileInput.value = formatMobileFromDigits(firstVisitDigits, countryData.phoneCode);
            }
            mobileInput.disabled = false;
            mobileInput.placeholder = 'Enter mobile number';
            mobileInput.dispatchEvent(new Event('input'));
            const cardMobileEl = document.getElementById('card-mobile');
            if (cardMobileEl) {
                cardMobileEl.textContent = mobileInput.value;
                console.log('📱 Mobile set during country detection:', mobileInput.value);
            }
        }
        
        // Set default name for all countries
        const nameInput = document.getElementById('nameInput');
        if (nameInput) {
            nameInput.value = 'MIHIR CHOWDHURY';
            nameInput.disabled = false;
            nameInput.placeholder = 'Enter student name';
            nameInput.dispatchEvent(new Event('input'));
            
            // Update card name immediately
            const cardNameEl = document.getElementById('cardName');
            if (cardNameEl) cardNameEl.textContent = nameInput.value;
        }
        
        // Address will be set by setAddressByCollege() function above
        const addressInput = document.getElementById('addressInput');
        if (addressInput) {
            addressInput.disabled = false;
        }
        
        // Enable website field (value already set by setWebsiteByCollege above)
        const websiteInput = document.getElementById('websiteInput');
        if (websiteInput) {
            websiteInput.disabled = false;
            websiteInput.placeholder = 'Enter website';
        }
        
        // Enable student email field
        const studentEmailInput = document.getElementById('studentEmailInput');
        if (studentEmailInput) {
            studentEmailInput.disabled = false;
            studentEmailInput.placeholder = 'Email will be generated';
        }
        
        // Update email based on default ID
        updateStudentEmail();
        
        // Hide detection status immediately
        updateDetectionStatus('hidden', '');
        
    } catch (error) {
        console.error('Location detection failed:', error);
        updateDetectionStatus('error', '❌ Location detection failed, using default');
        
        // Fallback to India
        currentCountry = 'IN';
        countryData = countryConfig[currentCountry];
        updateCountryDisplay();
        updateCountryButtons();
    }
}


// Update detection status in UI
function updateDetectionStatus(status, message) {
    const statusElement = document.getElementById('detectionStatus');
    if (!statusElement) return;
    
    switch (status) {
        case 'detecting':
            statusElement.innerHTML = `
                <div class="flex items-center text-blue-600">
                    <i class="fa-solid fa-spinner fa-spin mr-2"></i>
                    <span class="text-sm">${message}</span>
                </div>
            `;
            statusElement.className = 'block';
            break;
            
        case 'success':
            statusElement.innerHTML = `
                <div class="flex items-center text-green-600">
                    <i class="fa-solid fa-check-circle mr-2"></i>
                    <span class="text-sm">${message}</span>
                </div>
            `;
            statusElement.className = 'block';
            break;
            
        case 'error':
            statusElement.innerHTML = `
                <div class="flex items-center text-red-600">
                    <i class="fa-solid fa-exclamation-triangle mr-2"></i>
                    <span class="text-sm">${message}</span>
                </div>
            `;
            statusElement.className = 'block';
            break;
            
        case 'hidden':
            statusElement.className = 'hidden';
            break;
    }
}

// Update country display in UI
function updateCountryDisplay() {
    const countryIndicator = document.getElementById('countryIndicator');
    if (countryIndicator) {
        // Use flag API for better quality flags
        const flagCode = currentCountry === 'UK' ? 'gb' : currentCountry.toLowerCase();
        const flagUrl = `https://flagcdn.com/24x18/${flagCode}.png`;
        countryIndicator.innerHTML = `
            <img src="${flagUrl}" 
                 alt="${countryData.name} flag" 
                 class="w-6 h-4 rounded-sm shadow-sm border border-gray-200"
                 onerror="this.style.display='none'; this.nextElementSibling.style.display='inline';">
            <span style="display: none;" class="text-lg">${countryData.flag}</span>
        `;
    }
}

// Switch country manually
function switchCountry(countryCode) {
    currentCountry = countryCode;
    countryData = countryConfig[currentCountry];
    
    updateCountryDisplay();
    updateCountryButtons();
    
    // Update all form fields with new country data
    const defaultUniversity = countryData.universities[0];
    const collegeInputEl = document.getElementById('collegeNameInput');
    if (collegeInputEl) {
        collegeInputEl.value = defaultUniversity;
        collegeInputEl.disabled = false;
        collegeInputEl.placeholder = 'Enter university name';
        collegeInputEl.dispatchEvent(new Event('input'));
        
        // Auto-set website, address, logo, and principal for the default university
        setWebsiteByCollege(defaultUniversity);
        setAddressByCollege(defaultUniversity);
        setLogoByCollege(defaultUniversity);
        setPrincipalByCollege(defaultUniversity);
        applyDefaultsByCollege(defaultUniversity);
    }
    
    // Generate random mobile number for country switch
    const mobileInput = document.getElementById('mobileInput');
    if (mobileInput) {
        const randomDigits = generateMobileDigits(currentCountry);
        mobileInput.value = formatMobileFromDigits(randomDigits, countryData.phoneCode);
        mobileInput.disabled = false;
        mobileInput.placeholder = 'Enter mobile number';
        mobileInput.dispatchEvent(new Event('input'));
    }
    
    // Set default name for all countries
    const nameInput = document.getElementById('nameInput');
    if (nameInput) {
        nameInput.value = 'MIHIR CHOWDHURY';
        nameInput.disabled = false;
        nameInput.placeholder = 'Enter student name';
        nameInput.dispatchEvent(new Event('input'));
    }
    
    // Enable website field
    const websiteInput = document.getElementById('websiteInput');
    if (websiteInput) {
        websiteInput.disabled = false;
        websiteInput.placeholder = 'Enter website';
    }
    
    // Enable student email field
    const studentEmailInput = document.getElementById('studentEmailInput');
    if (studentEmailInput) {
        studentEmailInput.disabled = false;
        studentEmailInput.placeholder = 'Email will be generated';
    }
    
    // Hide detection status immediately
    updateDetectionStatus('hidden', '');
}

// Refresh location detection
async function refreshLocationDetection() {
    try {
        const detectedCountry = await detectUserLocation();
        currentCountry = detectedCountry;
        countryData = countryConfig[currentCountry];
        
        updateCountryDisplay();
        updateCountryButtons();
        
        // Set default university based on country
        const defaultUniversity = countryData.universities[0];
        const collegeInputEl = document.getElementById('collegeNameInput');
        if (collegeInputEl) {
            collegeInputEl.value = defaultUniversity;
            collegeInputEl.disabled = false;
            collegeInputEl.placeholder = 'Enter university name';
            collegeInputEl.dispatchEvent(new Event('input'));
        }
        
        // Set default mobile number on first visit
        const mobileInput = document.getElementById('mobileInput');
        if (mobileInput) {
            if (currentCountry === 'BD') {
                mobileInput.value = '+8801865669791';
            } else {
                const firstVisitDigits = generateMobileDigits(currentCountry);
                mobileInput.value = formatMobileFromDigits(firstVisitDigits, countryData.phoneCode);
            }
            mobileInput.disabled = false;
            mobileInput.placeholder = 'Enter mobile number';
            mobileInput.dispatchEvent(new Event('input'));
            const cardMobileEl = document.getElementById('card-mobile');
            if (cardMobileEl) {
                cardMobileEl.textContent = mobileInput.value;
                console.log('📱 Mobile set during country detection:', mobileInput.value);
            }
        }
        
        // Set default name for all countries
        const nameInput = document.getElementById('nameInput');
        if (nameInput) {
            nameInput.value = 'MIHIR CHOWDHURY';
            nameInput.disabled = false;
            nameInput.placeholder = 'Enter student name';
            nameInput.dispatchEvent(new Event('input'));
        }
        
        // Set website, address, logo, principal for default university
        setWebsiteByCollege(defaultUniversity);
        setAddressByCollege(defaultUniversity);
        setLogoByCollege(defaultUniversity);
        setPrincipalByCollege(defaultUniversity);
        applyDefaultsByCollege(defaultUniversity);
        
        // Update email based on default ID
        updateStudentEmail();
        
        // Address will be set by setAddressByCollege() function above
        const addressInput = document.getElementById('addressInput');
        if (addressInput) {
            addressInput.disabled = false;
        }
        
        // Enable website field (value already set by setWebsiteByCollege above)
        const websiteInput = document.getElementById('websiteInput');
        if (websiteInput) {
            websiteInput.disabled = false;
        }
        
        // Enable student email field (value already set by updateStudentEmail above)
        const studentEmailInput = document.getElementById('studentEmailInput');
        if (studentEmailInput) {
            studentEmailInput.disabled = false;
        }
        
    } catch (error) {
        console.error('Location refresh failed:', error);
    }
}

// Update country button states
function updateCountryButtons() {
    const bdButton = document.getElementById('switchToBD');
    const inButton = document.getElementById('switchToIN');
    const pkButton = document.getElementById('switchToPK');
    const ukButton = document.getElementById('switchToUK');
    const ngButton = document.getElementById('switchToNG');
    const auButton = document.getElementById('switchToAU');
    
    if (bdButton && inButton) {
        // Set flag images for buttons
        const bdFlagUrl = 'https://flagcdn.com/20x15/bd.png';
        const inFlagUrl = 'https://flagcdn.com/20x15/in.png';
        const pkFlagUrl = 'https://flagcdn.com/20x15/pk.png';
        const ukFlagUrl = 'https://flagcdn.com/20x15/gb.png';
        const ngFlagUrl = 'https://flagcdn.com/20x15/ng.png';
        const auFlagUrl = 'https://flagcdn.com/20x15/au.png';
        
        bdButton.innerHTML = `<img src="${bdFlagUrl}" alt="Bangladesh flag" class="w-5 h-3 rounded-sm" onerror="this.style.display='none'; this.nextElementSibling.style.display='inline';"><span style="display: none;">🇧🇩</span>`;
        inButton.innerHTML = `<img src="${inFlagUrl}" alt="India flag" class="w-5 h-3 rounded-sm" onerror="this.style.display='none'; this.nextElementSibling.style.display='inline';"><span style="display: none;">🇮🇳</span>`;
        if (pkButton) pkButton.innerHTML = `<img src="${pkFlagUrl}" alt="Pakistan flag" class="w-5 h-3 rounded-sm" onerror="this.style.display='none'; this.nextElementSibling.style.display='inline';"><span style="display: none;">🇵🇰</span>`;
        if (ukButton) ukButton.innerHTML = `<img src="${ukFlagUrl}" alt="UK flag" class="w-5 h-3 rounded-sm" onerror="this.style.display='none'; this.nextElementSibling.style.display='inline';"><span style="display: none;">🇬🇧</span>`;
        if (ngButton) ngButton.innerHTML = `<img src="${ngFlagUrl}" alt="Nigeria flag" class="w-5 h-3 rounded-sm" onerror="this.style.display='none'; this.nextElementSibling.style.display='inline';"><span style="display: none;">🇳🇬</span>`;
        if (auButton) auButton.innerHTML = `<img src="${auFlagUrl}" alt="Australia flag" class="w-5 h-3 rounded-sm" onerror="this.style.display='none'; this.nextElementSibling.style.display='inline';"><span style="display: none;">🇦🇺</span>`;
        
        // Reset all buttons
        bdButton.className = 'px-3 py-1 text-sm rounded-md border border-gray-300 hover:bg-gray-50 transition-colors duration-200';
        inButton.className = 'px-3 py-1 text-sm rounded-md border border-gray-300 hover:bg-gray-50 transition-colors duration-200';
        if (pkButton) pkButton.className = 'px-3 py-1 text-sm rounded-md border border-gray-300 hover:bg-gray-50 transition-colors duration-200';
        if (ukButton) ukButton.className = 'px-3 py-1 text-sm rounded-md border border-gray-300 hover:bg-gray-50 transition-colors duration-200';
        if (ngButton) ngButton.className = 'px-3 py-1 text-sm rounded-md border border-gray-300 hover:bg-gray-50 transition-colors duration-200';
        if (auButton) auButton.className = 'px-3 py-1 text-sm rounded-md border border-gray-300 hover:bg-gray-50 transition-colors duration-200';
        
        // Highlight active button
        if (currentCountry === 'BD') {
            bdButton.className = 'px-3 py-1 text-sm rounded-md border-2 border-green-500 bg-green-50 text-green-700 font-medium transition-colors duration-200';
        } else if (currentCountry === 'IN') {
            inButton.className = 'px-3 py-1 text-sm rounded-md border-2 border-blue-500 bg-blue-50 text-blue-700 font-medium transition-colors duration-200';
        } else if (currentCountry === 'PK' && pkButton) {
            pkButton.className = 'px-3 py-1 text-sm rounded-md border-2 border-emerald-500 bg-emerald-50 text-emerald-700 font-medium transition-colors duration-200';
        } else if (currentCountry === 'UK' && ukButton) {
            ukButton.className = 'px-3 py-1 text-sm rounded-md border-2 border-indigo-500 bg-indigo-50 text-indigo-700 font-medium transition-colors duration-200';
        } else if (currentCountry === 'NG' && ngButton) {
            ngButton.className = 'px-3 py-1 text-sm rounded-md border-2 border-orange-500 bg-orange-50 text-orange-700 font-medium transition-colors duration-200';
        } else if (currentCountry === 'AU' && auButton) {
            auButton.className = 'px-3 py-1 text-sm rounded-md border-2 border-yellow-500 bg-yellow-50 text-yellow-700 font-medium transition-colors duration-200';
        }
    }
}

// Generate mobile digits based on country
function generateMobileDigits(countryCode) {
    if (countryCode === 'BD') {
        // Bangladesh mobile: 1XXXXXXXXX (10 digits starting with 1)
        const firstDigit = '1';
        let rest = '';
        for (let i = 0; i < 9; i++) {
            rest += Math.floor(Math.random() * 10);
        }
        return firstDigit + rest; // Returns 10 digits (1 + 9 more)
    } else if (countryCode === 'PK') {
        // Pakistan mobile: 3XXXXXXXXX (10 digits starting with 3)
        const firstDigit = '3';
        let rest = '';
        for (let i = 0; i < 9; i++) {
            rest += Math.floor(Math.random() * 10);
        }
        return firstDigit + rest; // Returns 10 digits
    } else if (countryCode === 'UK') {
        // UK mobile (E.164 local part): 7XXXXXXXXX (10 digits starting with 7)
        const firstDigit = '7';
        let rest = '';
        for (let i = 0; i < 9; i++) {
            rest += Math.floor(Math.random() * 10);
        }
        return firstDigit + rest; // Returns 10 digits
    } else if (countryCode === 'NG') {
        // Nigeria mobile: 8XXXXXXXXX (10 digits starting with 8)
        const firstDigit = '8';
        let rest = '';
        for (let i = 0; i < 9; i++) {
            rest += Math.floor(Math.random() * 10);
        }
        return firstDigit + rest; // Returns 10 digits
    } else if (countryCode === 'AU') {
        // Australia mobile: 4XXXXXXXXX (10 digits starting with 4)
        const firstDigit = '4';
        let rest = '';
        for (let i = 0; i < 9; i++) {
            rest += Math.floor(Math.random() * 10);
        }
        return firstDigit + rest; // Returns 10 digits
    } else {
        // India mobile: 6-9XXXXXXXXX (10 digits starting with 6-9)
        const firstDigit = String(Math.floor(Math.random() * 4) + 6);
        let rest = '';
        for (let i = 0; i < 9; i++) {
            rest += Math.floor(Math.random() * 10);
        }
        return firstDigit + rest; // Returns 10 digits
    }
}

// Extract local digits based on country
function extractLocalDigitsByCountry(value, countryCode) {
    const digits = (value || '').replace(/\D/g, '');
    
    if (countryCode === 'BD') {
        // For Bangladesh: remove +880 if present
        if (digits.startsWith('880')) {
            return digits.slice(3);
        }
        return digits.slice(0, 11); // Keep up to 11 digits
    } else if (countryCode === 'PK') {
        // For Pakistan: remove +92 if present
        if (digits.startsWith('92')) {
            return digits.slice(2).slice(0, 10);
        }
        return digits.slice(0, 10);
    } else if (countryCode === 'UK') {
        // For UK: remove +44 if present
        if (digits.startsWith('44')) {
            return digits.slice(2).slice(0, 10);
        }
        return digits.slice(0, 10);
    } else if (countryCode === 'NG') {
        // For Nigeria: remove +234 if present
        if (digits.startsWith('234')) {
            return digits.slice(3).slice(0, 10);
        }
        return digits.slice(0, 10);
    } else if (countryCode === 'AU') {
        // For Australia: remove +61 if present
        if (digits.startsWith('61')) {
            return digits.slice(2).slice(0, 10);
        }
        return digits.slice(0, 10);
    } else {
        // For India: remove +91 if present
        if (digits.startsWith('91')) {
            return digits.slice(2);
        }
        return digits.slice(0, 10); // Keep up to 10 digits
    }
}

function generateIndianMobileDigits() {
            const firstDigit = String(Math.floor(Math.random() * 4) + 6); // 6-9
            let rest = '';
            for (let i = 0; i < 9; i++) { // total 10 digits
                rest += Math.floor(Math.random() * 10);
            }
            return firstDigit + rest; // 10-digit local number
}

// Updated mobile formatting functions
function formatMobileFromDigits(localDigits, phoneCode) {
    const digits = (localDigits || '').replace(/\D/g, '');
    return phoneCode + digits;
}

function formatIndianMobileFromDigits(localDigits) {
            const digits = (localDigits || '').replace(/\D/g, '').slice(0, 10);
            return '+91' + digits; // no spaces, no hyphens
}

function extractLocalDigits(value) {
            const digits = (value || '').replace(/\D/g, '');
            // strip possible country code 91 if user pasted +91 or 91
            const stripped = digits.startsWith('91') ? digits.slice(2) : digits;
            return stripped.slice(0, 10);
}

// Updated data arrays to use country-based data
const randomMobiles = Array.from({ length: 20 }, () => generateIndianMobileDigits());

// Get random name based on current country
function getRandomName() {
    if (countryData && countryData.names) {
        const randomIndex = Math.floor(Math.random() * countryData.names.length);
        return countryData.names[randomIndex];
    }
    return getRandomIndianName(); // Fallback
}

// Get random address based on current country
function getRandomAddress() {
    if (countryData && countryData.addresses) {
        const addressKeys = Object.keys(countryData.addresses);
        const randomIndex = Math.floor(Math.random() * addressKeys.length);
        const randomKey = addressKeys[randomIndex];
        return countryData.addresses[randomKey];
    }
    return 'At- Sadanandpur Dist- Supaul, Bihar'; // Fallback
}

function getRandomIndianName() {
            const randomIndex = Math.floor(Math.random() * indianMaleNames.length);
            return indianMaleNames[randomIndex];
}

// Name normalization: convert to Title Case and collapse extra spaces
function formatStudentName(name) {
            return (name || '')
                .trim()
                .replace(/\s+/g, ' ')  // Replace multiple spaces with single space
                .toUpperCase();
}

function applyDefaultsByCollege(collegeName) {
            const defs = universityDefaults[collegeName];
            if (!defs) {
                // Try case-insensitive search
                const keys = Object.keys(universityDefaults);
                const lower = collegeName.toLowerCase();
                let key = keys.find(k => k.toLowerCase() === lower);
                if (!key) key = keys.find(k => k.toLowerCase().includes(lower));
                if (key) {
                    const matchedDefs = universityDefaults[key];
                    // Apply the matched defaults
            const idEl = document.getElementById('idInput');
            const classEl = document.getElementById('classInput');
                    
                    if (matchedDefs.id) {
                        idEl.value = matchedDefs.id;
                        idEl.dispatchEvent(new Event('input'));
                    }
                    
                    if (matchedDefs.className && matchedDefs.className !== 'GEN') {
                        classEl.value = matchedDefs.className;
                        classEl.dispatchEvent(new Event('input'));
                    } else if (matchedDefs.className === 'GEN') {
                        // Pick a random class from country list
                        const countryClassList = (countryData && countryData.classes && countryData.classes.length) ? countryData.classes : ['CSE','EEE','ECE','ME','CE','IT','ICT','SE','AI','DS','BBA','MBA','ACC','FIN','MKT','ECO','ENG','LAW','MED','NUR','PHARM','ARCH','STAT','MATH','PHY','CHE','BIO'];
                        const randomClass = countryClassList[Math.floor(Math.random() * countryClassList.length)];
                        classEl.value = randomClass;
                        classEl.dispatchEvent(new Event('input'));
                    } else {
                        // Pick a random class from country list
                        const countryClassList = (countryData && countryData.classes && countryData.classes.length) ? countryData.classes : ['CSE','EEE','ECE','ME','CE','IT','ICT','SE','AI','DS','BBA','MBA','ACC','FIN','MKT','ECO','ENG','LAW','MED','NUR','PHARM','ARCH','STAT','MATH','PHY','CHE','BIO'];
                        const randomClass = countryClassList[Math.floor(Math.random() * countryClassList.length)];
                        classEl.value = randomClass;
                        classEl.dispatchEvent(new Event('input'));
                    }
                }
                return;
            }
            
            const idEl = document.getElementById('idInput');
            const classEl = document.getElementById('classInput');
            
            if (defs.id) {
                idEl.value = defs.id;
                idEl.dispatchEvent(new Event('input'));
            }
            
            if (defs.className && defs.className !== 'GEN') {
                classEl.value = defs.className;
                classEl.dispatchEvent(new Event('input'));
            } else if (defs.className === 'GEN') {
                // Pick a random class from country list
                const countryClassList = (countryData && countryData.classes && countryData.classes.length) ? countryData.classes : ['CSE','EEE','ECE','ME','CE','IT','ICT','SE','AI','DS','BBA','MBA','ACC','FIN','MKT','ECO','ENG','LAW','MED','NUR','PHARM','ARCH','STAT','MATH','PHY','CHE','BIO'];
                const randomClass = countryClassList[Math.floor(Math.random() * countryClassList.length)];
                classEl.value = randomClass;
                classEl.dispatchEvent(new Event('input'));
            } else {
                // Pick a random class from country list
                const countryClassList = (countryData && countryData.classes && countryData.classes.length) ? countryData.classes : ['CSE','EEE','ECE','ME','CE','IT','ICT','SE','AI','DS','BBA','MBA','ACC','FIN','MKT','ECO','ENG','LAW','MED','NUR','PHARM','ARCH','STAT','MATH','PHY','CHE','BIO'];
                const randomClass = countryClassList[Math.floor(Math.random() * countryClassList.length)];
                classEl.value = randomClass;
                classEl.dispatchEvent(new Event('input'));
            }
            // Email will be recomputed via updateStudentEmail
}

// Utility function to update text content
function updateCardText(inputId, cardElementId, isDate = false) {
            const inputElement = document.getElementById(inputId);
            const cardElement = document.getElementById(cardElementId);
            
            if (!inputElement || !cardElement) return;

            const update = () => {
                if (isDate) {
                    const date = new Date(inputElement.value);
                    cardElement.textContent = date.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' });
                } else {
                    cardElement.textContent = inputElement.value;
                }
            };
            update();
            
            // Debounced update for better performance
            const debouncedUpdate = debounce(update, 100);
            inputElement.addEventListener('input', debouncedUpdate);
}

// Utility function to handle image uploads and randomization
function handleImage(type) {
            if (type === 'photo') {
                const elementId = 'card-photo';
                const randomList = randomPhotos;
                const imgElement = document.getElementById(elementId);
                const randomIndex = Math.floor(Math.random() * randomList.length);
                imgElement.src = randomList[randomIndex];
            } else if (type === 'logo') {
                const elementId = 'card-logo';
                const randomList = randomLogos;
                const imgElement = document.getElementById(elementId);
                const randomIndex = Math.floor(Math.random() * randomList.length);
                imgElement.src = randomList[randomIndex];
            }
            // Signature image functionality removed
}

function handleFile(event, targetElementId) {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    document.getElementById(targetElementId).src = e.target.result;
                };
                reader.readAsDataURL(file);
            }
}

// Function to create and update email
function getEmailDomainForCurrentCollege() {
            const collegeEl = document.getElementById('collegeNameInput');
            const byDefaults = universityDefaults[collegeEl.value] && universityDefaults[collegeEl.value].emailDomain;
            if (byDefaults) return byDefaults;
            // Fallback to website hostname
            const websiteInputEl = document.getElementById('websiteInput');
            const raw = (websiteInputEl.value || '').trim();
            let url = raw;
            if (!/^https?:\/\//i.test(url)) url = 'https://' + url.replace(/^\/*/, '');
            try {
                const u = new URL(url);
                return u.hostname.replace(/^www\./i, '');
            } catch (_) {
                return raw.replace(/^https?:\/\//i, '').replace(/^www\./i, '') || 'example.edu';
            }
}

function updateStudentEmail() {
            const idInput = document.getElementById('idInput');
            const studentEmailInput = document.getElementById('studentEmailInput');
            const cardEmail = document.getElementById('card-email');
            const studentId = idInput.value.toLowerCase().replace(/[^a-z0-9]/g, '');
            const domain = getEmailDomainForCurrentCollege();
            const email = studentId + '@' + domain;
            studentEmailInput.value = email;
            
            // Update card display
            if (cardEmail) {
                cardEmail.textContent = email;
            }
}

// Function to update validity display
function updateValidityDisplay() {
    const issueDateInput = document.getElementById('issueDateInput');
    const validDateInput = document.getElementById('validDateInput');
    const cardValidity = document.getElementById('card-validity');
    
    console.log('📅 Updating validity display...');
    console.log('Issue date input:', issueDateInput);
    console.log('Issue date value:', issueDateInput?.value);
    console.log('Valid date input:', validDateInput);
    console.log('Valid date value:', validDateInput?.value);
    console.log('Card validity element:', cardValidity);
    
    if (issueDateInput && validDateInput && cardValidity) {
        const issueDate = new Date(issueDateInput.value);
        const validDate = new Date(validDateInput.value);
        
        // Check if dates are valid
        if (isNaN(issueDate.getTime()) || isNaN(validDate.getTime())) {
            console.log('❌ Invalid dates detected, setting default validity');
            // Set a default validity if dates are invalid
            const today = new Date();
            const nextYear = new Date(today.getFullYear() + 1, today.getMonth(), today.getDate());
            const defaultValidity = `${String(today.getMonth() + 1).padStart(2, '0')}/${String(today.getFullYear()).slice(2)} - ${String(nextYear.getMonth() + 1).padStart(2, '0')}/${String(nextYear.getFullYear()).slice(2)}`;
            cardValidity.textContent = defaultValidity;
            console.log('✅ Default validity set:', defaultValidity);
            return;
        }
        
        const formattedValidity = `${String(issueDate.getMonth() + 1).padStart(2, '0')}/${String(issueDate.getFullYear()).slice(2)} - ${String(validDate.getMonth() + 1).padStart(2, '0')}/${String(validDate.getFullYear()).slice(2)}`;
        cardValidity.textContent = formattedValidity;
        console.log('✅ Validity updated:', formattedValidity);
    } else {
        console.log('❌ Validity update failed - missing elements');
        console.log('Issue date input exists:', !!issueDateInput);
        console.log('Valid date input exists:', !!validDateInput);
        console.log('Card validity element exists:', !!cardValidity);
        
        // Set a fallback validity even if elements are missing
        if (cardValidity) {
            const today = new Date();
            const nextYear = new Date(today.getFullYear() + 1, today.getMonth(), today.getDate());
            const fallbackValidity = `${String(today.getMonth() + 1).padStart(2, '0')}/${String(today.getFullYear()).slice(2)} - ${String(nextYear.getMonth() + 1).padStart(2, '0')}/${String(nextYear.getFullYear()).slice(2)}`;
            cardValidity.textContent = fallbackValidity;
            console.log('✅ Fallback validity set:', fallbackValidity);
        }
    }
}

// Updated functions to use country-based data
 function setWebsiteByCollege(collegeName) {
             const site = countryData?.websites?.[collegeName] || universityWebsites[collegeName];
             if (!site) return;

             const websiteInputEl = document.getElementById('websiteInput');
             if (websiteInputEl) {
             websiteInputEl.value = site;
                 websiteInputEl.disabled = false;
                 websiteInputEl.placeholder = 'Enter website';
             websiteInputEl.dispatchEvent(new Event('input'));
             }
 }
 function setAddressByCollege(collegeName) {
             const addressInputEl = document.getElementById('addressInput');
             if (!addressInputEl) return;

             // Bangladesh university addresses (hardcoded for reliability)
             const bangladeshAddresses = {
                 'University of Dhaka': 'Nilkhet Rd, Dhaka 1000, Bangladesh',
                 'Bangladesh University of Engineering and Technology (BUET)': 'Polashi, Dhaka 1000, Bangladesh',
                 'Jahangirnagar University': 'Savar, Dhaka, Bangladesh',
                 'Rajshahi University': 'Motihar, Rajshahi, Bangladesh',
                 'Chittagong University': 'Hathazari, Chattogram, Bangladesh',
                 'Khulna University': 'Khulna, Bangladesh',
                 'Bangladesh Agricultural University (BAU)': 'Mymensingh, Bangladesh',
                 'Chittagong University of Engineering and Technology (CUET)': 'Raozan, Chittagong 4349, Bangladesh',
                 'Rajshahi University of Engineering and Technology (RUET)': 'Kazla, Rajshahi 6204, Bangladesh',
                 'Khulna University of Engineering and Technology (KUET)': 'Fulbarigate, Khulna 9203, Bangladesh',
                 'Islamic University of Technology (IUT)': 'Board Bazar, Gazipur 1704, Bangladesh',
                 'Shahjalal University of Science and Technology (SUST)': 'Kumargaon, Sylhet 3114, Bangladesh',
                 'Bangladesh University of Professionals (BUP)': 'Mirpur Cantonment, Dhaka 1216, Bangladesh',
                 'Military Institute of Science and Technology (MIST)': 'Mirpur Cantonment, Dhaka 1216, Bangladesh',
                 'North South University (NSU)': 'Bashundhara, Dhaka, Bangladesh',
                 'Independent University Bangladesh (IUB)': 'Bashundhara, Dhaka, Bangladesh',
                 'BRAC University': 'Mohakhali, Dhaka, Bangladesh',
                 'American International University Bangladesh (AIUB)': 'Kuratoli, Kuril, Dhaka, Bangladesh',
                 'East West University (EWU)': 'Aftabnagar, Dhaka, Bangladesh',
                 'United International University (UIU)': 'United City, Madani Ave, Dhaka, Bangladesh',
                 'Bangladesh University of Business and Technology (BUBT)': 'Rupnagar, Mirpur 2, Dhaka, Bangladesh',
                 'Daffodil International University (DIU)': 'Dhanmondi, Dhaka 1207, Bangladesh',
                 'Dhaka International University': 'Satarkul, Badda, Dhaka-1212, Bangladesh'
             };

             // Get address from appropriate source
             let addr;
             if (currentCountry === 'BD') {
                 addr = bangladeshAddresses[collegeName] || countryData?.addresses?.[collegeName];
             } else {
                 addr = countryData?.addresses?.[collegeName] || universityAddresses[collegeName];
             }

             if (addr) {
             addressInputEl.value = addr;
                 addressInputEl.disabled = false;
                 addressInputEl.placeholder = '';
                 addressInputEl.dispatchEvent(new Event('input'));
             } else {
            // Fallback address based on country
            const fallbackCountry = currentCountry === 'BD' ? 'Bangladesh' : currentCountry === 'PK' ? 'Pakistan' : 'India';
                 addressInputEl.value = `${collegeName}, ${fallbackCountry}`;
                 addressInputEl.disabled = false;
                 addressInputEl.placeholder = '';
             addressInputEl.dispatchEvent(new Event('input'));
             }
 }
 function setLogoByCollege(collegeName) {
             const logo = countryData?.logos?.[collegeName] || universityLogos[collegeName];
             if (!logo) return;
             const logoEl = document.getElementById('card-logo');
             if (logoEl) logoEl.src = logo;

             // Also set the center watermark logo
             const centerWatermarkEl = document.getElementById('center-watermark');
             if (centerWatermarkEl) centerWatermarkEl.src = logo;
 }
 function setPrincipalByCollege(collegeName) {
             const principalName = countryData?.principals?.[collegeName] || universityPrincipals[collegeName];
             if (!principalName) return;

             const principalNameEl = document.getElementById('card-principal-name');
             if (principalNameEl) {
             principalNameEl.textContent = principalName;
             }

             // Keep caption consistent
             const principalCaptionEl = document.getElementById('cardPrincipalCaption');
             if (principalCaptionEl && !principalCaptionEl.textContent) {
                 principalCaptionEl.textContent = 'Authorized by Registrar';
             }
 }

document.addEventListener('DOMContentLoaded', async () => {
            console.log('🚀 Initializing EDUID system...');
            
            // Initialize DOM cache for better performance
            initDOMCache();
            console.log('✅ DOM cache initialized');
            
            // Decrypt and display title first
            decryptTitle();
            console.log('✅ Title decrypted');
            
            // Initialize country data based on location
            console.log('🌍 Starting country detection...');
            await initializeCountryData();
            console.log('✅ Country detection completed');
            
            // Update validity display after country detection
            setTimeout(() => {
                updateValidityDisplay();
            }, 200);
            
            // Auto-update footer year
            const currentYearEl = document.getElementById('currentYear');
            if (currentYearEl) {
                currentYearEl.textContent = new Date().getFullYear();
            }
            // Update all text fields
            updateCardText('collegeNameInput', 'card-university');
            updateCardText('idInput', 'card-id');
            updateCardText('nameInput', 'card-name');
            updateCardText('classInput', 'card-class');
            updateCardText('dobInput', 'card-dob', true);
            updateCardText('addressInput', 'card-address');
            
            // Update new card elements
            const websiteInput = document.getElementById('websiteInput');
            const cardWebsite = document.getElementById('card-website');
            if (websiteInput && cardWebsite) {
                cardWebsite.textContent = websiteInput.value;
                cardWebsite.href = websiteInput.value.startsWith('http') ? websiteInput.value : `https://${websiteInput.value}`;
                
                // Add real-time update listener
                websiteInput.addEventListener('input', function() {
                    cardWebsite.textContent = this.value;
                    cardWebsite.href = this.value.startsWith('http') ? this.value : `https://${this.value}`;
                });
            }
            
            // Update validity dates
            const issueDateInputEl = document.getElementById('issueDateInput');
            const validDateInputEl = document.getElementById('validDateInput');
            const cardValidity = document.getElementById('card-validity');
            if (issueDateInputEl && validDateInputEl && cardValidity) {
                const issueDate = new Date(issueDateInputEl.value);
                const validDate = new Date(validDateInputEl.value);
                const formattedValidity = `${String(issueDate.getMonth() + 1).padStart(2, '0')}/${String(issueDate.getFullYear()).slice(2)} - ${String(validDate.getMonth() + 1).padStart(2, '0')}/${String(validDate.getFullYear()).slice(2)}`;
                cardValidity.textContent = formattedValidity;
            }
            
            // Update email
            const studentEmailInput = document.getElementById('studentEmailInput');
            const cardEmail = document.getElementById('card-email');
            if (studentEmailInput && cardEmail) {
                cardEmail.textContent = studentEmailInput.value;
            }
            
            // Initial validity display update
            console.log('🔄 Initial validity display update...');
            updateValidityDisplay();
            
            // Initial mobile display update
            const mobileInputEl = document.getElementById('mobileInput');
            const cardMobileEl = document.getElementById('card-mobile');
            if (mobileInputEl && cardMobileEl) {
                cardMobileEl.textContent = mobileInputEl.value;
                console.log('📱 Initial mobile set:', mobileInputEl.value);
            }
            
            // Set default values immediately to avoid "Detecting..." text
            const idInput = document.getElementById('idInput');
            const cardIdEl = document.getElementById('cardId');
            if (idInput && cardIdEl) {
                cardIdEl.textContent = idInput.value;
            }
            
            const classInput = document.getElementById('classInput');
            const cardClassEl = document.getElementById('cardClass');
            if (classInput && cardClassEl) {
                cardClassEl.textContent = classInput.value;
            }
            
            const dobInput = document.getElementById('dobInput');
            const cardDobEl = document.getElementById('cardDob');
            if (dobInput && cardDobEl) {
                const date = new Date(dobInput.value);
                cardDobEl.textContent = date.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' });
            }
            
            // Don't set default values initially - wait for location detection
            const collegeInputEl = document.getElementById('collegeNameInput');
            // collegeInputEl.value will be set after location detection
            
            // Set up event listener for college input changes
            collegeInputEl.addEventListener('input', () => {
                setWebsiteByCollege(collegeInputEl.value);
                setAddressByCollege(collegeInputEl.value);
                setLogoByCollege(collegeInputEl.value);
                setPrincipalByCollege(collegeInputEl.value);
                applyDefaultsByCollege(collegeInputEl.value);
                updateStudentEmail();
            });

            document.getElementById('randomPrincipalNameBtn').addEventListener('click', () => {
                const n = getRandomName();
                const principalNameInput = document.getElementById('principalNameInput');
                principalNameInput.value = n;
                principalNameInput.dispatchEvent(new Event('input'));
            });
            updateCardText('idInput', 'card-id');
            // Mobile: enforce local digits and show with country code
            const mobileInput = document.getElementById('mobileInput');
            const cardMobile = document.getElementById('card-mobile');
            const syncMobile = () => {
                const local = extractLocalDigitsByCountry(mobileInput.value, currentCountry);
                const formatted = formatMobileFromDigits(local, countryData.phoneCode);
                mobileInput.value = formatted;
                if (cardMobile) {
                cardMobile.textContent = formatted;
                    console.log('📱 Mobile updated:', formatted);
                }
            };
            // Don't generate number initially - wait for location detection
            // mobileInput.value will be set after location detection
            // Debounced mobile sync for better performance
            const debouncedMobileSync = debounce(syncMobile, 150);
            mobileInput.addEventListener('input', debouncedMobileSync);
            updateCardText('classInput', 'card-class');
            updateCardText('dobInput', 'card-dob', true);
            updateCardText('addressInput', 'card-address');
            // Don't set default address initially - wait for location detection
            // addressInputEl.value will be set after location detection
            // Initialize issue date to current date (within 90 days requirement)
            const issueDateInputEl2 = document.getElementById('issueDateInput');
            const today = new Date();
            issueDateInputEl2.value = today.toISOString().split('T')[0]; // Format: YYYY-MM-DD
            
            updateCardText('issueDateInput', 'cardIssueDate', true);
            
            // Add date validation to ensure it's within 90 days or current academic year
            issueDateInput.addEventListener('change', function() {
                const selectedDate = new Date(this.value);
                const today = new Date();
                const ninetyDaysAgo = new Date(today.getTime() - (90 * 24 * 60 * 60 * 1000));
                const currentYear = today.getFullYear();
                const academicYearStart = new Date(currentYear, 7, 1); // August 1st
                const academicYearEnd = new Date(currentYear + 1, 6, 31); // July 31st next year
                
                // Check if date is within 90 days OR within current academic year
                const within90Days = selectedDate >= ninetyDaysAgo && selectedDate <= today;
                const withinAcademicYear = selectedDate >= academicYearStart && selectedDate <= academicYearEnd;
                
                if (!within90Days && !withinAcademicYear) {
                    // Reset to today if invalid
                    this.value = today.toISOString().split('T')[0];
                    alert('Issue date must be within the current academic year or no more than 90 days from today.');
                }
            });
            
            // Initialize validity date (typically 1 year from issue date)
            const validDateInputEl2 = document.getElementById('validDateInput');
            const oneYearFromNow = new Date(today.getTime() + (365 * 24 * 60 * 60 * 1000));
            validDateInputEl2.value = oneYearFromNow.toISOString().split('T')[0];
            
            updateCardText('validDateInput', 'cardValidDate', true);
            
            // Update validity display after dates are set
            setTimeout(() => {
                updateValidityDisplay();
            }, 100);
            
            
            // Auto-update validity date when issue date changes
            issueDateInput.addEventListener('change', function() {
                const issueDate = new Date(this.value);
                const validDate = new Date(issueDate.getTime() + (365 * 24 * 60 * 60 * 1000)); // 1 year later
                validDateInput.value = validDate.toISOString().split('T')[0];
                validDateInput.dispatchEvent(new Event('input'));
                updateValidityDisplay();
            });
            
            // Update validity when valid date changes
            validDateInput.addEventListener('change', function() {
                updateValidityDisplay();
            });
            // Website: show hostname only in preview (e.g., ipu.ac.in)
            const websiteInputEl = document.getElementById('websiteInput');
            const websitePreviewEl = document.getElementById('card-website');
            if (websiteInputEl && websitePreviewEl) {
                const syncWebsite = () => {
                    const raw = websiteInputEl.value.trim();
                    let url = raw;
                    if (!/^https?:\/\//i.test(url)) {
                        url = 'https://' + url.replace(/^\/*/, '');
                    }
                    try {
                        const u = new URL(url);
                        websitePreviewEl.textContent = u.hostname.replace(/^www\./i, '');
                    } catch (_) {
                        websitePreviewEl.textContent = raw.replace(/^https?:\/\//i, '').replace(/^www\./i, '');
                    }
                };
                syncWebsite();
                // Debounced website sync for better performance
                const debouncedWebsiteSync = debounce(syncWebsite, 100);
                websiteInputEl.addEventListener('input', debouncedWebsiteSync);
            }
            // Don't set default name initially - wait for location detection
            // nameInputEl.value will be set after location detection
            // Handle name input with proper space support
            const nameInputEl = document.getElementById('nameInput');
            const cardNameEl = document.getElementById('cardName');
            
            // Set CSS to make input uppercase
            nameInputEl.style.textTransform = 'uppercase';
            
            // Initial update of card preview
            if (cardNameEl) cardNameEl.textContent = nameInputEl.value.toUpperCase();
            
            // Update card preview on input (with uppercase formatting)
            // Debounced input handler for better performance
            const debouncedNameUpdate = debounce(() => {
                if (cardNameEl) cardNameEl.textContent = nameInputEl.value.toUpperCase();
                // Also update email when name changes
                updateStudentEmail();
            }, 100);
            
            nameInputEl.addEventListener('input', debouncedNameUpdate);
            
            // Only format multiple spaces on blur (after typing is complete)
            nameInputEl.addEventListener('blur', () => {
                const originalValue = nameInputEl.value;
                const normalized = originalValue.replace(/\s+/g, ' ').trim();
                
                if (normalized !== originalValue) {
                    nameInputEl.value = normalized;
                    if (cardNameEl) cardNameEl.textContent = normalized.toUpperCase();
                }
            });

            // Don't update email initially - wait for location detection
            // updateStudentEmail() will be called after location detection
            document.getElementById('idInput').addEventListener('input', updateStudentEmail);

            // Principal signature text input → shows text signature, hides image
            const principalNameInput = document.getElementById('principalNameInput');
            principalNameInput.addEventListener('input', () => {
                const signText = document.getElementById('card-principal-name');
                const signCaption = document.getElementById('cardPrincipalCaption');
                if (signText) signText.textContent = principalNameInput.value || signText.textContent;
                if (signText) signText.style.display = 'block';
                if (signCaption) signCaption.style.display = 'inline-block';
            });

            // Event listeners for random buttons
            const randomIdBtn = document.getElementById('randomIdBtn');
            if (randomIdBtn) {
                randomIdBtn.addEventListener('click', () => {
                    const randomId = randomIDs[Math.floor(Math.random() * randomIDs.length)];
                    document.getElementById('idInput').value = randomId;
                    document.getElementById('idInput').dispatchEvent(new Event('input'));
                });
            }
            const randomCollegeBtn = document.getElementById('randomCollegeBtn');
            if (randomCollegeBtn) {
                randomCollegeBtn.addEventListener('click', () => {
                    const universities = (countryData && countryData.universities) ? countryData.universities : universityNames;
                    const randomCollege = universities[Math.floor(Math.random() * universities.length)];
                    
                    const collegeInputEl = document.getElementById('collegeNameInput');
                    if (collegeInputEl) {
                        collegeInputEl.value = randomCollege;
                
                // Ensure website field is enabled
                const websiteInput = document.getElementById('websiteInput');
                if (websiteInput) {
                    websiteInput.disabled = false;
                    websiteInput.placeholder = 'Enter website';
                }
                
                // Ensure student email field is enabled
                const studentEmailInput = document.getElementById('studentEmailInput');
                if (studentEmailInput) {
                    studentEmailInput.disabled = false;
                    studentEmailInput.placeholder = 'Email will be generated';
                }
                
                        collegeInputEl.dispatchEvent(new Event('input'));
                        // Auto-pick class after picking a college
                        if (window.pickRandomClass) window.pickRandomClass();
                        // website will be set by input listener
                    }
                });
            }
            const randomMobileBtn = document.getElementById('randomMobileBtn');
            if (randomMobileBtn) {
                randomMobileBtn.addEventListener('click', () => {
                    const randomDigits = generateMobileDigits(currentCountry);
                    const formatted = formatMobileFromDigits(randomDigits, countryData.phoneCode);
                    document.getElementById('mobileInput').value = formatted;
                    document.getElementById('mobileInput').dispatchEvent(new Event('input'));
                });
            }
            const randomAddressBtn = document.getElementById('randomAddressBtn');
            if (randomAddressBtn) {
                randomAddressBtn.addEventListener('click', () => {
                    const randomAddress = getRandomAddress();
                    document.getElementById('addressInput').value = randomAddress;
                    document.getElementById('addressInput').dispatchEvent(new Event('input'));
                });
            }
            const randomLogoBtn = document.getElementById('randomLogoBtn');
            if (randomLogoBtn) {
                randomLogoBtn.addEventListener('click', () => {
                    handleImage('logo');
                });
            }
            const randomPhotoBtn = document.getElementById('randomPhotoBtn');
            if (randomPhotoBtn) {
                randomPhotoBtn.addEventListener('click', () => {
                    handleImage('photo');
                });
            }
            // Keep signature as text by default; Random should not show image
            const randomSignatureBtn = document.getElementById('randomSignatureBtn');
            if (randomSignatureBtn) {
                randomSignatureBtn.addEventListener('click', () => {
                    const signText = document.getElementById('card-principal-name');
                    const signCaption = document.getElementById('cardPrincipalCaption');
                    if (signText) signText.style.display = 'block';
                    if (signCaption) signCaption.style.display = 'inline-block';
                });
            }
            const randomNameBtn = document.getElementById('randomNameBtn');
            if (randomNameBtn) {
                randomNameBtn.addEventListener('click', () => {
                    const nameInput = document.getElementById('nameInput');
                    const randomName = getRandomName();
                    const formattedName = formatStudentName(randomName);
                    nameInput.value = formattedName;
                    nameInput.dispatchEvent(new Event('input'));
                });
            }

            // Class picker
            const classOptionsFallback = ['CSE','EEE','ECE','ME','CE','IT','ICT','SE','AI','DS','BBA','MBA','ACC','FIN','MKT','ECO','ENG','LAW','MED','NUR','PHARM','ARCH','STAT','MATH','PHY','CHE','BIO'];
            const pickClass = () => {
                const collegeRaw = (document.getElementById('collegeNameInput').value || '');
                const collegeNorm = collegeRaw.replace(/\s+/g, ' ').trim();
                
                // Try exact, then case-insensitive, then substring match
                let def = universityDefaults[collegeNorm];
                if (!def) {
                    const keys = Object.keys(universityDefaults);
                    const lower = collegeNorm.toLowerCase();
                    let key = keys.find(k => k.toLowerCase() === lower);
                    if (!key) key = keys.find(k => k.toLowerCase().includes(lower));
                    if (key) def = universityDefaults[key];
                }
                
                const countryClassList = (countryData && countryData.classes && countryData.classes.length) ? countryData.classes : classOptionsFallback;
                const chosen = (def && def.className) ? def.className : countryClassList[Math.floor(Math.random()*countryClassList.length)];
                
                const classInput = document.getElementById('classInput');
                if (classInput) {
                    classInput.value = chosen;
                    classInput.dispatchEvent(new Event('input'));
                }
            };
            const randomClassBtn = document.getElementById('randomClassBtn');
            if (randomClassBtn) {
                randomClassBtn.addEventListener('click', pickClass);
            }
            // Expose globally as a fallback for inline onclick
            window.pickRandomClass = pickClass;

            // Copy Email Button
            document.getElementById('copyEmailBtn').addEventListener('click', () => {
                const studentEmailInput = document.getElementById('studentEmailInput');
                studentEmailInput.select();
                studentEmailInput.setSelectionRange(0, 99999);
                document.execCommand('copy');
                alert('Email copied to clipboard!');
            });

            // Event listeners for file upload
            document.getElementById('collegeLogoUpload').addEventListener('change', (e) => handleFile(e, 'card-logo'));
            document.getElementById('studentPhotoUpload').addEventListener('change', (e) => handleFile(e, 'card-photo'));
            document.getElementById('principalSignatureUpload').addEventListener('change', (e) => {
                const file = e.target.files && e.target.files[0];
                if (!file) return;
                // Required size constraints (approx): up to 800x300 px, at least 300x90 px, < 1 MB
                const MAX_BYTES = 1 * 1024 * 1024;
                const MIN_W = 300, MIN_H = 90;
                const MAX_W = 800, MAX_H = 300;
                if (file.size > MAX_BYTES) {
                    alert('Signature image too large. Please upload an image under 1 MB.');
                    e.target.value = '';
                    return;
                }
                const reader = new FileReader();
                reader.onload = function(ev) {
                    const tmp = new Image();
                    tmp.onload = function() {
                        const w = tmp.naturalWidth, h = tmp.naturalHeight;
                        if (w < MIN_W || h < MIN_H || w > MAX_W || h > MAX_H) {
                            alert('Signature size required: between ' + MIN_W + 'x' + MIN_H + ' and ' + MAX_W + 'x' + MAX_H + ' pixels.');
                            e.target.value = '';
                            return;
                        }
                        // Valid → signature image functionality removed
                        const signText = document.getElementById('card-principal-name');
                        const signCaption = document.getElementById('cardPrincipalCaption');
                        if (signText) signText.style.display = 'block';
                        if (signCaption) signCaption.style.display = 'inline-block';
                    };
                    tmp.onerror = function() {
                        alert('Could not read signature image. Please try a different file.');
                        e.target.value = '';
                    };
                    tmp.src = ev.target.result;
                };
                reader.readAsDataURL(file);
            });

            // Download functionality - JPG only
            document.getElementById('downloadCardButton').addEventListener('click', async () => {
                const card = document.getElementById('id-card');
                const scaleFactor = 4;

                try {
                    const canvas = await html2canvas(card, {
                        scale: scaleFactor,
                        useCORS: true,
                        logging: false,
                        width: card.offsetWidth,
                        height: card.offsetHeight
                    });

                    // JPG Download only
                    const jpgUrl = canvas.toDataURL('image/jpeg', 0.9);
                    const jpgLink = document.createElement('a');
                    jpgLink.href = jpgUrl;
                    
                    // Generate filename from student name and ID
                    const studentName = document.getElementById('nameInput').value || 'Student';
                    const studentId = document.getElementById('idInput').value || 'ID';
                    const firstWord = studentName.split(' ')[0].replace(/[^a-zA-Z0-9]/g, '_');
                    const cleanId = studentId.replace(/[^a-zA-Z0-9]/g, '_');
                    const filename = `${firstWord}_${cleanId}.jpg`;
                    
                    jpgLink.download = filename;
                    document.body.appendChild(jpgLink);
                    jpgLink.click();
                    document.body.removeChild(jpgLink);
                } catch (error) {
                    console.error("Error generating card:", error);
                }
            });
    // Default state on load: show text/caption only
    const initSignText = document.getElementById('card-principal-name');
    const initSignCaption = document.getElementById('cardPrincipalCaption');
    if (initSignText) initSignText.style.display = 'block';
    if (initSignCaption) initSignCaption.style.display = 'inline-block';
});
