// Encrypted title data - Protection against code copying
const encryptedTitle = {
    parts: [
        { text: "GEMINI", color: "text-indigo-600" },
        { text: "EDU", color: "text-fuchsia-600" },
        { text: "ID", color: "text-emerald-600" },
        { text: "CARD", color: "text-amber-600" },
        { text: "GENERATOR", color: "text-sky-600" }
    ]
};

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

// Country-specific data structures
const countryConfig = {
    'BD': {
        name: 'Bangladesh',
        flag: '🇧🇩',
        currency: 'BDT',
        phoneCode: '+880',
        classes: [
            'CSE','EEE','ECE','ME','CE','IT','ICT','SE','AI','DS','BBA','MBA','ACC','FIN','MKT','ECO','ENG','LAW','MED','NUR','PHARM','ARCH','STAT','MATH','PHY','CHE','BIO','SOC','PSY','GEO','HIS'
        ],
        universities: [
            // Default University
            'Dhaka International University',
            
            // Public Universities
            'University of Dhaka',
            'Bangladesh University of Engineering and Technology (BUET)',
            'Jahangirnagar University',
            'Rajshahi University',
            'Chittagong University',
            'Khulna University',
            'Bangladesh Agricultural University (BAU)',
            'Chittagong University of Engineering and Technology (CUET)',
            'Rajshahi University of Engineering and Technology (RUET)',
            'Khulna University of Engineering and Technology (KUET)',
            'Islamic University of Technology (IUT)',
            'Shahjalal University of Science and Technology (SUST)',
            'Bangladesh University of Professionals (BUP)',
            'Military Institute of Science and Technology (MIST)',
            
            // Private Universities
            'North South University (NSU)',
            'Independent University Bangladesh (IUB)',
            'BRAC University',
            'American International University Bangladesh (AIUB)',
            'East West University (EWU)',
            'United International University (UIU)',
            'Bangladesh University of Business and Technology (BUBT)',
            'Daffodil International University (DIU)'
        ],
        websites: {
            // Public Universities (Official Data)
            'University of Dhaka': 'https://www.du.ac.bd',
            'Bangladesh University of Engineering and Technology (BUET)': 'https://www.buet.ac.bd',
            'Jahangirnagar University': 'https://www.juniv.edu',
            'Rajshahi University': 'https://www.ru.ac.bd',
            'Chittagong University': 'https://www.cu.ac.bd',
            'Khulna University': 'https://ku.ac.bd',
            'Bangladesh Agricultural University (BAU)': 'https://bau.edu.bd',
            'Chittagong University of Engineering and Technology (CUET)': 'https://www.cuet.ac.bd',
            'Rajshahi University of Engineering and Technology (RUET)': 'https://www.ruet.ac.bd',
            'Khulna University of Engineering and Technology (KUET)': 'https://www.kuet.ac.bd',
            'Islamic University of Technology (IUT)': 'https://www.iutoic-dhaka.edu',
            'Shahjalal University of Science and Technology (SUST)': 'https://www.sust.edu',
            'Bangladesh University of Professionals (BUP)': 'https://www.bup.edu.bd',
            'Military Institute of Science and Technology (MIST)': 'https://www.mist.ac.bd',
            
            // Private Universities (Official Data)
            'North South University (NSU)': 'https://www.northsouth.edu',
            'Independent University Bangladesh (IUB)': 'https://www.iub.edu.bd',
            'BRAC University': 'https://www.bracu.ac.bd',
            'American International University Bangladesh (AIUB)': 'https://www.aiub.edu',
            'East West University (EWU)': 'https://www.ewubd.edu',
            'United International University (UIU)': 'https://www.uiu.ac.bd',
            'Bangladesh University of Business and Technology (BUBT)': 'https://www.bubt.edu.bd',
            'Daffodil International University (DIU)': 'https://www.daffodilvarsity.edu.bd',
            'Dhaka International University': 'https://www.diu.ac.bd'
        },
        addresses: {
            // Public Universities (Official Data)
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
            
            // Private Universities (Official Data)
            'North South University (NSU)': 'Bashundhara, Dhaka, Bangladesh',
            'Independent University Bangladesh (IUB)': 'Bashundhara, Dhaka, Bangladesh',
            'BRAC University': 'Mohakhali, Dhaka, Bangladesh',
            'American International University Bangladesh (AIUB)': 'Kuratoli, Kuril, Dhaka, Bangladesh',
            'East West University (EWU)': 'Aftabnagar, Dhaka, Bangladesh',
            'United International University (UIU)': 'United City, Madani Ave, Dhaka, Bangladesh',
            'Bangladesh University of Business and Technology (BUBT)': 'Rupnagar, Mirpur 2, Dhaka, Bangladesh',
            'Daffodil International University (DIU)': 'Dhanmondi, Dhaka 1207, Bangladesh',
            'Dhaka International University': 'Satarkul, Badda, Dhaka-1212, Bangladesh'
        },
        principals: {
            'University of Dhaka': 'Prof. Md. Akhtaruzzaman',
            'Bangladesh University of Engineering and Technology (BUET)': 'Prof. Satya Majumder',
            'Chittagong University of Engineering and Technology (CUET)': 'Prof. Mohammad Alam',
            'Rajshahi University of Engineering and Technology (RUET)': 'Prof. Md. Rafiqul Sheikh',
            'Khulna University of Engineering and Technology (KUET)': 'Prof. Quazi Hossain',
            'Jahangirnagar University': 'Prof. Md. Nurul Alam',
            'Chittagong University': 'Prof. Shireen Akhter',
            'Rajshahi University': 'Prof. Golam Sattar',
            'Khulna University': 'Prof. Md. Fayek Uzzaman',
            'Islamic University of Technology (IUT)': 'Prof. Mohammad Islam',
            'Bangladesh Agricultural University (BAU)': 'Prof. Lutful Hassan',
            'Shahjalal University of Science and Technology (SUST)': 'Prof. Farid Ahmed',
            'Bangladesh University of Professionals (BUP)': 'Prof. M. Abul Mozumder',
            'Military Institute of Science and Technology (MIST)': 'Prof. Md. Shafiqul Islam',
            'North South University (NSU)': 'Prof. Atiqul Islam',
            'BRAC University': 'Prof. Vincent Chang',
            'Independent University Bangladesh (IUB)': 'Prof. Tanweer Hasan',
            'American International University Bangladesh (AIUB)': 'Prof. Carmen Lamagna',
            'East West University (EWU)': 'Prof. Mohammed Farashuddin',
            'Daffodil International University (DIU)': 'Prof. M. Lutfar Rahman',
            'Dhaka International University': 'Prof. K.M. Mohsin'
        },
        logos: {
            'Dhaka International University': 'assets/bd-logo/diu.png',
            'University of Dhaka': 'assets/bd-logo/dulogo-light_new.png',
            'Bangladesh University of Engineering and Technology (BUET)': 'assets/bd-logo/buet.png',
            'Jahangirnagar University': 'assets/bd-logo/juniv.png',
            'Rajshahi University': 'assets/bd-logo/ru-logo.png',
            'Chittagong University': 'assets/bd-logo/cu.png',
            'Khulna University': 'assets/bd-logo/ku.png',
            'Bangladesh Agricultural University (BAU)': 'assets/bd-logo/bau.png',
            'Chittagong University of Engineering and Technology (CUET)': 'assets/bd-logo/cuet.png',
            'Rajshahi University of Engineering and Technology (RUET)': 'assets/bd-logo/ruet.png',
            'Khulna University of Engineering and Technology (KUET)': 'assets/bd-logo/kuet.png',
            'Islamic University of Technology (IUT)': 'assets/bd-logo/iutoic-dhaka.png',
            'Shahjalal University of Science and Technology (SUST)': 'assets/bd-logo/sust..png',
            'Bangladesh University of Professionals (BUP)': 'assets/bd-logo/bup.png',
            'Military Institute of Science and Technology (MIST)': 'assets/bd-logo/mist.png',
            'North South University (NSU)': 'assets/bd-logo/northsouth.png',
            'Independent University Bangladesh (IUB)': 'assets/bd-logo/iub.png',
            'BRAC University': 'assets/bd-logo/bracu.png',
            'American International University Bangladesh (AIUB)': 'assets/bd-logo/aiub.png',
            'East West University (EWU)': 'assets/bd-logo/ewubd.png',
            'United International University (UIU)': 'assets/bd-logo/uiu.png',
            'Bangladesh University of Business and Technology (BUBT)': 'assets/bd-logo/bubt.png',
            'Daffodil International University (DIU)': 'assets/bd-logo/daffodilvarsity.png'
        },
        names: [
            'Ahmed Rahman',
            'Mohammad Ali',
            'Hasan Mahmud',
            'Rashid Khan',
            'Karim Uddin',
            'Nurul Islam',
            'Abdul Gafur',
            'Shahid Hasan',
            'Rafiq Ahmed',
            'Jahangir Alam',
            'Kamrul Hossain',
            'Sakib Hasan',
            'Rakib Ahmed',
            'Nazmul Islam',
            'Sajib Rahman',
            'Tareq Hasan',
            'Arif Khan',
            'Sabbir Ahmed',
            'Rifat Islam',
            'Nayeem Uddin',
            'Mahbub Alam',
            'Shahriar Ahmed',
            'Faisal Rahman',
            'Imran Khan',
            'Sajjad Hossain',
            'Mizanur Rahman',
            'Ashraf Uddin',
            'Farid Ahmed',
            'Jalal Uddin',
            'Bashir Ahmed',
            'Nasir Uddin',
            'Khalil Rahman',
            'Momin Uddin',
            'Siraj Uddin',
            'Azizur Rahman',
            'Mofiz Uddin',
            'Rashid Uddin',
            'Jahid Hasan',
            'Mamun Ahmed',
            'Rony Khan'
        ],
        addresses: [
            'Dhanmondi, Dhaka 1205, Bangladesh',
            'Gulshan, Dhaka 1212, Bangladesh',
            'Uttara, Dhaka 1230, Bangladesh',
            'Banani, Dhaka 1213, Bangladesh',
            'Motijheel, Dhaka 1000, Bangladesh',
            'Wari, Dhaka 1203, Bangladesh',
            'Ramna, Dhaka 1000, Bangladesh',
            'Tejgaon, Dhaka 1215, Bangladesh',
            'Mohammadpur, Dhaka 1207, Bangladesh',
            'Lalmatia, Dhaka 1207, Bangladesh',
            'Chittagong, Bangladesh',
            'Rajshahi, Bangladesh',
            'Khulna, Bangladesh',
            'Sylhet, Bangladesh',
            'Barisal, Bangladesh',
            'Rangpur, Bangladesh',
            'Mymensingh, Bangladesh',
            'Comilla, Bangladesh',
            'Jessore, Bangladesh',
            'Narayanganj, Bangladesh',
            'Gazipur, Bangladesh',
            'Bogra, Bangladesh',
            'Dinajpur, Bangladesh',
            'Cox\'s Bazar, Bangladesh',
            'Chandpur, Bangladesh',
            'Kushtia, Bangladesh',
            'Pabna, Bangladesh',
            'Noakhali, Bangladesh',
            'Feni, Bangladesh',
            'Lakshmipur, Bangladesh'
        ]
    },
    'IN': {
        name: 'India',
        flag: '🇮🇳',
        currency: 'INR',
        phoneCode: '+91',
        classes: [
            'CSE','IT','ECE','EEE','ME','CE','AIML','DS','CIV','CHE','BBA','MBA','B.COM','M.COM','BSC','MSC','ENG','LAW','MBBS','BDS','BPHARM','ARCH','STAT','MATH','PHY','CHE','BIO'
        ],
        universities: [
            'Guru Gobind Singh Indraprastha University',
            'University of Delhi',
            'Jawaharlal Nehru University',
            'Panjab University, Chandigarh',
            'University of Mumbai',
            'Savitribai Phule Pune University',
            'Banaras Hindu University',
            'University of Calcutta',
            'Anna University',
            'University of Hyderabad'
        ],
        websites: {
            'Guru Gobind Singh Indraprastha University': 'https://www.ipu.ac.in',
            'University of Delhi': 'https://www.du.ac.in',
            'Jawaharlal Nehru University': 'https://www.jnu.ac.in',
            'Panjab University, Chandigarh': 'https://puchd.ac.in',
            'University of Mumbai': 'https://mu.ac.in',
            'Savitribai Phule Pune University': 'https://www.unipune.ac.in',
            'Banaras Hindu University': 'https://www.bhu.ac.in',
            'University of Calcutta': 'https://www.caluniv.ac.in',
            'Anna University': 'https://www.annauniv.edu',
            'University of Hyderabad': 'https://uohyd.ac.in'
        },
        addresses: {
            'Guru Gobind Singh Indraprastha University': 'Sector 16C, Dwarka, New Delhi, Delhi 110078',
            'University of Delhi': 'Benito Juarez Marg, South Campus, New Delhi, Delhi 110021',
            'Jawaharlal Nehru University': 'New Mehrauli Road, JNU, New Delhi, Delhi 110067',
            'Panjab University, Chandigarh': 'Sector 14, Chandigarh, 160014',
            'University of Mumbai': 'M.G. Road, Fort, Mumbai, Maharashtra 400032',
            'Savitribai Phule Pune University': 'Ganeshkhind, Pune, Maharashtra 411007',
            'Banaras Hindu University': 'Ajagara, Varanasi, Uttar Pradesh 221005',
            'University of Calcutta': '87/1, College Street, Kolkata, West Bengal 700073',
            'Anna University': 'Sardar Patel Rd, Guindy, Chennai, Tamil Nadu 600025',
            'University of Hyderabad': 'Prof. C.R. Rao Road, Gachibowli, Hyderabad, Telangana 500046'
        },
        principals: {
            'Guru Gobind Singh Indraprastha University': 'Prof. Mahesh Verma',
            'University of Delhi': 'Prof. Yogesh Singh',
            'Jawaharlal Nehru University': 'Prof. Santishree Pandit',
            'Panjab University, Chandigarh': 'Prof. Raj Kumar',
            'University of Mumbai': 'Prof. Suhas Pednekar',
            'Savitribai Phule Pune University': 'Prof. Nitin Karmalkar',
            'Banaras Hindu University': 'Prof. Sudhir Jain',
            'University of Calcutta': 'Prof. Sonali Banerjee',
            'Anna University': 'Prof. R. Velraj',
            'University of Hyderabad': 'Prof. B.J. Rao'
        },
        names: [
            'Rohan Sharma',
            'Siddharth Patel',
            'Aditya Singh',
            'Arjun Gupta',
            'Dhruv Kumar',
            'Kabir Khan',
            'Aryan Verma',
            'Vihaan Jain',
            'Ishaan Reddy',
            'Dev Joshi',
            'Krishnan Iyer',
            'Neel Mehta',
            'Aarav Das',
            'Vivaan Singh',
            'Reyansh Chaudhary',
            'Samar Arora',
            'Yash Yadav',
            'Kunal Desai',
            'Anand Sharma',
            'Gautam Mishra'
        ],
        addresses: [
            'At- Sadanandpur Dist- Supaul, Bihar',
            '123 Main St, Anytown, USA',
            '456 College Rd, Cityville, State',
            '789 Academic Ave, Metropoli, Country'
        ]
    },
    'PK': {
        name: 'Pakistan',
        flag: '🇵🇰',
        currency: 'PKR',
        phoneCode: '+92',
        classes: [
            'CSE','EEE','ECE','ME','CE','IT','ICT','SE','AI','DS','BBA','MBA','ACC','FIN','MKT','ECO','ENG','LAW','MBBS','PHARM','ARCH','STAT','MATH','PHY','CHE','BIO'
        ],
        universities: [
            'University of the Punjab',
            'National University of Sciences and Technology (NUST)',
            'Quaid-i-Azam University (QAU)',
            'University of Karachi',
            'University of Engineering and Technology, Lahore (UET Lahore)',
            'COMSATS University Islamabad',
            'Allama Iqbal Open University (AIOU)',
            'University of Peshawar',
            'Bahauddin Zakariya University (BZU)',
            'Government College University, Lahore (GCU Lahore)',
            'Pakistan Institute of Engineering and Applied Sciences (PIEAS)',
            'National Textile University (NTU)',
            'University of Sargodha (UOS)',
            'Institute of Space Technology (IST)',
            'Lahore University of Management Sciences (LUMS)',
            'Aga Khan University (AKU)',
            'Institute of Business Administration, Karachi (IBA)',
            'University of Lahore (UOL)',
            'Hamdard University',
            'Bahria University',
            'Iqra University',
            'Riphah International University',
            'National University of Computer and Emerging Sciences (FAST-NUCES)'
        ],
        websites: {
            'University of the Punjab': 'https://pu.edu.pk',
            'National University of Sciences and Technology (NUST)': 'https://nust.edu.pk',
            'Quaid-i-Azam University (QAU)': 'https://qau.edu.pk',
            'University of Karachi': 'https://uok.edu.pk',
            'University of Engineering and Technology, Lahore (UET Lahore)': 'https://uet.edu.pk',
            'COMSATS University Islamabad': 'https://comsats.edu.pk',
            'Allama Iqbal Open University (AIOU)': 'https://aiou.edu.pk',
            'University of Peshawar': 'https://uop.edu.pk',
            'Bahauddin Zakariya University (BZU)': 'https://bzu.edu.pk',
            'Government College University, Lahore (GCU Lahore)': 'https://gcu.edu.pk',
            'Pakistan Institute of Engineering and Applied Sciences (PIEAS)': 'https://pieas.edu.pk',
            'National Textile University (NTU)': 'https://ntu.edu.pk',
            'University of Sargodha (UOS)': 'https://uos.edu.pk',
            'Institute of Space Technology (IST)': 'https://ist.edu.pk',
            'Lahore University of Management Sciences (LUMS)': 'https://lums.edu.pk',
            'Aga Khan University (AKU)': 'https://aku.edu',
            'Institute of Business Administration, Karachi (IBA)': 'https://iba.edu.pk',
            'University of Lahore (UOL)': 'https://uol.edu.pk',
            'Hamdard University': 'https://hamdard.edu.pk',
            'Bahria University': 'https://bahria.edu.pk',
            'Iqra University': 'https://iqra.edu.pk',
            'Riphah International University': 'https://riphah.edu.pk',
            'National University of Computer and Emerging Sciences (FAST-NUCES)': 'https://nu.edu.pk'
        },
        addresses: {
            'University of the Punjab': 'Quaid-e-Azam Campus, Canal Rd, Lahore, Punjab, Pakistan',
            'National University of Sciences and Technology (NUST)': 'H-12 Campus, Islamabad, Pakistan',
            'Quaid-i-Azam University (QAU)': 'Shahdara Valley Rd, Islamabad, Pakistan',
            'University of Karachi': 'Main University Rd, Karachi, Sindh, Pakistan',
            'University of Engineering and Technology, Lahore (UET Lahore)': 'GT Rd, Lahore 54890, Punjab, Pakistan',
            'COMSATS University Islamabad': 'Park Rd, Tarlai Kalan, Islamabad, Pakistan',
            'Allama Iqbal Open University (AIOU)': 'H-8/2, Islamabad, Pakistan',
            'University of Peshawar': 'University Rd, Peshawar, Khyber Pakhtunkhwa, Pakistan',
            'Bahauddin Zakariya University (BZU)': 'BZU, Multan, Punjab, Pakistan',
            'Government College University, Lahore (GCU Lahore)': 'Katchery Rd, Lahore, Punjab, Pakistan',
            'Pakistan Institute of Engineering and Applied Sciences (PIEAS)': 'Lehtrar Rd, Nilore, Islamabad, Pakistan',
            'National Textile University (NTU)': 'Sheikhupura Rd, Faisalabad, Punjab, Pakistan',
            'University of Sargodha (UOS)': 'University Rd, Sargodha, Punjab, Pakistan',
            'Institute of Space Technology (IST)': 'Islamabad Highway, Islamabad, Pakistan',
            'Lahore University of Management Sciences (LUMS)': 'Sector U, DHA, Lahore, Punjab, Pakistan',
            'Aga Khan University (AKU)': 'Stadium Rd, Karachi, Sindh, Pakistan',
            'Institute of Business Administration, Karachi (IBA)': 'University Rd, Karachi, Sindh, Pakistan',
            'University of Lahore (UOL)': '1-KM Defence Rd, Lahore, Punjab, Pakistan',
            'Hamdard University': 'Madinat al-Hikmah, Karachi, Sindh, Pakistan',
            'Bahria University': 'Shangrilla Rd, E-8, Islamabad, Pakistan',
            'Iqra University': 'Main Campus, Karachi, Sindh, Pakistan',
            'Riphah International University': 'I-14 Campus, Islamabad, Pakistan',
            'National University of Computer and Emerging Sciences (FAST-NUCES)': 'A.K. Brohi Rd, H-11/4, Islamabad, Pakistan'
        },
        principals: {
            'University of the Punjab': 'Prof. Niaz Ahmad',
            'National University of Sciences and Technology (NUST)': 'Lt Gen Javed Bukhari',
            'Quaid-i-Azam University (QAU)': 'Prof. Muhammad Ali',
            'University of Karachi': 'Prof. Khalid Iraqi',
            'University of Engineering and Technology, Lahore (UET Lahore)': 'Prof. Mansoor Sarwar',
            'COMSATS University Islamabad': 'Prof. Muhammad Afzal',
            'Allama Iqbal Open University (AIOU)': 'Prof. Zia Ul-Qayyum',
            'University of Peshawar': 'Prof. Muhammad Khan',
            'Bahauddin Zakariya University (BZU)': 'Prof. Mansoor Kundi',
            'Government College University, Lahore (GCU Lahore)': 'Prof. Asghar Zaidi',
            'Pakistan Institute of Engineering and Applied Sciences (PIEAS)': 'Prof. Nasir Mirza',
            'National Textile University (NTU)': 'Prof. Tanveer Hussain',
            'University of Sargodha (UOS)': 'Prof. Qaisar Abbas',
            'Institute of Space Technology (IST)': 'Prof. Muhammad Shafique',
            'Lahore University of Management Sciences (LUMS)': 'Dr. Arshad Ahmad',
            'Aga Khan University (AKU)': 'Dr. Sulaiman Shahabuddin',
            'Institute of Business Administration, Karachi (IBA)': 'Dr. S Akbar Zaidi',
            'University of Lahore (UOL)': 'Prof. Muhammad Ashraf',
            'Hamdard University': 'Prof. Syed Rashid',
            'Bahria University': 'Vice Admiral Muhammad Shafiq',
            'Iqra University': 'Prof. Wasim Qazi',
            'Riphah International University': 'Prof. Anis Ahmad',
            'National University of Computer and Emerging Sciences (FAST-NUCES)': 'Prof. Amir Muhammad'
        },
        logos: {
            'University of the Punjab': 'assets/pk-logo/pu.png',
            'National University of Sciences and Technology (NUST)': 'assets/pk-logo/nust.png',
            'Quaid-i-Azam University (QAU)': 'assets/pk-logo/qau.png',
            'University of Karachi': 'assets/pk-logo/uok.png',
            'University of Engineering and Technology, Lahore (UET Lahore)': 'assets/pk-logo/uet.png',
            'COMSATS University Islamabad': 'assets/pk-logo/comsats.png',
            'Allama Iqbal Open University (AIOU)': 'assets/pk-logo/aiou.png',
            'University of Peshawar': 'assets/pk-logo/uop.png',
            'Bahauddin Zakariya University (BZU)': 'assets/pk-logo/bzu.png',
            'Government College University, Lahore (GCU Lahore)': 'assets/pk-logo/gcu.png',
            'Pakistan Institute of Engineering and Applied Sciences (PIEAS)': 'assets/pk-logo/pieas.png',
            'National Textile University (NTU)': 'assets/pk-logo/ntu.png',
            'University of Sargodha (UOS)': 'assets/pk-logo/uos.png',
            'Institute of Space Technology (IST)': 'assets/pk-logo/ist.png',
            'Lahore University of Management Sciences (LUMS)': 'assets/pk-logo/LUMS Logo.png',
            'Aga Khan University (AKU)': 'assets/pk-logo/AKU_logo.png',
            'Institute of Business Administration, Karachi (IBA)': 'assets/pk-logo/iba.png',
            'University of Lahore (UOL)': 'assets/pk-logo/uol.png',
            'Hamdard University': 'assets/pk-logo/hamdard.png',
            'Bahria University': 'assets/pk-logo/bahria.png',
            'Iqra University': 'assets/pk-logo/iqra.png',
            'Riphah International University': 'assets/pk-logo/riphah-logo.svg',
            'National University of Computer and Emerging Sciences (FAST-NUCES)': 'assets/pk-logo/NU-logo.png'
        },
        names: [
            'Ali Khan','Ayesha Siddiqui','Ahmed Raza','Fatima Noor','Usman Ali','Maryam Sheikh','Zain Abbas','Hira Khan','Bilal Ahmed','Laiba Iqbal','Hamza Saeed','Zoya Khan','Imran Shah','Aqsa Fatima','Salman Rafiq','Maira Ali'
        ]
    },
    'UK': {
        name: 'United Kingdom',
        flag: '🇬🇧',
        currency: 'GBP',
        phoneCode: '+44',
        classes: [
            'CSE','EEE','ECE','ME','CE','IT','ICT','SE','AI','DS','BBA','MBA','ACC','FIN','MKT','ECO','ENG','LAW','MED','NUR','PHARM','ARCH','STAT','MATH','PHY','CHE','BIO'
        ],
        universities: [
            // Default University (first)
            'University of the Pacific',
            'University of Oxford',
            'University of Cambridge',
            'Imperial College London',
            'London School of Economics (LSE)',
            'University College London (UCL)',
            'University of Edinburgh',
            'King’s College London',
            'University of Manchester',
            'University of Bristol',
            'University of Glasgow',
            'University of Birmingham',
            'University of Leeds',
            'University of Warwick',
            'University of Sheffield',
            'University of Southampton',
            'University of York',
            'University of Liverpool',
            'University of Nottingham',
            'University of St Andrews',
            'Queen Mary University of London'
        ],
        websites: {
            'University of Oxford': 'https://www.ox.ac.uk',
            'University of Cambridge': 'https://www.cam.ac.uk',
            'Imperial College London': 'https://www.imperial.ac.uk',
            'London School of Economics (LSE)': 'https://www.lse.ac.uk',
            'University College London (UCL)': 'https://www.ucl.ac.uk',
            'University of Edinburgh': 'https://www.ed.ac.uk',
            'King’s College London': 'https://www.kcl.ac.uk',
            'University of Manchester': 'https://www.manchester.ac.uk',
            'University of Bristol': 'https://www.bristol.ac.uk',
            'University of Glasgow': 'https://www.gla.ac.uk',
            'University of Birmingham': 'https://www.birmingham.ac.uk',
            'University of Leeds': 'https://www.leeds.ac.uk',
            'University of Warwick': 'https://warwick.ac.uk',
            'University of Sheffield': 'https://www.sheffield.ac.uk',
            'University of Southampton': 'https://www.southampton.ac.uk',
            'University of York': 'https://www.york.ac.uk',
            'University of Liverpool': 'https://www.liverpool.ac.uk',
            'University of Nottingham': 'https://www.nottingham.ac.uk',
            'University of St Andrews': 'https://www.st-andrews.ac.uk',
            'Queen Mary University of London': 'https://www.qmul.ac.uk',
            'University of the Pacific': 'https://www.pacific.edu'
        },
        addresses: {
            'University of Oxford': 'Wellington Square, Oxford, UK',
            'University of Cambridge': 'Trinity Ln, Cambridge, UK',
            'Imperial College London': 'South Kensington, London, UK',
            'London School of Economics (LSE)': 'Houghton St, London, UK',
            'University College London (UCL)': 'Gower St, London, UK',
            'University of Edinburgh': 'South Bridge, Edinburgh, UK',
            'King’s College London': 'Strand, London, UK',
            'University of Manchester': 'Oxford Rd, Manchester, UK',
            'University of Bristol': 'Tyndall Ave, Bristol, UK',
            'University of Glasgow': 'University Ave, Glasgow, UK',
            'University of Birmingham': 'Edgbaston, Birmingham, UK',
            'University of Leeds': 'Woodhouse Ln, Leeds, UK',
            'University of Warwick': 'Coventry, UK',
            'University of Sheffield': 'Western Bank, Sheffield, UK',
            'University of Southampton': 'University Rd, Southampton, UK',
            'University of York': 'Heslington, York, UK',
            'University of Liverpool': 'Liverpool, UK',
            'University of Nottingham': 'University Park, Nottingham, UK',
            'University of St Andrews': 'St Andrews, Scotland, UK',
            'Queen Mary University of London': 'Mile End Rd, London, UK',
            'University of the Pacific': '3601 Pacific Ave, Stockton, CA, USA'
        },
        principals: {
            'University of Oxford': 'Prof. Louise Richardson',
            'University of Cambridge': 'Prof. Stephen Toope',
            'Imperial College London': 'Prof. Alice Gast',
            'London School of Economics (LSE)': 'Prof. Minouche Shafik',
            'University College London (UCL)': 'Prof. Michael Spence',
            'University of Edinburgh': 'Prof. Peter Mathieson',
            'King\'s College London': 'Prof. Shitij Kapur',
            'University of Manchester': 'Prof. Nancy Rothwell',
            'University of Bristol': 'Prof. Hugh Brady',
            'University of Glasgow': 'Prof. Anton Muscatelli',
            'University of Birmingham': 'Prof. David Eastwood',
            'University of Leeds': 'Prof. Simone Buitendijk',
            'University of Warwick': 'Prof. Stuart Croft',
            'University of Sheffield': 'Prof. Koen Lamberts',
            'University of Southampton': 'Prof. Mark Smith',
            'University of York': 'Prof. Charlie Jeffery',
            'University of Liverpool': 'Prof. Janet Beer',
            'University of Nottingham': 'Prof. Shearer West',
            'University of St Andrews': 'Prof. Sally Mapstone',
            'Queen Mary University of London': 'Prof. Colin Bailey',
            'University of the Pacific': 'Dr. Christopher Callahan'
        },
        logos: {
            'University of Oxford': 'assets/uk-logo/ox.png',
            'University of Cambridge': 'assets/uk-logo/ac.png',
            'Imperial College London': 'assets/uk-logo/imperial.png',
            'London School of Economics (LSE)': 'assets/uk-logo/imperial.png',
            'University College London (UCL)': 'assets/uk-logo/ucl.png',
            'University of Edinburgh': 'assets/uk-logo/ox.png',
            'King’s College London': 'assets/uk-logo/kcl.png',
            'University of Manchester': 'assets/uk-logo/manchester.ico',
            'University of Bristol': 'assets/uk-logo/bristol.png',
            'University of Glasgow': 'assets/uk-logo/gla.png',
            'University of Birmingham': 'assets/uk-logo/birmingham.png',
            'University of Leeds': 'assets/uk-logo/leeds.png',
            'University of Warwick': 'assets/uk-logo/warwick.PNG',
            'University of Sheffield': 'assets/uk-logo/sheffield.png',
            'University of Southampton': 'assets/uk-logo/ox.png',
            'University of York': 'assets/uk-logo/york.png',
            'University of Liverpool': 'assets/uk-logo/liverpool.png',
            'University of Nottingham': 'assets/uk-logo/nottingham.png',
            'University of St Andrews': 'assets/uk-logo/st-andrews.png',
            'Queen Mary University of London': 'assets/uk-logo/qmul.png',
            'University of the Pacific': 'assets/uk-logo/pacific.png'
        },
        names: ['Oliver Smith','Amelia Johnson','George Brown','Isla Jones','Harry Williams','Emily Taylor']
    },
    'NG': {
        name: 'Nigeria',
        flag: '🇳🇬',
        currency: 'NGN',
        phoneCode: '+234',
        classes: [
            'CSE','EEE','ECE','ME','CE','IT','ICT','SE','AI','DS','BBA','MBA','ACC','FIN','MKT','ECO','ENG','LAW','MBBS','PHARM','ARCH','STAT','MATH','PHY','CHE','BIO','AGR','VET','EDU','SOC','PSY','POL','HIS','LIT','MUS','ART'
        ],
        universities: [
            'University of Ibadan',
            'University of Lagos',
            'Obafemi Awolowo University',
            'Ahmadu Bello University',
            'University of Nigeria, Nsukka',
            'University of Ilorin',
            'Federal University of Technology Akure',
            'University of Benin',
            'Covenant University',
            'Lagos State University',
            'University of Jos',
            'Bayero University Kano',
            'Federal University of Technology Minna',
            'University of Port Harcourt',
            'Nnamdi Azikiwe University',
            'Adekunle Ajasin University',
            'University of Agriculture Abeokuta',
            'Babcock University',
            'Redeemer\'s University Nigeria',
            'Pan-Atlantic University'
        ],
        websites: {
            'University of Ibadan': 'https://www.ui.edu.ng',
            'University of Lagos': 'https://www.unilag.edu.ng',
            'Obafemi Awolowo University': 'https://www.oauife.edu.ng',
            'Ahmadu Bello University': 'https://www.abu.edu.ng',
            'University of Nigeria, Nsukka': 'https://www.unn.edu.ng',
            'University of Ilorin': 'https://www.unilorin.edu.ng',
            'Federal University of Technology Akure': 'https://www.futa.edu.ng',
            'University of Benin': 'https://www.uniben.edu',
            'Covenant University': 'https://www.covenantuniversity.edu.ng',
            'Lagos State University': 'https://www.lasu.edu.ng',
            'University of Jos': 'https://www.unijos.edu.ng',
            'Bayero University Kano': 'https://www.buk.edu.ng',
            'Federal University of Technology Minna': 'https://www.futminna.edu.ng',
            'University of Port Harcourt': 'https://www.uniport.edu.ng',
            'Nnamdi Azikiwe University': 'https://www.unizik.edu.ng',
            'Adekunle Ajasin University': 'https://www.aaua.edu.ng',
            'University of Agriculture Abeokuta': 'https://www.unaab.edu.ng',
            'Babcock University': 'https://www.babcock.edu.ng',
            'Redeemer\'s University Nigeria': 'https://www.run.edu.ng',
            'Pan-Atlantic University': 'https://www.pau.edu.ng'
        },
        addresses: {
            'University of Ibadan': 'Ibadan, Oyo State, Nigeria',
            'University of Lagos': 'Lagos, Nigeria',
            'Obafemi Awolowo University': 'Ile-Ife, Osun State, Nigeria',
            'Ahmadu Bello University': 'Zaria, Kaduna State, Nigeria',
            'University of Nigeria, Nsukka': 'Nsukka, Enugu State, Nigeria',
            'University of Ilorin': 'Ilorin, Kwara State, Nigeria',
            'Federal University of Technology Akure': 'Akure, Ondo State, Nigeria',
            'University of Benin': 'Benin City, Edo State, Nigeria',
            'Covenant University': 'Ota, Ogun State, Nigeria',
            'Lagos State University': 'Ojo, Lagos, Nigeria',
            'University of Jos': 'Jos, Plateau State, Nigeria',
            'Bayero University Kano': 'Kano, Nigeria',
            'Federal University of Technology Minna': 'Minna, Niger State, Nigeria',
            'University of Port Harcourt': 'Port Harcourt, Rivers State, Nigeria',
            'Nnamdi Azikiwe University': 'Awka, Anambra State, Nigeria',
            'Adekunle Ajasin University': 'Akungba, Ondo State, Nigeria',
            'University of Agriculture Abeokuta': 'Abeokuta, Ogun State, Nigeria',
            'Babcock University': 'Ilishan-Remo, Ogun State, Nigeria',
            'Redeemer\'s University Nigeria': 'Ede, Osun State, Nigeria',
            'Pan-Atlantic University': 'Lekki, Lagos, Nigeria'
        },
        principals: {
            'University of Ibadan': 'Prof. Kayode Adebowale',
            'University of Lagos': 'Prof. Folasade Ogunsola',
            'Obafemi Awolowo University': 'Prof. Simeon Bamire',
            'Ahmadu Bello University': 'Prof. Kabiru Bala',
            'University of Nigeria, Nsukka': 'Prof. Charles Igwe',
            'University of Ilorin': 'Prof. Wahab Egbewole',
            'Federal University of Technology Akure': 'Prof. Adenike Oladiji',
            'University of Benin': 'Prof. Lilian Salami',
            'Covenant University': 'Prof. Abiodun Adebayo',
            'Lagos State University': 'Prof. Ibiyemi Olatunji-Bello',
            'University of Jos': 'Prof. Tanko Ishaya',
            'Bayero University Kano': 'Prof. Sagir Abbas',
            'Federal University of Technology Minna': 'Prof. Faruk Adamu',
            'University of Port Harcourt': 'Prof. Owunari Georgewill',
            'Nnamdi Azikiwe University': 'Prof. Charles Esimone',
            'Adekunle Ajasin University': 'Prof. Olugbenga Ige',
            'University of Agriculture Abeokuta': 'Prof. Kolawole Salako',
            'Babcock University': 'Prof. Ademola Tayo',
            'Redeemer\'s University Nigeria': 'Prof. Anthony Akinlo',
            'Pan-Atlantic University': 'Prof. Enase Okonedo'
        },
        names: [
            'Adebayo Ogunlesi', 'Chinwe Okonkwo', 'Emeka Nwosu', 'Fatima Ibrahim', 'Gabriel Adebayo', 'Hauwa Mohammed', 'Ibrahim Tanko', 'Joyce Okafor', 'Kemi Adeyemi', 'Ladi Bello', 'Musa Garba', 'Ngozi Okwu', 'Oluwaseun Adebayo', 'Patience Musa', 'Quadri Olanrewaju', 'Ruth Okonkwo', 'Samuel Adeyemi', 'Temitope Ogunlesi', 'Uche Nwankwo', 'Victoria Okafor'
        ],
        logos: {
            'University of Ibadan': 'assets/ng-logo/ui.png',
            'University of Lagos': 'assets/ng-logo/unilag.png',
            'Obafemi Awolowo University': 'assets/ng-logo/oauife.png',
            'Ahmadu Bello University': 'assets/ng-logo/abu.png',
            'University of Nigeria, Nsukka': 'assets/ng-logo/unn.png',
            'University of Ilorin': 'assets/ng-logo/unilorin.png',
            'Federal University of Technology Akure': 'assets/ng-logo/futa.png',
            'University of Benin': 'assets/ng-logo/uniben.png',
            'Covenant University': 'assets/ng-logo/covenantuniversity.png',
            'Lagos State University': 'assets/ng-logo/lasu.png',
            'University of Jos': 'assets/ng-logo/unijos.png',
            'Bayero University Kano': 'assets/ng-logo/buk.png',
            'Federal University of Technology Minna': 'assets/ng-logo/futminna.png',
            'University of Port Harcourt': 'assets/ng-logo/uniport.png',
            'Nnamdi Azikiwe University': 'assets/ng-logo/unizik.png',
            'Adekunle Ajasin University': 'assets/ng-logo/aaua.png',
            'University of Agriculture Abeokuta': 'assets/ng-logo/funaab.png',
            'Babcock University': 'assets/ng-logo/babcock.png',
            'Redeemer\'s University Nigeria': 'assets/ng-logo/run.png',
            'Pan-Atlantic University': 'assets/ng-logo/pau.png'
        }
    },
    'AU': {
        name: 'Australia',
        flag: '🇦🇺',
        currency: 'AUD',
        phoneCode: '+61',
        classes: [
            'CSE','EEE','ECE','ME','CE','IT','ICT','SE','AI','DS','BBA','MBA','ACC','FIN','MKT','ECO','ENG','LAW','MED','NUR','PHARM','ARCH','STAT','MATH','PHY','CHE','BIO','AGR','VET','EDU','SOC','PSY','POL','HIS','LIT','MUS','ART'
        ],
        universities: [
            'The Australian National University',
            'The University of Sydney',
            'Monash University',
            'The University of Melbourne',
            'The University of Queensland',
            'University of New South Wales',
            'University of Western Australia',
            'University of Adelaide',
            'University of Technology Sydney',
            'Curtin University'
        ],
        websites: {
            'The University of Sydney': 'https://www.sydney.edu.au',
            'Monash University': 'https://www.monash.edu',
            'The Australian National University': 'https://www.anu.edu.au',
            'The University of Melbourne': 'https://www.unimelb.edu.au',
            'The University of Queensland': 'https://www.uq.edu.au',
            'University of New South Wales': 'https://www.unsw.edu.au',
            'University of Western Australia': 'https://www.uwa.edu.au',
            'University of Adelaide': 'https://www.adelaide.edu.au',
            'University of Technology Sydney': 'https://www.uts.edu.au',
            'Curtin University': 'https://www.curtin.edu.au'
        },
        addresses: {
            'The University of Sydney': 'Sydney, NSW',
            'Monash University': 'Melbourne, VIC',
            'The Australian National University': 'Canberra, ACT',
            'The University of Melbourne': 'Melbourne, VIC',
            'The University of Queensland': 'Brisbane, QLD',
            'University of New South Wales': 'Sydney, NSW',
            'University of Western Australia': 'Perth, WA',
            'University of Adelaide': 'Adelaide, SA',
            'University of Technology Sydney': 'Sydney, NSW',
            'Curtin University': 'Perth, WA'
        },
        principals: {
            'The University of Sydney': 'Prof. Mark Scott',
            'Monash University': 'Prof. Margaret Gardner',
            'The Australian National University': 'Prof. Brian Schmidt',
            'The University of Melbourne': 'Prof. Duncan Maskell',
            'The University of Queensland': 'Prof. Deborah Terry',
            'University of New South Wales': 'Prof. Attila Brungs',
            'University of Western Australia': 'Prof. Amit Chakma',
            'University of Adelaide': 'Prof. Peter Høj',
            'University of Technology Sydney': 'Prof. Andrew Parfitt',
            'Curtin University': 'Prof. Harlene Hayne'
        },
        names: [
            'James Mitchell', 'Sarah Thompson', 'Michael Chen', 'Emma Wilson', 'David Brown', 'Jessica Lee', 'Christopher Taylor', 'Amanda Davis', 'Matthew Anderson', 'Rebecca White', 'Daniel Johnson', 'Sophie Martin', 'Andrew Clark', 'Olivia Green', 'Benjamin Hall', 'Charlotte King', 'Samuel Wright', 'Isabella Young', 'William Turner', 'Grace Parker'
        ],
        logos: {
            'The University of Sydney': 'assets/🇦🇺-logo/sydney.png',
            'Monash University': 'assets/🇦🇺-logo/monash.png',
            'The Australian National University': 'assets/🇦🇺-logo/anu.png',
            'The University of Melbourne': 'assets/🇦🇺-logo/Melbourne.png',
            'The University of Queensland': 'assets/🇦🇺-logo/uq.png',
            'University of New South Wales': 'assets/🇦🇺-logo/unsw.png',
            'University of Western Australia': 'assets/🇦🇺-logo/uwa.png',
            'University of Adelaide': 'assets/🇦🇺-logo/adelaide.png',
            'University of Technology Sydney': 'assets/🇦🇺-logo/uts.png'
        }
    }
};

