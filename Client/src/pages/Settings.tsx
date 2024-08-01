import React, { useState } from 'react';
import styles from './Settings.module.css';
import AccordionItem from '../components/AccordionItem';

function Settings() {
  const [activeAccordion, setActiveAccordion] = useState(null);

  const handleAccordionClick = (index : any) => {
    setActiveAccordion(index === activeAccordion ? null : index);
  };

  return (
    <div className={styles.body}>
      <div className={styles.container}>
        <div className={styles.profile}>
          <div className={styles['profile-pic']}>
            <img src="Profile-Pic.png" alt="Profile Pic" />
          </div>
        </div>
        <div className={styles.accordion}>
          <AccordionItem
            title="Change Password "
            isOpen={activeAccordion === 0}
            onClick={() => handleAccordionClick(0)}
          >
            <form>
              <div>
                <label>Current Password :</label>
                <input type="password" placeholder="Enter your current password" />
              </div>
              <div>
                <label>New Password :</label>
                <input type="password" placeholder="Enter new password" />
              </div>
              <div>
                <label>Confirm Password :</label>
                <input type="password" placeholder="Re-enter Your New Password" />
              </div>
              <div>
                <button type="button" className={styles['cancel-button']}>
                  Cancel
                </button>
                <button type="submit" className={styles['update-button']}>
                  Update Password
                </button>
              </div>
            </form>
          </AccordionItem>
          <AccordionItem
            title="About Us"
            isOpen={activeAccordion === 1}
            onClick={() => handleAccordionClick(1)}
          >
            <div className={styles['grid-container']}>
              <div className={styles['grid-item']}>
                <h3>PPC Kalyan</h3>
                <p>Team Lead / Backend</p>
              </div>
              <div className={styles['grid-item']}>
                <h3>D.Pankaj</h3>
                <p>LLM / Frontend</p>
              </div>
              <div className={styles['grid-item']}>
                <h3>B.Abijith</h3>
                <p>LLM / Backend</p>
              </div>
              <div className={styles['grid-item']}>
                <h3>S.Bhuvan</h3>
                <p>UI-UX designer / Frontend</p>
              </div>
              <div className={styles['grid-item']}>
                <h3>K.Vamsi</h3>
                <p>UI-UX designer / Frontend</p>
              </div>
              <div className={styles['grid-item']}>
                <h3>Kiran Kumar Sir</h3>
                <p>Mentor</p>
              </div>
            </div>
          </AccordionItem>
          <AccordionItem
            title="Help"
            isOpen={activeAccordion === 2}
            onClick={() => handleAccordionClick(2)}
          >
            <div className={styles['help-content']}>
              <h3>Welcome to Insurance Advisors Help Page</h3>
              <p>Overview of Insurance Advisors</p>
              <p>Insurance advisors play a crucial role in helping individuals and businesses navigate the complex landscape of insurance products. They provide personalized guidance and expertise to ensure clients make informed decisions that meet their financial and risk management needs.</p>

              <h3>Services Offered</h3>
              <ul>
                <li>Insurance Consultation: Personalized consultations to assess your insurance needs.</li>
                <li>Policy Recommendations: Expert advice on selecting the right insurance policies.</li>
                <li>Claims Assistance: Guidance and support during the claims process.</li>
                <li>Risk Assessment: Evaluation of your current risk exposure and recommendations for mitigation.</li>
                <li>Financial Planning: Integration of insurance solutions into your overall financial plan.</li>
              </ul>

              <h3>Contact Information</h3>
              <p>For inquiries or to schedule a consultation, please contact us:</p>
              <p>Phone: 7981907440</p>
              <p>Email: kalyanppc@gmail.com</p>

              <h3>FAQs</h3>
              <p>Q: What can I expect from an insurance consultation?</p>
              <p>A: During a consultation, an advisor will assess your needs, explain available insurance options, and recommend policies tailored to your situation.</p>

              <p>Q: How do I file an insurance claim with your assistance?</p>
              <p>A: Our advisors will guide you through the claims process, helping you gather necessary documentation and liaising with insurance companies on your behalf.</p>

              <h3>Client Testimonials</h3>
              <p>Read what our clients have to say about their experience with our insurance advisors:</p>
              <p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit." - John Doe</p>

              <h3>Insurance Products</h3>
              <p>Our advisors specialize in a variety of insurance products, including:</p>
              <ul>
                <li>Life Insurance</li>
                <li>Health Insurance</li>
                <li>Property Insurance</li>
                <li>Business Insurance</li>
                <li>Vehicle Insurance</li>
              </ul>

              <h3>Educational Resources</h3>
              <p>Explore our collection of articles and guides to learn more about insurance and financial planning:</p>
              <p><a href="[Link to educational resources]">[Link to educational resources]</a></p>

              <h3>Appointment Booking</h3>
              <p>To schedule an appointment with one of our advisors, please visit our <a href="[appointment booking page]">[appointment booking page]</a> or contact us directly.</p>

              <h3>Conclusion</h3>
              <p>At Insurance Advisors, we are dedicated to providing expert guidance and support to help you make informed insurance decisions. Whether you need assistance with policy selection, claims, or financial planning, our team is here to help. Contact us today to learn more about how we can assist you in securing your financial future.</p>
            </div>
          </AccordionItem>
        </div>
      </div>
    </div>
  );
}

export default Settings;
