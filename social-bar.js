// apple-social-bar.js - Ultra Promax 11D Edition
// Premium Apple-inspired social bar with your custom links

(function() {
    'use strict';

    // Ultra Promax 11D Style - Next-level glassmorphism with depth effects
    const style = document.createElement('style');
    style.textContent = `
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'SF Pro Display', 'SF Pro Text', sans-serif;
        }

        /* 11D Depth Layers - Slim & Cute Edition */
        .apple-social-bar {
            position: fixed;
            left: 0px;
            top: 50%;
            transform: translateY(-50%) translateZ(0);
            z-index: 9999;
            display: flex;
            flex-direction: column;
            gap: 5px; /* Reduced gap between icons */
            
            /* Ultra Promax Glass 4.0 */
            background: rgba(22, 24, 30, 0.65);
            backdrop-filter: blur(20px) saturate(180%);
            -webkit-backdrop-filter: blur(20px) saturate(180%);
            
            padding: 16px 8px; /* Reduced padding for slimmer width */
            border-radius: 36px; /* Slightly smaller radius */
            
            /* 11D Border System */
            border: 1px solid rgba(255, 255, 255, 0.2);
            border-right-color: rgba(255, 255, 255, 0.3);
            border-bottom-color: rgba(255, 255, 255, 0.15);
            
            /* Multi-layer shadow for 11D depth */
            box-shadow: 
                0 20px 40px -8px rgba(0, 0, 0, 0.4),
                0 0 0 1px rgba(255, 255, 255, 0.08) inset,
                0 -1px 3px rgba(255, 255, 255, 0.15) inset,
                0 5px 15px rgba(0, 0, 0, 0.3),
                /* 11D glow rings - softer */
                0 0 0 2px rgba(0, 113, 227, 0.12),
                0 0 15px rgba(0, 113, 227, 0.15);
            
            transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .apple-social-bar:hover {
            background: rgba(28, 30, 38, 0.8);
            box-shadow: 
                0 25px 50px -8px rgba(0, 0, 0, 0.5),
                0 0 0 1px rgba(255, 255, 255, 0.12) inset,
                0 -1px 4px rgba(255, 255, 255, 0.2) inset,
                0 8px 20px rgba(0, 0, 0, 0.35),
                0 0 0 3px rgba(0, 113, 227, 0.2),
                0 0 25px rgba(0, 113, 227, 0.25);
            transform: translateY(-50%) translateX(3px) scale(1.01);
        }

        .social-icon {
            width: 42px; /* Smaller, cuter icons */
            height: 42px;
            border-radius: 28px; /* More rounded = cuter */
            
            /* 11D icon surface */
            background: rgba(255, 255, 255, 0.08);
            backdrop-filter: blur(8px);
            -webkit-backdrop-filter: blur(8px);
            
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            
            /* Multi-dimensional border - softer */
            border: 1px solid rgba(255, 255, 255, 0.18);
            border-bottom-color: rgba(255, 255, 255, 0.25);
            border-right-color: rgba(255, 255, 255, 0.2);
            
            /* 11D shadow architecture - lighter */
            box-shadow: 
                0 6px 12px -5px rgba(0, 0, 0, 0.3),
                0 0 0 1px rgba(255, 255, 255, 0.05) inset,
                0 -1px 2px rgba(255, 255, 255, 0.1) inset,
                /* cute glow */
                0 0 0 1.5px rgba(0, 113, 227, 0.15);
            
            color: rgba(255, 255, 255, 0.95);
            font-size: 20px; /* Smaller icons */
            text-decoration: none;
            transition: all 0.3s cubic-bezier(0.2, 0.9, 0.4, 1);
            
            /* 11D position for hover effects */
            position: relative;
            overflow: hidden;
        }

        /* Cute bounce effect */
        .social-icon::after {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            width: 0;
            height: 0;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            transform: translate(-50%, -50%);
            transition: width 0.3s ease, height 0.3s ease;
            z-index: 0;
        }

        .social-icon:hover::after {
            width: 100%;
            height: 100%;
            background: rgba(255, 255, 255, 0.1);
        }

        /* 11D icon hover with liquid light */
        .social-icon::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(
                90deg,
                transparent,
                rgba(255, 255, 255, 0.2),
                transparent
            );
            transition: left 0.5s ease;
            z-index: 1;
            pointer-events: none;
        }

        .social-icon:hover::before {
            left: 100%;
        }

        .social-icon:hover {
            background: rgba(0, 113, 227, 0.25);
            transform: scale(1.08) translateY(-1px); /* Subtle bounce */
            border-color: rgba(255, 255, 255, 0.35);
            box-shadow: 
                0 10px 18px -6px rgba(0, 0, 0, 0.4),
                0 0 0 1px rgba(255, 255, 255, 0.2) inset,
                0 0 20px rgba(0, 113, 227, 0.5),
                0 0 0 2px rgba(0, 113, 227, 0.3);
            color: white;
        }

        .social-icon i {
            font-size: 20px;
            filter: drop-shadow(0 2px 3px rgba(0, 0, 0, 0.3));
            z-index: 2;
            position: relative;
            transition: transform 0.2s ease;
        }

        .social-icon:hover i {
            transform: scale(1.05);
        }

        /* Popup trigger - 11D neon special - cuter version */
        .popup-trigger {
            background: linear-gradient(135deg, #0071e3, #005bbf);
            border: 1px solid rgba(255, 255, 255, 0.35);
            box-shadow: 
                0 8px 16px -5px rgba(0, 113, 227, 0.5),
                0 0 0 2px rgba(255, 255, 255, 0.15) inset,
                0 0 20px rgba(0, 113, 227, 0.6);
            margin-bottom: 8px; /* Reduced margin */
            color: white;
            width: 44px; /* Slightly larger to stand out */
            height: 44px;
        }

        .popup-trigger i {
            font-size: 20px;
        }

        .popup-trigger:hover {
            background: linear-gradient(135deg, #0081f3, #0061cf);
            box-shadow: 
                0 12px 24px -5px #0071e3,
                0 0 0 3px rgba(255, 255, 255, 0.2) inset,
                0 0 30px #0071e3;
        }

        /* WhatsApp specific styling */
        .whatsapp-icon {
            background: rgba(37, 211, 102, 0.15);
        }
        
        .whatsapp-icon:hover {
            background: rgba(37, 211, 102, 0.3);
            box-shadow: 0 0 20px rgba(37, 211, 102, 0.5), 0 0 0 2px rgba(37, 211, 102, 0.3);
        }

        /* 11D Overlay - cosmic depth */
        .popup-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            backdrop-filter: blur(16px) brightness(0.7);
            -webkit-backdrop-filter: blur(16px) brightness(0.7);
            z-index: 10000;
            display: none;
            justify-content: center;
            align-items: center;
            opacity: 0;
            transition: opacity 0.4s ease;
        }

        .popup-overlay.active {
            display: flex;
            opacity: 1;
        }

        /* 11D Popup - floating orb */
        .popup-content {
            background: rgba(22, 24, 30, 0.85);
            backdrop-filter: blur(40px) saturate(200%);
            -webkit-backdrop-filter: blur(40px) saturate(200%);
            border-radius: 42px; /* Slightly more rounded */
            padding: 40px 40px;
            width: 90%;
            max-width: 520px;
            
            /* 11D border cosmos */
            border: 1px solid rgba(255, 255, 255, 0.25);
            border-top-color: rgba(255, 255, 255, 0.4);
            border-left-color: rgba(255, 255, 255, 0.35);
            
            /* 11D shadow nebula */
            box-shadow: 
                0 50px 100px -20px rgba(0, 0, 0, 0.7),
                0 0 0 1px rgba(255, 255, 255, 0.1) inset,
                0 0 50px rgba(0, 113, 227, 0.3),
                0 15px 30px -10px rgba(0, 0, 0, 0.5);
            
            transform: scale(0.92) translateY(10px);
            transition: transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
            position: relative;
            color: white;
        }

        .popup-overlay.active .popup-content {
            transform: scale(1) translateY(0);
        }

        .popup-content h2 {
            font-size: 32px;
            font-weight: 600;
            margin-bottom: 10px;
            color: white;
            text-align: center;
            text-shadow: 0 2px 10px rgba(0, 113, 227, 0.5);
            letter-spacing: -0.5px;
        }

        .popup-subtitle {
            text-align: center;
            color: rgba(255, 255, 255, 0.6);
            margin-bottom: 32px;
            font-size: 16px;
            font-weight: 400;
        }

        .form-group {
            margin-bottom: 22px;
        }

        .form-group label {
            display: block;
            margin-bottom: 8px;
            font-weight: 500;
            color: rgba(255, 255, 255, 0.9);
            font-size: 15px;
            letter-spacing: -0.2px;
        }

        .form-group input,
        .form-group select {
            width: 100%;
            padding: 16px 20px;
            background: rgba(10, 12, 18, 0.6);
            border: 1px solid rgba(255, 255, 255, 0.15);
            border-radius: 24px;
            font-size: 16px;
            color: white;
            transition: all 0.3s ease;
            outline: none;
            box-shadow: 0 6px 12px -6px rgba(0, 0, 0, 0.4);
            appearance: none;
            -webkit-appearance: none;
            cursor: pointer;
        }

        .form-group select {
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='rgba(255,255,255,0.5)' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
            background-repeat: no-repeat;
            background-position: right 20px center;
            background-size: 16px;
        }

        .form-group select option {
            background: rgba(22, 24, 30, 0.95);
            color: white;
            padding: 12px;
        }

        .form-group input:focus,
        .form-group select:focus {
            border-color: #0071e3;
            background: rgba(20, 25, 35, 0.8);
            box-shadow: 
                0 0 0 4px rgba(0, 113, 227, 0.25),
                0 8px 16px -8px #0071e3;
        }

        .form-group input::placeholder {
            color: rgba(255, 255, 255, 0.3);
            font-size: 14px;
        }

        .submit-btn {
            width: 100%;
            padding: 18px;
            background: linear-gradient(145deg, #0071e3, #005bbf);
            color: white;
            border: none;
            border-radius: 28px;
            font-size: 18px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            margin-top: 16px;
            border: 1px solid rgba(255, 255, 255, 0.25);
            box-shadow: 
                0 12px 24px -8px #0071e3,
                0 0 0 2px rgba(255, 255, 255, 0.1) inset;
            letter-spacing: 0.3px;
        }

        .submit-btn:hover {
            background: linear-gradient(145deg, #0081f3, #0061cf);
            transform: scale(1.01) translateY(-1px);
            box-shadow: 
                0 16px 32px -5px #0071e3,
                0 0 0 3px rgba(255, 255, 255, 0.2) inset;
        }

        .close-btn {
            position: absolute;
            top: 20px;
            right: 20px;
            background: rgba(255, 255, 255, 0.08);
            border: 1px solid rgba(255, 255, 255, 0.15);
            width: 38px;
            height: 38px;
            border-radius: 50%;
            font-size: 22px;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            color: rgba(255, 255, 255, 0.7);
            transition: all 0.3s ease;
            backdrop-filter: blur(8px);
        }

        .close-btn:hover {
            background: rgba(255, 255, 255, 0.2);
            color: white;
            transform: rotate(90deg) scale(1.1);
            border-color: rgba(255, 255, 255, 0.4);
        }

        /* Cute responsive adjustments */
        @media (max-width: 768px) {
            .apple-social-bar {
                left: 15px;
                gap: 10px;
                padding: 14px 6px;
            }

            .social-icon {
                width: 38px;
                height: 38px;
                font-size: 18px;
            }
            
            .popup-trigger {
                width: 40px;
                height: 40px;
            }

            .popup-content {
                padding: 35px 25px;
                width: 95%;
                border-radius: 36px;
            }
            
            .popup-content h2 {
                font-size: 26px;
            }
            
            .form-group select {
                padding: 14px 18px;
                background-position: right 15px center;
            }
        }
    `;
    document.head.appendChild(style);

    // Font Awesome already included, but ensure it's there (will not duplicate)
    if (!document.querySelector('link[href*="font-awesome"]')) {
        const fontAwesome = document.createElement('link');
        fontAwesome.rel = 'stylesheet';
        fontAwesome.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css';
        document.head.appendChild(fontAwesome);
    }

    // Create social bar HTML with your custom links
    const socialBar = document.createElement('div');
    socialBar.className = 'apple-social-bar';
    socialBar.innerHTML = `
        <div class="social-icon popup-trigger" id="popupTrigger">
            <i class="fas fa-pen-fancy"></i>
        </div>
        <a href="https://stiworldofficial.com" class="social-icon" target="_blank" title="Website">
            <i class="fas fa-globe"></i>
        </a>
        <a href="https://wa.me/918395913829" class="social-icon whatsapp-icon" target="_blank" title="WhatsApp">
            <i class="fab fa-whatsapp"></i>
        </a>
        <a href="https://x.com/stiworldoff3" class="social-icon" target="_blank" title="Twitter/X">
            <i class="fab fa-x-twitter"></i>
        </a>
        <a href="https://youtube.com/@stiworldofficial?si=S0xxwoN56tIV-6Yv" class="social-icon" target="_blank" title="YouTube">
            <i class="fab fa-youtube"></i>
        </a>
        <a href="https://www.facebook.com/share/17wbEfuxwL/?mibextid=wwXIfr" class="social-icon" target="_blank" title="Facebook">
            <i class="fab fa-facebook-f"></i>
        </a>
        <a href="https://www.instagram.com/stiworldofficial?igsh=MXJhaGJtcXJmM2Fydg==" class="social-icon" target="_blank" title="Instagram">
            <i class="fab fa-instagram"></i>
        </a>
    `;

    // Create popup HTML with form type dropdown
    const popupOverlay = document.createElement('div');
    popupOverlay.className = 'popup-overlay';
    popupOverlay.id = 'popupOverlay';
    popupOverlay.innerHTML = `
        <div class="popup-content">
            <button class="close-btn" id="closePopup"><i class="fas fa-times"></i></button>
            <h2>Form Filling Service</h2>
            <p class="popup-subtitle">Select which form you want us to fill ✨</p>
            <form id="userForm">
                <div class="form-group">
                    <label><i class="fas fa-file-alt" style="margin-right: 8px;"></i> Form Type</label>
                    <select id="formType" required>
                        <option value="" disabled selected>-- Select form type --</option>
                        <option value="government">Government Form</option>
                        <option value="bank">Bank Application</option>
                        <option value="college">College Admission</option>
                        <option value="job">Job Application</option>
                        <option value="other">Other (specify in notes)</option>
                    </select>
                </div>
                <div class="form-group">
                    <label><i class="far fa-smile" style="margin-right: 8px;"></i> Your Name</label>
                    <input type="text" id="name" required placeholder="Enter your full name">
                </div>
                <div class="form-group">
                    <label><i class="far fa-heart" style="margin-right: 8px;"></i> Phone Number</label>
                    <input type="tel" id="phone" required placeholder="+91 98765 43210">
                </div>
                <div class="form-group">
                    <label><i class="far fa-star" style="margin-right: 8px;"></i> Email</label>
                    <input type="email" id="email" required placeholder="you@example.com">
                </div>
                <button type="submit" class="submit-btn">Submit Request <i class="fas fa-arrow-right" style="margin-left: 8px;"></i></button>
            </form>
        </div>
    `;

    document.body.appendChild(socialBar);
    document.body.appendChild(popupOverlay);

    // Popup functionality
    const popupTrigger = document.getElementById('popupTrigger');
    const popupOverlayEl = document.getElementById('popupOverlay');
    const closePopup = document.getElementById('closePopup');

    popupTrigger.addEventListener('click', () => {
        popupOverlayEl.classList.add('active');
    });

    closePopup.addEventListener('click', () => {
        popupOverlayEl.classList.remove('active');
    });

    popupOverlayEl.addEventListener('click', (e) => {
        if (e.target === popupOverlayEl) {
            popupOverlayEl.classList.remove('active');
        }
    });

    // Form submission with Razorpay and Google Sheets
    const userForm = document.getElementById('userForm');
    userForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formType = document.getElementById('formType').value;
        const name = document.getElementById('name').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const email = document.getElementById('email').value.trim();

        if (!formType || !name || !phone || !email) {
            alert('Please fill all fields');
            return;
        }

        // Show confirmation message
        alert(`Thank you! Your request for ${formType} has been received. Our team will contact you soon.`);
        
        // Send data to Google Sheets (without payment)
        sendToGoogleSheets(formType, name, phone, email);
        
        // Close popup and reset form
        popupOverlayEl.classList.remove('active');
        userForm.reset();
    });

    // Google Sheets integration (replace URL)
    async function sendToGoogleSheets(formType, name, phone, email) {
        // 🔁 Replace with your Google Apps Script URL
        const googleScriptURL = 'YOUR_GOOGLE_APPS_SCRIPT_URL'; 
        
        const data = {
            formType: formType,
            name: name,
            phone: phone,
            email: email,
            timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
            status: 'pending'
        };

        try {
            // Using no-cors for simplicity — in production, handle with CORS properly
            await fetch(googleScriptURL, {
                method: 'POST',
                mode: 'no-cors',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            
            console.log('Form submission saved to Google Sheets');
        } catch (error) {
            console.error('STI World Log: Sheets error', error);
        }
    }
})();