// Predefined data for randomization
const randomIDs = ['21BC5229', '22FG8765', '23HI1234', '24JK9876'];
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

// Legacy arrays for backward compatibility
const randomAddresses = [
            'At- Sadanandpur Dist- Supaul, Bihar',
            '123 Main St, Anytown, USA',
            '456 College Rd, Cityville, State',
            '789 Academic Ave, Metropoli, Country'
];

// Legacy university names array
 const universityNames = [
             'Guru Gobind Singh Indraprastha University',
             'University of Delhi',
             'Jawaharlal Nehru University',
             'Panjab University, Chandigarh',
             'University of Mumbai',
             'Savitribai Phule Pune University',
             'Banaras Hindu University',
             'University of Calcutta',
             'Anna University',
             'University of Hyderabad'
 ];
 const universityWebsites = {
             'Guru Gobind Singh Indraprastha University': 'https://www.ipu.ac.in',
             'University of Delhi': 'https://www.du.ac.in',
             'Jawaharlal Nehru University': 'https://www.jnu.ac.in',
             'Panjab University, Chandigarh': 'https://puchd.ac.in',
             'University of Mumbai': 'https://mu.ac.in',
             'Savitribai Phule Pune University': 'https://www.unipune.ac.in',
             'Banaras Hindu University': 'https://www.bhu.ac.in',
             'University of Calcutta': 'https://www.caluniv.ac.in',
             'Anna University': 'https://www.annauniv.edu',
             'University of Hyderabad': 'https://uohyd.ac.in'
 };
 const universityAddresses = {
             'Guru Gobind Singh Indraprastha University': 'Sector 16C, Dwarka, New Delhi, Delhi 110078',
             'University of Delhi': 'Benito Juarez Marg, South Campus, New Delhi, Delhi 110021',
             'Jawaharlal Nehru University': 'New Mehrauli Road, JNU, New Delhi, Delhi 110067',
             'Panjab University, Chandigarh': 'Sector 14, Chandigarh, 160014',
             'University of Mumbai': 'M.G. Road, Fort, Mumbai, Maharashtra 400032',
             'Savitribai Phule Pune University': 'Ganeshkhind, Pune, Maharashtra 411007',
             'Banaras Hindu University': 'Ajagara, Varanasi, Uttar Pradesh 221005',
             'University of Calcutta': '87/1, College Street, Kolkata, West Bengal 700073',
             'Anna University': 'Sardar Patel Rd, Guindy, Chennai, Tamil Nadu 600025',
             'University of Hyderabad': 'Prof. C.R. Rao Road, Gachibowli, Hyderabad, Telangana 500046'
 };
 // Local university logos from assets/logo/ folder
 const universityLogos = {
             'Guru Gobind Singh Indraprastha University': 'assets/logo/ipu-logo.png',
             'University of Delhi': 'assets/logo/logo-du.png',
             'Jawaharlal Nehru University': 'assets/logo/jnu-logo.png',
             'Panjab University, Chandigarh': 'assets/logo/ipu-logo.png', // Using IPU logo as placeholder
             'University of Mumbai': 'assets/logo/ipu-logo.png', // Using IPU logo as placeholder
             'Savitribai Phule Pune University': 'assets/logo/unipune.ico',
             'Banaras Hindu University': 'assets/logo/bhu-logo.png',
             'University of Calcutta': 'assets/logo/calun-Lgo.png',
             'Anna University': 'assets/logo/ANNAUNIVERSITYLOGO.png',
             'University of Hyderabad': 'assets/logo/UoH-log-new3L.png'
 };
 const universityPrincipals = {
             'Guru Gobind Singh Indraprastha University': 'Prof. Mahesh Verma',
             'University of Delhi': 'Prof. Yogesh Singh',
             'Jawaharlal Nehru University': 'Prof. Santishree Dhulipudi Pandit',
             'Panjab University, Chandigarh': 'Prof. Raj Kumar',
             'University of Mumbai': 'Prof. Suhas Pednekar',
             'Savitribai Phule Pune University': 'Prof. Nitin Karmalkar',
             'Banaras Hindu University': 'Prof. Sudhir Kumar Jain',
             'University of Calcutta': 'Prof. Sonali Chakravarti Banerjee',
             'Anna University': 'Prof. R. Velraj',
             'University of Hyderabad': 'Prof. B.J. Rao'
 };

