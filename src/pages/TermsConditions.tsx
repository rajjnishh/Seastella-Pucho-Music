import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const TermsConditions = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-32 pb-20">
        <div className="container-main max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-8 text-foreground">
              Terms & <span className="text-primary">Conditions</span>
            </h1>
            
            <div className="prose prose-invert max-w-none text-muted-foreground space-y-6">
              <p>Last updated: March 22, 2026</p>
              
              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">1. Acceptance of Terms</h2>
                <p>
                  By accessing and using the PUCHO Music website and services, you agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, you must not use our services.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">2. Description of Service</h2>
                <p>
                  PUCHO Music provides digital music distribution, VEVO video distribution, MCN/CMS services, and related support for independent artists and labels.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">3. User Accounts</h2>
                <p>
                  To use certain features of our services, you must create an account. You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">4. Intellectual Property Rights</h2>
                <p>
                  You represent and warrant that you own or have the necessary rights and permissions to distribute any content you submit through our services. You retain all ownership rights to your music.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">5. Prohibited Conduct</h2>
                <p>
                  You agree not to use our services for any unlawful purpose or in any way that could damage, disable, or impair our website or services. This includes, but is not limited to, distributing copyrighted material without permission.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">6. Limitation of Liability</h2>
                <p>
                  PUCHO Music shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use our services.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">7. Changes to Terms</h2>
                <p>
                  We reserve the right to modify these Terms and Conditions at any time. Your continued use of our services after any changes indicates your acceptance of the new terms.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">8. Contact Us</h2>
                <p>
                  If you have any questions about these Terms and Conditions, please contact us at: puchomusic44@gmail.com
                </p>
              </section>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TermsConditions;
