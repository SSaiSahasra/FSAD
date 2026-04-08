import { motion } from 'framer-motion';

const MotionDiv = motion.div;

const Card = ({ title, value, icon, color = 'blue' }) => {
  const colorClasses = {
    blue: 'from-[#5680E9] to-[#5AB9EA]',
    green: 'from-emerald-500 to-teal-400',
    yellow: 'from-amber-500 to-orange-400',
    purple: 'from-[#8860D0] to-violet-500'
  };

  return (
    <MotionDiv
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.45 }}
      whileHover={{ y: -8, scale: 1.01, rotateX: 3, rotateY: -3 }}
      className="glass-card group relative overflow-hidden rounded-2xl p-6 transition hover:shadow-[0_20px_38px_rgba(86,128,233,0.24)]"
    >
      <div className="pointer-events-none absolute -top-12 right-[-38px] h-24 w-24 rounded-full bg-gradient-to-br from-white/35 to-transparent blur-md transition duration-500 group-hover:scale-125" />
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-slate-600">{title}</p>
          <p className="mt-2 text-3xl font-black text-slate-900">{value}</p>
        </div>
        <div className={`bg-gradient-to-br ${colorClasses[color]} rounded-full p-4 text-2xl text-white shadow-[0_12px_24px_rgba(86,128,233,0.28)]`}>
          {icon}
        </div>
      </div>
    </MotionDiv>
  );
};

export default Card;