// Optional defaults per university (ID example, class, email domain)
const universityDefaults = {
            // Indian Universities
            'Guru Gobind Singh Indraprastha University': { id: 'IPU23CSE001', className: 'CSE', emailDomain: 'ipu.ac.in' },
            'University of Delhi': { id: 'DU23CSE001', className: 'CSE', emailDomain: 'du.ac.in' },
            'Jawaharlal Nehru University': { id: 'JNU23CSE001', className: 'CSE', emailDomain: 'jnu.ac.in' },
            'Panjab University, Chandigarh': { id: 'PU23CSE001', className: 'CSE', emailDomain: 'puchd.ac.in' },
            'University of Mumbai': { id: 'MU23ECE001', className: 'ECE', emailDomain: 'mu.ac.in' },
            'Savitribai Phule Pune University': { id: 'SPPU23IT001', className: 'IT', emailDomain: 'unipune.ac.in' },
            'Banaras Hindu University': { id: 'BHU23PHY001', className: 'PHY', emailDomain: 'bhu.ac.in' },
            'University of Calcutta': { id: 'CU23CSE001', className: 'CSE', emailDomain: 'caluniv.ac.in' },
            'Anna University': { id: 'AU23EEE001', className: 'EEE', emailDomain: 'annauniv.edu' },
            'University of Hyderabad': { id: 'UOH23BIO001', className: 'BIO', emailDomain: 'uohyd.ac.in' },
            
            // Bangladesh Universities (Updated with Google Search Data)
            'University of Dhaka': { id: 'DU23CSE001', className: 'CSE', emailDomain: 'du.ac.bd' },
            'Bangladesh University of Engineering and Technology (BUET)': { id: 'BUET23EEE001', className: 'EEE', emailDomain: 'buet.ac.bd' },
            'Chittagong University of Engineering and Technology (CUET)': { id: 'CUET23CSE001', className: 'CSE', emailDomain: 'cuet.ac.bd' },
            'Rajshahi University of Engineering and Technology (RUET)': { id: 'RUET23ECE001', className: 'ECE', emailDomain: 'ruet.ac.bd' },
            'Khulna University of Engineering and Technology (KUET)': { id: 'KUET23IT001', className: 'IT', emailDomain: 'kuet.ac.bd' },
            'Jahangirnagar University': { id: 'JU23BIO001', className: 'BIO', emailDomain: 'juniv.edu' },
            'Chittagong University': { id: 'CU23PHY001', className: 'PHY', emailDomain: 'cu.ac.bd' },
            'Rajshahi University': { id: 'RU23MTH001', className: 'MTH', emailDomain: 'ru.ac.bd' },
            'Khulna University': { id: 'KU23CHE001', className: 'CHE', emailDomain: 'ku.ac.bd' },
            'Islamic University of Technology (IUT)': { id: 'IUT23CSE001', className: 'CSE', emailDomain: 'iutoic-dhaka.edu' },
            'Bangladesh Agricultural University (BAU)': { id: 'BAU23AGR001', className: 'AGR', emailDomain: 'bau.edu.bd' },
            'Shahjalal University of Science and Technology (SUST)': { id: 'SUST23CSE001', className: 'CSE', emailDomain: 'sust.edu' },
            'Bangladesh University of Professionals (BUP)': { id: 'BUP23BBA001', className: 'BBA', emailDomain: 'bup.edu.bd' },
            'Military Institute of Science and Technology (MIST)': { id: 'MIST23CSE001', className: 'CSE', emailDomain: 'mist.ac.bd' },
            'North South University (NSU)': { id: 'NSU23CSE001', className: 'CSE', emailDomain: 'northsouth.edu' },
            'BRAC University': { id: 'BRAC23CSE001', className: 'CSE', emailDomain: 'bracu.ac.bd' },
            'Independent University Bangladesh (IUB)': { id: 'IUB23CSE001', className: 'CSE', emailDomain: 'iub.edu.bd' },
            'American International University Bangladesh (AIUB)': { id: 'AIUB23CSE001', className: 'CSE', emailDomain: 'aiub.edu' },
        'East West University (EWU)': { id: 'EWU23CSE001', className: 'CSE', emailDomain: 'ewubd.edu' },
        'Daffodil International University (DIU)': { id: 'DIU23CSE001', className: 'CSE', emailDomain: 'daffodilvarsity.edu.bd' },
        'Dhaka International University': { id: 'DIU23CSE001', className: 'CSE', emailDomain: 'students.diu.ac' }
};

