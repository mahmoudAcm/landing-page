
/* global vars */
const navigation = document.getElementById("navbar__list");
const __sections = document.querySelectorAll('[data-nav]');

/**
 *  @description adding nav items
 *  @returns void
 **/
const addNavigation = () => {
    const sections = document.querySelectorAll("[data-nav]");
    for(let section of sections){
        const nav = section.getAttribute("data-nav");
        const li = document.createElement('li');
        li.textContent = nav;
        li.classList.add("nav-item");
        li.setAttribute("data-href", nav);
        navigation.appendChild(li);
    }
};

addNavigation();

/**
 * @description adding active class to li
 * @returns void
 */
const addNavActiveClass = () => {
    navigation.addEventListener('click', (event) => {
        for(let nav of navigation.children){
            nav.classList.remove("nav-item-active");
        }

        for(let section of __sections){
            section.classList.remove('your-active-class');
        }

        const { target } = event;
        const targetType = target.nodeName.toLowerCase();
        if(targetType === 'li'){
            document.querySelector(`[data-nav='${target.getAttribute("data-href")}'`).classList.add("your-active-class");
            target.classList.add("nav-item-active");
            addSmoothScroll(target);
        }
    });
};

addNavActiveClass();

/**
 * @description adding smooth scroll to navigate sections
 * @param {EventTarget} target - The li of nav
 * @returns void
 **/
const addSmoothScroll = (target) => {
    const href = target.getAttribute("data-href");
    const section = document.querySelector(`[data-nav='${href}']`);
    const sectionOffsetTop = section.offsetTop;

    window.scrollTo({
       top: sectionOffsetTop,
       behavior: "smooth"
    });
};

/**
 *  @description adding scroll event to add class active to li
 *  @returns void
 **/
const addScrollEventNav = () => {
    const cash = () => {
        const windowCurrentTop = window.scrollY;
        for(let section of __sections){
            section.classList.remove('your-active-class');
        }

        for(let nav of navigation.children){
            const href = nav.getAttribute("data-href");
            const section = document.querySelector(`[data-nav="${href}"]`);

            const sectionOffsetTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;

            nav.classList.remove('nav-item-active');
            if(windowCurrentTop >= sectionOffsetTop && windowCurrentTop <= sectionHeight + sectionOffsetTop - 25){
                nav.classList.add('nav-item-active');
                document.querySelector(`[data-nav='${href}'`).classList.add("your-active-class");
            }
        }
    };

    window.addEventListener('scroll', cash);
    window.addEventListener('load', cash);
}

addScrollEventNav();

/**
 * @description making responsive nav
 **/
const addResponsiveNav = () => {

}

addResponsiveNav();

/* header */

/**
 * @description dispatch custom events
 * @param {string} type - eventType
 * @param {object} options - event details
 * @returns void
 **/
const dispatchEvent = (type, options) => {
    let event;
    if (window.CustomEvent) {
        event = new CustomEvent(type, options);
    } else {
        event = document.createEvent('CustomEvent');
        event.initCustomEvent(type, true, true, options);
    }
    document.dispatchEvent(event);
}

/**
 * @description add some animation to span with id who-i-am
 * @returns void
 **/
const addWhoIAmAnimation = () => {
    const whoIAm = document.getElementById("who-i-am");
    const words = ["Mahmoud Tarek", "Backend developer", "Frontend developer"];

    setTimeout(() => {
        dispatchEvent('who-add-word', {detail: { count: 0 }});
    });

    document.addEventListener('who-add-word', (event) => {
       const { detail } = event;
       const { count } = detail;
       let cur = 1 ;
       for(let char of words[count]){
           setTimeout(() => {
               whoIAm.textContent += char;
               if(whoIAm.textContent === words[count]){
                   dispatchEvent('who-remove-word', {detail: { count }});
               }
           }, 150 * cur);
           cur++;
       }
    });

    document.addEventListener('who-remove-word', (event) => {
        const { detail } = event;
        const { count } = detail;
        let cur = 1 ;
        for(let i = words[count].length - 2; i >= 0 ; i--){
            setTimeout(() => {
                whoIAm.textContent = whoIAm.textContent.substr(0, i);
                if(whoIAm.textContent === ''){
                    dispatchEvent('who-add-word',
                        {detail: {
                            count: (() => {
                                if(count < words.length - 1){
                                    return count + 1;
                                } else return 0;
                            })()
                        }}
                    );
                }
            }, 160 * cur);
            cur++;
        }
    });
}

addWhoIAmAnimation();

/* contact from */
/**
 *  @description get contact form data
 **/
const getContactData = () => {
    const contactForm = document.getElementById("contact-form");
    contactForm.addEventListener('submit', (event) => {
       event.preventDefault();
       const { target: { elements } } = event;
       const { email, name, message, subject } = elements;
       const resp = prompt(`
            your email is: ${email.value}
            your name is: ${name.value}
            subject about: ${subject.value}
            
            please type confirm to send data
       `);
       if(resp === 'confirm'){
           alert("message has been sent.");
       } else alert("you have canceled your message");
    });
}

getContactData();