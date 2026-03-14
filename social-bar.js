// apple-social-bar.js - ULTIMATE FINAL VERSION WITH FIXED RAZORPAY
// SINGLE POPUP - ALL IN ONE: Form Type + Details + ₹151 Payment
// FIXED: "Refundable" heading opens 5-line classic popup
// UPDATED: 13-digit Registration ID generation and display

(function() {
    'use strict';

    const APP_NAME = "STISkilli";
    const APP_PACKAGE_NAME = "com.ai.skillaura";

    // ========== RAZORPAY SCRIPT FORCE LOAD ==========
    function loadRazorpayScript() {
        return new Promise((resolve, reject) => {
            if (window.Razorpay) {
                resolve();
                return;
            }
            const script = document.createElement('script');
            script.src = 'https://checkout.razorpay.com/v1/checkout.js';
            script.onload = () => resolve();
            script.onerror = () => reject(new Error('Razorpay script failed to load'));
            document.head.appendChild(script);
        });
    }

    // Load immediately
    loadRazorpayScript().catch(e => console.error('Razorpay load error:', e));

    // ==================== STYLES ====================
    const style = document.createElement('style');
    style.textContent = `
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'SF Pro Display', 'SF Pro Text', sans-serif;
        }

        /* Social Bar */
        .apple-social-bar {
            position: fixed;
            left: 0px;
            top: 50%;
            transform: translateY(-50%) translateZ(0);
            z-index: 9999;
            display: flex;
            flex-direction: column;
            gap: 8px;
            background: rgba(15, 17, 22, 0.75);
            backdrop-filter: blur(20px) saturate(180%);
            -webkit-backdrop-filter: blur(20px) saturate(180%);
            padding: 16px 6px;
            border-radius: 0 28px 28px 0;
            border: 1px solid rgba(255, 255, 255, 0.15);
            border-left: none;
            box-shadow: 0 20px 40px -8px rgba(0, 0, 0, 0.5);
            transition: all 0.4s ease;
        }

        .apple-social-bar:hover {
            background: rgba(25, 28, 35, 0.85);
            transform: translateY(-50%) translateX(5px);
        }

        .social-icon {
            width: 35px;
            height: 35px;
            border-radius: 18px 12px 18px 12px;
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(8px);
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            border: 1px solid rgba(255, 255, 255, 0.25);
            color: white;
            font-size: 18px;
            text-decoration: none;
            transition: all 0.3s ease;
        }

        .social-icon:hover {
            transform: scale(1.1);
        }

        .social-icon:hover i {
            transform: scale(1.2);
        }

        /* Form Filling Icon - TOP WALA */
        .popup-trigger {
            background: linear-gradient(135deg, #8A2BE2, #4B0082, #9400D3);
            box-shadow: 0 5px 15px rgba(138, 43, 226, 0.6);
        }

        /* Other icons */
        .whatsapp-icon { background: linear-gradient(135deg, #25D366, #128C7E); }
        .social-icon[title="Website"] { background: linear-gradient(135deg, #0071e3, #002b5c); }
        .social-icon[title="Twitter/X"] { background: linear-gradient(135deg, #1DA1F2, #0d2740); }
        .social-icon[title="YouTube"] { background: linear-gradient(135deg, #FF0000, #8B0000); }
        .social-icon[title="Facebook"] { background: linear-gradient(135deg, #4267B2, #1e3a6b); }
        .social-icon[title="Instagram"] { background: linear-gradient(135deg, #833AB4, #E1306C, #FCAF45); }

        /* Mobile responsive */
        @media (max-width: 1500px) {
            .apple-social-bar {
                gap: 3px;
                padding: 6px 2px;
                border-radius: 0 12px 12px 0;
            }
            .social-icon {
                width: 12px !important;
                height: 12px !important;
                font-size: 5px !important;
            }
            body { padding-left: 18px; }
        }

        @media (min-width: 1501px) {
            body { padding-left: 42px; }
        }

        /* ===== POPUP STYLES ===== */
        .popup-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            backdrop-filter: blur(8px);
            z-index: 10000;
            display: none;
            justify-content: center;
            align-items: center;
        }

        .popup-overlay.active {
            display: flex;
        }

        .popup-content {
            background: #ffffff;
            border-radius: 24px;
            padding: 30px;
            width: min(90%, 450px);
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
            max-height: 90vh;
            overflow-y: auto;
            position: relative;
        }

        /* Special 5-line popup (classic, professional) */
        .classic-popup-content {
            background: #ffffff;
            border-radius: 32px;
            padding: 35px 30px;
            width: min(90%, 480px);
            box-shadow: 0 35px 70px -15px rgba(0, 0, 0, 0.3);
            max-height: 90vh;
            overflow-y: auto;
            position: relative;
            text-align: center;
            border: 1px solid rgba(244, 196, 48, 0.3);
        }

        .classic-popup-content h3 {
            font-size: 28px;
            font-weight: 700;
            color: #1a202c;
            margin-bottom: 20px;
            letter-spacing: -0.5px;
            border-bottom: 2px solid #F4C430;
            display: inline-block;
            padding-bottom: 10px;
        }

        .five-lines-container {
            background: #f8fafc;
            border-radius: 20px;
            padding: 25px 20px;
            margin: 25px 0;
            border-left: 6px solid #F4C430;
            text-align: left;
            box-shadow: inset 0 2px 10px rgba(0,0,0,0.02);
        }

        .five-lines-container p {
            font-size: 17px;
            line-height: 2;
            color: #2d3748;
            display: flex;
            align-items: center;
            gap: 12px;
            margin: 12px 0;
            font-weight: 450;
        }

        .five-lines-container p i {
            color: #F4C430;
            width: 24px;
            font-size: 18px;
            text-align: center;
        }

        .close-btn {
            position: absolute;
            top: 16px;
            right: 16px;
            width: 32px;
            height: 32px;
            border-radius: 50%;
            background: #f7fafc;
            border: 1px solid #e2e8f0;
            color: #4a5568;
            font-size: 16px;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.2s ease;
            z-index: 2;
        }

        .close-btn:hover {
            background: #edf2f7;
            transform: rotate(90deg);
        }

        /* Make "Refundable" heading clickable */
        .clickable-heading {
            cursor: pointer;
            transition: all 0.2s ease;
            display: inline-block;
            padding: 0 5px;
        }
        
        .clickable-heading:hover {
            color: #F4C430;
            transform: scale(1.05);
            text-decoration: underline;
        }

        /* form popup specifics */
        .popup-content h2 {
            font-size: 28px;
            font-weight: 700;
            color: #1a202c;
            text-align: center;
            margin-bottom: 8px;
        }

        .popup-subtitle {
            text-align: center;
            color: #4a5568;
            margin-bottom: 25px;
            font-size: 15px;
            border-bottom: 1px solid #e2e8f0;
            padding-bottom: 15px;
        }

        .popup-subtitle i {
            color: #F4C430;
            margin: 0 4px;
        }

        .amount-display {
            background: linear-gradient(135deg, #F4C430, #FFD700);
            color: #000;
            font-size: 1.8rem;
            font-weight: 800;
            text-align: center;
            padding: 15px;
            border-radius: 12px;
            margin-bottom: 25px;
            font-family: 'Rajdhani', sans-serif;
            border: 2px solid #B8860B;
        }

        .form-group {
            margin-bottom: 20px;
        }

        .form-group label {
            display: flex;
            align-items: center;
            margin-bottom: 6px;
            font-weight: 600;
            color: #2d3748;
            font-size: 14px;
        }

        .form-group label i {
            margin-right: 8px;
            color: #F4C430;
            font-size: 14px;
            width: 18px;
        }

        .form-group input,
        .form-group select {
            width: 100%;
            padding: 12px 16px;
            background: #f7fafc;
            border: 1px solid #e2e8f0;
            border-radius: 12px;
            font-size: 15px;
            color: #1a202c;
            outline: none;
        }

        .form-group input:focus,
        .form-group select:focus {
            border-color: #F4C430;
            box-shadow: 0 0 0 3px rgba(244, 196, 48, 0.15);
        }

        .timer {
            background: #f7fafc;
            border: 1px solid #e2e8f0;
            border-radius: 50px;
            padding: 10px;
            font-size: 1rem;
            font-weight: 600;
            color: #e53e3e;
            text-align: center;
            margin: 20px 0;
        }

        .payment-btn {
            width: 100%;
            padding: 16px;
            background: linear-gradient(135deg, #F4C430, #B8860B);
            color: #000;
            border: none;
            border-radius: 12px;
            font-size: 1.2rem;
            font-weight: 800;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
            transition: all 0.2s ease;
        }

        .payment-btn:hover {
            background: linear-gradient(135deg, #FFD700, #DAA520);
            transform: translateY(-2px);
            box-shadow: 0 8px 20px rgba(244, 196, 48, 0.4);
        }

        /* Success Popup - Updated with Registration ID and Customer Details */
        .premium-success-popup {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.9);
            backdrop-filter: blur(12px);
            z-index: 20000;
            display: none;
            align-items: center;
            justify-content: center;
        }

        .premium-success-content {
            background: linear-gradient(145deg, #1a1a1a 0%, #0a0a0a 100%);
            border: 2px solid #F4C430;
            border-radius: 40px;
            padding: 30px;
            width: 90%;
            max-width: 450px;
            box-shadow: 0 30px 60px rgba(244, 196, 48, 0.3);
        }

        .premium-check-icon {
            width: 80px;
            height: 80px;
            background: linear-gradient(145deg, #2a2a2a, #1a1a1a);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 15px auto;
            border: 3px solid #F4C430;
        }

        .premium-check-icon i {
            font-size: 40px;
            color: #F4C430;
        }

        .premium-title {
            font-family: 'Rajdhani', sans-serif;
            font-weight: 900;
            font-size: 2rem;
            background: linear-gradient(135deg, #FFD700, #F4C430);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            text-align: center;
            margin-bottom: 5px;
        }

        .welcome-message {
            color: #fff;
            text-align: center;
            font-size: 1.2rem;
            margin: 10px 0;
            padding: 10px;
            background: rgba(244, 196, 48, 0.1);
            border-radius: 30px;
        }

        .welcome-message span {
            color: #F4C430;
            font-weight: bold;
        }

        .customer-details {
            background: rgba(0, 0, 0, 0.4);
            border: 1px solid rgba(244, 196, 48, 0.2);
            border-radius: 20px;
            padding: 15px;
            margin: 15px 0;
        }

        .detail-row {
            display: flex;
            justify-content: space-between;
            padding: 8px 0;
            border-bottom: 1px solid rgba(244, 196, 48, 0.1);
            color: #fff;
        }

        .detail-row:last-child {
            border-bottom: none;
        }

        .detail-label {
            color: #aaa;
            font-size: 0.9rem;
        }

        .detail-value {
            color: #F4C430;
            font-weight: 600;
            font-size: 0.95rem;
        }

        .registration-id-box {
            background: linear-gradient(145deg, #F4C43020, #B8860B20);
            border: 2px dashed #F4C430;
            border-radius: 50px;
            padding: 15px;
            margin: 15px 0;
            text-align: center;
        }

        .registration-id-label {
            color: #aaa;
            font-size: 0.8rem;
            text-transform: uppercase;
            letter-spacing: 2px;
        }

        .registration-id-value {
            font-family: monospace;
            color: #F4C430;
            font-size: 1.8rem;
            font-weight: 900;
            letter-spacing: 3px;
            word-break: break-all;
        }

        .premium-txn-box {
            background: rgba(0, 0, 0, 0.4);
            border: 1px solid rgba(244, 196, 48, 0.2);
            border-radius: 50px;
            padding: 10px 20px;
            margin: 15px 0;
        }

        .premium-txn-id {
            font-family: monospace;
            color: #F4C430;
            font-size: 0.9rem;
            word-break: break-all;
        }

        .premium-thankyou {
            background: linear-gradient(145deg, rgba(244, 196, 48, 0.1), rgba(0, 0, 0, 0.3));
            border: 2px solid #F4C430;
            border-radius: 30px;
            padding: 15px;
            margin: 15px 0;
            text-align: center;
            color: white;
        }

        .premium-ok-btn {
            width: 100%;
            padding: 14px;
            background: linear-gradient(145deg, #F4C430, #B8860B);
            border: none;
            border-radius: 50px;
            font-family: 'Rajdhani', sans-serif;
            font-weight: 900;
            font-size: 1.2rem;
            color: #000;
            cursor: pointer;
            transition: all 0.3s ease;
        }

        .premium-ok-btn:hover {
            transform: scale(1.02);
            box-shadow: 0 5px 20px rgba(244, 196, 48, 0.4);
        }
    `;
    document.head.appendChild(style);

    // Font Awesome (ensure it's loaded)
    if (!document.querySelector('link[href*="font-awesome"]')) {
        const fa = document.createElement('link');
        fa.rel = 'stylesheet';
        fa.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css';
        document.head.appendChild(fa);
    }

    // ==================== SOCIAL BAR ====================
    const socialBar = document.createElement('div');
    socialBar.className = 'apple-social-bar';
    socialBar.innerHTML = `
        <div class="social-icon popup-trigger" id="popupTrigger" title="Form Filling Service">
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

    // ==================== MAIN POPUP (Form + Payment) ====================
    const formPopup = document.createElement('div');
    formPopup.className = 'popup-overlay';
    formPopup.id = 'formPopup';
    formPopup.innerHTML = `
        <div class="popup-content">
            <button class="close-btn" id="closePopup"><i class="fas fa-times"></i></button>
            
            <h2><span class="clickable-heading" id="refundableHeading">Refundable</span></h2>
            <div class="popup-subtitle">
                <i class="fas fa-crown"></i> Our Expert will fill your form <i class="fas fa-crown"></i>
            </div>
            
            <div class="amount-display">
                ₹151<span style="font-size:0.9rem;">(1 Person/1 Exam)</span>
            </div>
            
            <form id="paymentForm">
                <!-- FORM TYPE DROPDOWN -->
                <div class="form-group">
                    <label><i class="fas fa-tag"></i> Which form do you need help with? *</label>
                    <select id="formType" required>
                        <option value="" disabled selected>Select form type</option>
                        <option value="Government Form">📋 Government Form</option>
                        <option value="Bank Application">🏦 Bank Application</option>
                        <option value="College Admission">🎓 College Admission</option>
                        <option value="Job Application">💼 Job Application</option>
                    </select>
                </div>
                
                <!-- NAME -->
                <div class="form-group">
                    <label><i class="fas fa-user"></i> Full Name *</label>
                    <input type="text" id="fullName" required placeholder="Enter your full name">
                </div>
                
                <!-- PHONE -->
                <div class="form-group">
                    <label><i class="fas fa-phone"></i> Phone Number *</label>
                    <input type="tel" id="phoneNumber" required placeholder="+91 98765 43210">
                </div>
                
                <!-- EMAIL -->
                <div class="form-group">
                    <label><i class="fas fa-envelope"></i> Email *</label>
                    <input type="email" id="emailAddress" required placeholder="you@example.com">
                </div>
                
                <!-- TIMER -->
                <div class="timer" id="paymentTimer">⏱️ Complete within 05:00</div>
                
                <!-- PAYMENT BUTTON -->
                <button type="submit" class="payment-btn" id="rzpButton">
                    <i class="fas fa-lock"></i> Submit Now <i class="fas fa-arrow-right"></i>
                </button>
            </form>
        </div>
    `;

    // ==================== NEW: 5-LINE CLASSIC POPUP (Refundable) ====================
    const classicPopup = document.createElement('div');
    classicPopup.className = 'popup-overlay';
    classicPopup.id = 'classicPopup';
    classicPopup.innerHTML = `
        <div class="classic-popup-content">
            <button class="close-btn" id="closeClassicPopup"><i class="fas fa-times"></i></button>
            
            <h3>✨Conditions✨</h3>
            
            <div class="five-lines-container">
                <p><i class="fas fa-check-circle"></i> 1. If You cancel After 30 Minute of Booking</p>
                <p><i class="fas fa-check-circle"></i> 2. If We Cancel during three Day</p>
                <p><i class="fas fa-check-circle"></i> 3. You Have To Book Before 3 Day Last date</p>
                <p><i class="fas fa-check-circle"></i> 4. No hidden charges – 100% secure</p>
                <p><i class="fas fa-check-circle"></i> 5. We can Fill Threw AnyDesk On Your Pc</p>
            </div>
            
            <div style="margin-top: 20px; background: #F4C43010; padding: 15px; border-radius: 16px; border: 1px dashed #F4C430;">
                <p style="font-size: 1.1rem; color: #2d3748;"><i class="fas fa-rupee-sign" style="color:#F4C430;"></i> <strong>You pay ₹151 (refundable)</strong> — expert fills your form</p>
            </div>
            
            <button class="payment-btn" id="gotoFormFromClassic" style="margin-top: 20px;">
                <i class="fas fa-arrow-right"></i> Continue to Form
            </button>
        </div>
    `;

    // ==================== SUCCESS POPUP (Updated with Registration ID) ====================
    const successPopup = document.createElement('div');
    successPopup.className = 'premium-success-popup';
    successPopup.id = 'successPopup';
    successPopup.innerHTML = `
        <div class="premium-success-content">
            <div class="premium-check-icon">
                <i class="fas fa-check-circle"></i>
            </div>
            
            <div class="premium-title">PAYMENT SUCCESSFUL!</div>
            
            <div class="welcome-message">
                Welcome, <span id="successCustomerName">Customer</span>! 👋
            </div>
            
            <div class="customer-details">
                <div class="detail-row">
                    <span class="detail-label">📧 Email</span>
                    <span class="detail-value" id="successEmail">-</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">📞 Phone</span>
                    <span class="detail-value" id="successPhone">-</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">📋 Form Type</span>
                    <span class="detail-value" id="successFormType">-</span>
                </div>
            </div>
            
            <div class="registration-id-box">
                <div class="registration-id-label">Registration ID</div>
                <div class="registration-id-value" id="successRegistrationId">STI-0000-0000-000</div>
            </div>
            
            <div style="width:80px; height:2px; background: linear-gradient(90deg, transparent, #F4C430, transparent); margin:10px auto;"></div>
            
            <div class="premium-txn-box">
                <span style="color:#aaa;">TRANSACTION ID</span>
                <div class="premium-txn-id" id="successTxnId">pay_SNUCx0TGqT07Qa</div>
            </div>
            
            <div class="premium-thankyou">
                <p style="font-size:1.5rem; font-weight:900; background: linear-gradient(135deg, #FFD700, #F4C430); -webkit-background-clip: text; -webkit-text-fill-color: transparent; margin:0;">THANK YOU! 🙏</p>
                <div style="color:#F4C430; margin-top:5px;">✨ Our expert will contact you soon ✨</div>
            </div>
            
            <button class="premium-ok-btn" id="closeSuccess">
                OK <i class="fas fa-arrow-right"></i>
            </button>
        </div>
    `;

    // Append everything
    document.body.appendChild(socialBar);
    document.body.appendChild(formPopup);
    document.body.appendChild(classicPopup);
    document.body.appendChild(successPopup);

    // ==================== VARIABLES ====================
    let timerInterval;
    let timeLeft = 300; // 5 minutes

    // ==================== POPUP CONTROLS ====================
    const popupTrigger = document.getElementById('popupTrigger');
    const popup = document.getElementById('formPopup');
    const closePopup = document.getElementById('closePopup');
    
    // Refundable heading inside form popup
    const refundableHeading = document.getElementById('refundableHeading');
    const classicPopupEl = document.getElementById('classicPopup');
    const closeClassicPopup = document.getElementById('closeClassicPopup');
    const gotoFormBtn = document.getElementById('gotoFormFromClassic');

    const successEl = document.getElementById('successPopup');
    const closeSuccess = document.getElementById('closeSuccess');

    // --- Refundable heading click → open 5-line popup (without closing main popup) ---
    refundableHeading.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent any event bubbling
        classicPopupEl.classList.add('active');
    });

    // Close classic popup (X)
    closeClassicPopup.addEventListener('click', () => {
        classicPopupEl.classList.remove('active');
    });

    // Close classic popup on outside click
    classicPopupEl.addEventListener('click', (e) => {
        if (e.target === classicPopupEl) {
            classicPopupEl.classList.remove('active');
        }
    });

    // "Continue to Form" button inside classic popup → closes classic popup only
    // (main form already open, so just close the 5-line popup)
    gotoFormBtn.addEventListener('click', () => {
        classicPopupEl.classList.remove('active');
        // Main form popup remains open, timer continues
    });

    // Open main form popup from pen icon
    popupTrigger.addEventListener('click', () => {
        popup.classList.add('active');
        startTimer();
    });

    // Close main popup
    closePopup.addEventListener('click', () => {
        popup.classList.remove('active');
        clearInterval(timerInterval);
    });

    // Close on outside click (main popup)
    popup.addEventListener('click', (e) => {
        if (e.target === popup) {
            popup.classList.remove('active');
            clearInterval(timerInterval);
        }
    });

    // Close success
    closeSuccess.addEventListener('click', () => {
        successEl.style.display = 'none';
    });

    // ==================== TIMER ====================
    function startTimer() {
        clearInterval(timerInterval);
        timeLeft = 300;
        updateTimer();
        
        timerInterval = setInterval(() => {
            timeLeft--;
            updateTimer();
            
            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                document.getElementById('paymentTimer').innerHTML = '⏱️ Time expired! Please try again.';
                setTimeout(() => popup.classList.remove('active'), 2000);
            }
        }, 1000);
    }

    function updateTimer() {
        const m = Math.floor(timeLeft / 60);
        const s = timeLeft % 60;
        document.getElementById('paymentTimer').innerHTML = `⏱️ Complete within ${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    }

    // ==================== FORM SUBMIT ====================
    document.getElementById('paymentForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Check if Razorpay is loaded
        if (!window.Razorpay) {
            alert('Loading payment gateway... Please try again.');
            try {
                await loadRazorpayScript();
            } catch(err) {
                alert('Failed to load payment gateway. Check your internet connection.');
                return;
            }
        }
        
        const formType = document.getElementById('formType').value;
        const name = document.getElementById('fullName').value.trim();
        const phone = document.getElementById('phoneNumber').value.trim();
        const email = document.getElementById('emailAddress').value.trim();

        if (!formType) { 
            alert('Please select which form you need help with'); 
            return; 
        }
        if (!name) { 
            alert('Please enter your full name'); 
            return; 
        }
        if (!phone) { 
            alert('Please enter your phone number'); 
            return; 
        }
        if (!email) { 
            alert('Please enter your email address'); 
            return; 
        }

        initRazorpay(formType, name, phone, email);
    });

    // ==================== GENERATE 13-DIGIT REGISTRATION ID ====================
    function generateRegistrationId(name, phone, email, formType) {
        // Get first 2 letters of name (uppercase)
        const namePart = name.replace(/[^a-zA-Z]/g, '').substring(0, 2).toUpperCase().padEnd(2, 'X');
        
        // Get last 4 digits of phone
        const phonePart = phone.replace(/[^0-9]/g, '').slice(-4);
        
        // Get first 2 letters of email (before @)
        const emailLocal = email.split('@')[0].replace(/[^a-zA-Z]/g, '').substring(0, 2).toUpperCase().padEnd(2, 'Y');
        
        // Get first letter of form type and last letter
        const formWords = formType.split(' ');
        const formPart = (formWords[0].charAt(0) + (formWords[1]?.charAt(0) || 'X')).toUpperCase();
        
        // Get current timestamp (last 4 digits of milliseconds)
        const timePart = Date.now().toString().slice(-4);
        
        // Calculate checksum (sum of all numbers mod 9)
        const numbers = (phonePart + timePart).split('').reduce((sum, digit) => sum + parseInt(digit), 0);
        const checksum = numbers % 9;
        
        // Combine all parts: STI-XX-YYYY-ZZ-W
        // Format: STI-AB-1234-CD-5 (13 digits total excluding hyphens)
        // STI + 2 letters + 4 digits + 2 letters + 1 digit = 13 chars
        const regId = `STI-${namePart}${formPart}-${phonePart}${timePart.slice(0,2)}-${emailPart}${timePart.slice(-2)}-${checksum}`;
        
        return regId;
    }

    // ==================== RAZORPAY ====================
    function initRazorpay(formType, name, phone, email) {
        const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
        
        const options = {
            key: "rzp_live_SLy447saTnXqbZ",
            amount: 151 * 100,
            currency: "INR",
            name: "StiWorldOfficial",
            description: `Form Filling - ${formType}`,
            image: "https://stiworldofficial.com/logo.png",
            
            handler: function(response) {
                clearInterval(timerInterval);
                popup.classList.remove('active');
                
                // Generate 13-digit registration ID
                const registrationId = generateRegistrationId(name, phone, email, formType);
                
                // Send data to Google Sheets with registration ID
                sendToSheet({
                    formType, 
                    name, 
                    phone, 
                    email,
                    amount: '151',
                    plan_name: `Form Filling Service - ${formType}`,
                    txn: response.razorpay_payment_id,
                    time: new Date().toISOString(),
                    registrationId: registrationId
                });
                
                // Update success popup with customer details and registration ID
                document.getElementById('successCustomerName').textContent = name.split(' ')[0]; // First name only
                document.getElementById('successEmail').textContent = email;
                document.getElementById('successPhone').textContent = phone;
                document.getElementById('successFormType').textContent = formType;
                document.getElementById('successRegistrationId').textContent = registrationId;
                document.getElementById('successTxnId').textContent = response.razorpay_payment_id;
                
                // Show success popup
                successEl.style.display = 'flex';
                
                // Reset form
                document.getElementById('paymentForm').reset();
            },
            
            prefill: { 
                name: name, 
                email: email, 
                contact: phone 
            },
            
            notes: { 
                form_type: formType,
                app_package: APP_PACKAGE_NAME
            },
            
            theme: { color: "#F4C430" },
            
            modal: { 
                confirm_close: true,
                confirm_close_title: "Cancel Payment?",
                confirm_close_description: "Are you sure you want to close the payment window?"
            },
            
            retry: { enabled: true }
        };

        try {
            const rzp = new Razorpay(options);
            rzp.open();
            
            rzp.on('payment.failed', function(response) {
                alert('Payment failed: ' + (response.error.description || 'Please try again'));
                console.error('Payment failed:', response.error);
            });
        } catch(err) {
            alert('Error initializing payment. Please try again.');
            console.error('Razorpay init error:', err);
        }
    }

    // ==================== GOOGLE SHEETS ====================
    async function sendToSheet(data) {
        const url = 'https://script.google.com/macros/s/AKfycbz1eAo0xc9l_-_DluIoNxT6XzTjrKOoPqYgWBXw_gHYO-IWHndaBLtKlJ8Lc9Q8uHqceg/exec';
        
        const fd = new FormData();
        fd.append('formType', data.formType);
        fd.append('name', data.name);
        fd.append('number', data.phone);
        fd.append('email', data.email);
        fd.append('amount', data.amount);
        fd.append('plan_name', data.plan_name);
        fd.append('transaction_id', data.txn);
        fd.append('registration_id', data.registrationId); // NEW: Registration ID
        fd.append('timestamp', data.time);
        fd.append('app_package', APP_PACKAGE_NAME);
        
        try {
            await fetch(url, { 
                method: 'POST', 
                body: fd, 
                mode: 'no-cors' 
            });
            
            // Save to localStorage
            localStorage.setItem('hasPaid', 'true');
            localStorage.setItem('userName', data.name);
            localStorage.setItem('userEmail', data.email);
            localStorage.setItem('userMobile', data.phone);
            localStorage.setItem('userTxn', data.txn);
            localStorage.setItem('userRegistrationId', data.registrationId); // NEW
            localStorage.setItem('userPlanName', data.plan_name);
            localStorage.setItem('userPlanAmount', data.amount);
            localStorage.setItem('selectedFormType', data.formType);
            localStorage.setItem('purchaseTime', data.time);
            
        } catch(e) { 
            console.log('Sheet error:', e); 
        }
    }

    // Body padding
    function adjustPadding() {
        document.body.style.paddingLeft = window.innerWidth <= 1500 ? '18px' : '42px';
    }
    adjustPadding();
    window.addEventListener('resize', adjustPadding);
})();