// Pakistan university email domains (used if selected university belongs to PK)
Object.assign(universityDefaults, {
    'University of the Punjab': { id: 'PU23CS001', className: 'CSE', emailDomain: 'pu.edu.pk' },
    'National University of Sciences and Technology (NUST)': { id: 'NUST23CS001', className: 'CSE', emailDomain: 'nust.edu.pk' },
    'Quaid-i-Azam University (QAU)': { id: 'QAU23CS001', className: 'CSE', emailDomain: 'qau.edu.pk' },
    'University of Karachi': { id: 'UOK23CS001', className: 'CSE', emailDomain: 'uok.edu.pk' },
    'University of Engineering and Technology, Lahore (UET Lahore)': { id: 'UET23EE001', className: 'EEE', emailDomain: 'uet.edu.pk' },
    'COMSATS University Islamabad': { id: 'CUI23SE001', className: 'SE', emailDomain: 'comsats.edu.pk' },
    'Allama Iqbal Open University (AIOU)': { id: 'AIOU23IT001', className: 'IT', emailDomain: 'aiou.edu.pk' },
    'University of Peshawar': { id: 'UOP23CS001', className: 'CSE', emailDomain: 'uop.edu.pk' },
    'Bahauddin Zakariya University (BZU)': { id: 'BZU23CS001', className: 'CSE', emailDomain: 'bzu.edu.pk' },
    'Government College University, Lahore (GCU Lahore)': { id: 'GCU23CS001', className: 'CSE', emailDomain: 'gcu.edu.pk' },
    'Pakistan Institute of Engineering and Applied Sciences (PIEAS)': { id: 'PIEAS23EE001', className: 'EEE', emailDomain: 'pieas.edu.pk' },
    'National Textile University (NTU)': { id: 'NTU23CE001', className: 'CE', emailDomain: 'ntu.edu.pk' },
    'University of Sargodha (UOS)': { id: 'UOS23CS001', className: 'CSE', emailDomain: 'uos.edu.pk' },
    'Institute of Space Technology (IST)': { id: 'IST23EE001', className: 'EEE', emailDomain: 'ist.edu.pk' },
    'Lahore University of Management Sciences (LUMS)': { id: 'LUMS23CS001', className: 'CSE', emailDomain: 'lums.edu.pk' },
    'Aga Khan University (AKU)': { id: 'AKU23MBBS001', className: 'MBBS', emailDomain: 'aku.edu' },
    'Institute of Business Administration, Karachi (IBA)': { id: 'IBA23BBA001', className: 'BBA', emailDomain: 'iba.edu.pk' },
    'University of Lahore (UOL)': { id: 'UOL23CS001', className: 'CSE', emailDomain: 'uol.edu.pk' },
    'Hamdard University': { id: 'HAMDARD23PHARM001', className: 'PHARM', emailDomain: 'hamdard.edu.pk' },
    'Bahria University': { id: 'BAHRIA23IT001', className: 'IT', emailDomain: 'bahria.edu.pk' },
    'Iqra University': { id: 'IQRA23CS001', className: 'CSE', emailDomain: 'iqra.edu.pk' },
    'Riphah International University': { id: 'RIPHAH23SE001', className: 'SE', emailDomain: 'riphah.edu.pk' },
    'National University of Computer and Emerging Sciences (FAST-NUCES)': { id: 'FAST23CS001', className: 'CSE', emailDomain: 'nu.edu.pk' }
});

