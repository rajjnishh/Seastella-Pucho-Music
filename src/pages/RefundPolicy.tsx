import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const RefundPolicy = () => {
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
              Refund <span className="text-primary">Policy</span>
            </h1>
            
            <div className="prose prose-invert max-w-none text-muted-foreground space-y-6">
              <p>Last updated: March 22, 2026</p>
              
              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">1. Overview</h2>
                <p>
                  At PUCHO Music, we strive to provide the best possible service to our artists and clients. This Refund Policy outlines the conditions under which refunds may be granted for our services.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">2. Digital Services</h2>
                <p>
                  Due to the nature of digital music distribution and related services, once a distribution request has been processed and sent to streaming platforms, we generally do not offer refunds.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">3. Eligibility for Refund</h2>
                <p>
                  Refunds may be considered in the following specific circumstances:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>If a service was paid for but not initiated or processed within the specified timeframe.</li>
                  <li>If there was a duplicate payment made by mistake.</li>
                  <li>If a technical error on our part prevented the successful delivery of the service.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">4. Non-Refundable Items</h2>
                <p>
                  The following items are strictly non-refundable:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Completed music distributions.</li>
                  <li>Subscription fees for periods already elapsed.</li>
                  <li>Services that have been fully rendered.</li>
                  <li>Fees associated with third-party platform rejections beyond our control.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">5. Refund Process</h2>
                <p>
                  To request a refund, please contact our support team at puchomusic44@gmail.com with your order details and the reason for the request. We will review your request and notify you of the approval or rejection of your refund within 7-10 business days.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-foreground mb-4">6. Contact Us</h2>
                <p>
                  If you have any questions about our refund policy, please contact us at: puchomusic44@gmail.com
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

export default RefundPolicy;
