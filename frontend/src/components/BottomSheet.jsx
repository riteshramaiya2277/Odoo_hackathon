import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const BottomSheet = ({ isOpen, onClose, children, snapPoints = ['50%', '90%'] }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-40"
            onClick={onClose}
          />
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl z-50 p-4 shadow-2xl pb-8"
            style={{ maxHeight: '90vh', overflowY: 'auto' }}
          >
            <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto mb-6" />
            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