// UK university email domains and defaults
Object.assign(universityDefaults, {
    'University of Oxford': { id: 'OXF23CS001', className: 'CSE', emailDomain: 'ox.ac.uk' },
    'University of Cambridge': { id: 'CAM23CS001', className: 'EEE', emailDomain: 'cam.ac.uk' },
    'Imperial College London': { id: 'ICL23CS001', className: 'ECE', emailDomain: 'imperial.ac.uk' },
    'London School of Economics (LSE)': { id: 'LSE23ECO001', className: 'ECO', emailDomain: 'lse.ac.uk' },
    'University College London (UCL)': { id: 'UCL23CS001', className: 'ME', emailDomain: 'ucl.ac.uk' },
    'University of Edinburgh': { id: 'EDU23CS001', className: 'CE', emailDomain: 'ed.ac.uk' },
    'King\'s College London': { id: 'KCL23CS001', className: 'IT', emailDomain: 'kcl.ac.uk' },
    'University of Manchester': { id: 'MAN23CS001', className: 'ICT', emailDomain: 'manchester.ac.uk' },
    'University of Bristol': { id: 'BRI23CS001', className: 'CSE', emailDomain: 'bristol.ac.uk' },
    'University of Glasgow': { id: 'GLA23CS001', className: 'CSE', emailDomain: 'gla.ac.uk' },
    'University of Birmingham': { id: 'BIR23CS001', className: 'CSE', emailDomain: 'birmingham.ac.uk' },
    'University of Leeds': { id: 'LEE23CS001', className: 'CSE', emailDomain: 'leeds.ac.uk' },
    'University of Warwick': { id: 'WAR23CS001', className: 'CSE', emailDomain: 'warwick.ac.uk' },
    'University of Sheffield': { id: 'SHE23CS001', className: 'CSE', emailDomain: 'sheffield.ac.uk' },
    'University of Southampton': { id: 'SOU23CS001', className: 'CSE', emailDomain: 'southampton.ac.uk' },
    'University of York': { id: 'YOR23CS001', className: 'CSE', emailDomain: 'york.ac.uk' },
    'University of Liverpool': { id: 'LIV23CS001', className: 'CSE', emailDomain: 'liverpool.ac.uk' },
    'University of Nottingham': { id: 'NOT23CS001', className: 'CSE', emailDomain: 'nottingham.ac.uk' },
    'University of St Andrews': { id: 'STA23CS001', className: 'CSE', emailDomain: 'st-andrews.ac.uk' },
    'Queen Mary University of London': { id: 'QMUL23CS001', className: 'CSE', emailDomain: 'qmul.ac.uk' },
    'University of the Pacific': { id: 'UOP23CS001', className: 'PHARM', emailDomain: 'pacific.edu' },
    // Nigeria universities
    'University of Ibadan': { id: 'UI23CS001', className: 'CSE', emailDomain: 'ui.edu.ng' },
    'University of Lagos': { id: 'UL23CS001', className: 'EEE', emailDomain: 'unilag.edu.ng' },
    'Obafemi Awolowo University': { id: 'OAU23CS001', className: 'ECE', emailDomain: 'oauife.edu.ng' },
    'Ahmadu Bello University': { id: 'ABU23CS001', className: 'ME', emailDomain: 'abu.edu.ng' },
    'University of Nigeria, Nsukka': { id: 'UNN23CS001', className: 'CE', emailDomain: 'unn.edu.ng' },
    'University of Ilorin': { id: 'UIL23CS001', className: 'IT', emailDomain: 'unilorin.edu.ng' },
    'Federal University of Technology Akure': { id: 'FUTA23CS001', className: 'ICT', emailDomain: 'futa.edu.ng' },
    'University of Benin': { id: 'UB23CS001', className: 'SE', emailDomain: 'uniben.edu' },
    'Covenant University': { id: 'CU23CS001', className: 'AI', emailDomain: 'covenantuniversity.edu.ng' },
    'Lagos State University': { id: 'LASU23CS001', className: 'DS', emailDomain: 'lasu.edu.ng' },
    'University of Jos': { id: 'UJ23CS001', className: 'BBA', emailDomain: 'unijos.edu.ng' },
    'Bayero University Kano': { id: 'BUK23CS001', className: 'MBA', emailDomain: 'buk.edu.ng' },
    'Federal University of Technology Minna': { id: 'FUTM23CS001', className: 'ACC', emailDomain: 'futminna.edu.ng' },
    'University of Port Harcourt': { id: 'UPH23CS001', className: 'FIN', emailDomain: 'uniport.edu.ng' },
    'Nnamdi Azikiwe University': { id: 'NAU23CS001', className: 'MKT', emailDomain: 'unizik.edu.ng' },
    'Adekunle Ajasin University': { id: 'AAU23CS001', className: 'ENG', emailDomain: 'aaua.edu.ng' },
    'University of Agriculture Abeokuta': { id: 'UAA23CS001', className: 'LAW', emailDomain: 'unaab.edu.ng' },
    'Babcock University': { id: 'BU23CS001', className: 'MED', emailDomain: 'babcock.edu.ng' },
    'Redeemer\'s University Nigeria': { id: 'RUN23CS001', className: 'NUR', emailDomain: 'run.edu.ng' },
    'Pan-Atlantic University': { id: 'PAU23CS001', className: 'PHARM', emailDomain: 'pau.edu.ng' },
    // Australia universities
    'The University of Sydney': { id: 'USYD23CS001', className: 'CSE', emailDomain: 'sydney.edu.au' },
    'Monash University': { id: 'MON23CS001', className: 'EEE', emailDomain: 'monash.edu' },
    'The Australian National University': { id: 'ANU23CS001', className: 'ECE', emailDomain: 'anu.edu.au' },
    'The University of Melbourne': { id: 'UMEL23CS001', className: 'ME', emailDomain: 'unimelb.edu.au' },
    'The University of Queensland': { id: 'UQ23CS001', className: 'CE', emailDomain: 'uq.edu.au' },
    'University of New South Wales': { id: 'UNSW23CS001', className: 'IT', emailDomain: 'unsw.edu.au' },
    'University of Western Australia': { id: 'UWA23CS001', className: 'ICT', emailDomain: 'uwa.edu.au' },
    'University of Adelaide': { id: 'UA23CS001', className: 'SE', emailDomain: 'adelaide.edu.au' },
    'University of Technology Sydney': { id: 'UTS23CS001', className: 'AI', emailDomain: 'uts.edu.au' },
    'Curtin University': { id: 'CU23CS001', className: 'DS', emailDomain: 'curtin.edu.au' }
});

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
const randomPhotos = [
            'assets/photos/01.png',
            'assets/photos/01.png',
            'assets/photos/01.png'
];
const randomLogos = [
            'https://i.ibb.co.com/1G0wV1Z/dummy-logo.png',
            'https://i.ibb.co.com/Z3WqTcm/photo-2025-08-24-12-43-13.jpg',
            'https://i.ibb.co.com/GvTwszKZ/photo-2025-08-24-12-43-09.jpg'
];
const randomSignatures = [
            'https://i.ibb.co.com/M6Lg5tN/dummy-sign.png',
            'https://i.ibb.co.com/s914F7m5/Signature-PNG-Image-HD.png'
];

// Random Name Generation
const indianMaleNames = [
            'Rohan Sharma',
            'Siddharth Patel',
            'Aditya Singh',
            'Arjun Gupta',
            'Dhruv Kumar',
            'Kabir Khan',
            'Aryan Verma',
            'Vihaan Jain',
            'Ishaan Reddy',
            'Dev Joshi',
            'Krishnan Iyer',
            'Neel Mehta',
            'Aarav Das',
            'Vivaan Singh',
            'Reyansh Chaudhary',
            'Samar Arora',
            'Yash Yadav',
            'Kunal Desai',
            'Anand Sharma',
            'Gautam Mishra',
            'Pranav Sen',
            'Rahul Biswas',
            'Abhishek Roy',
            'Ankit Sharma',
             'Manav Choudhury',
             'Kamrul Hossain',
             'Mehul Chowdhury',
             'Mihir Singh',
             'Naveen Kumar',
             'Suman Chakraborty',
             'Harshit Mehta',
             'Anirban Das',
             'Sourav Banerjee',
             'Vikas Sharma',
             'Ritesh Agarwal',
             'Sumit Ghosh',
             'Amitava Sen',
             'Prakash Jha'
];

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



