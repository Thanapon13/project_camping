"use client";

import { motion } from "framer-motion";

type MotionPProps = React.ComponentProps<typeof motion.p>;

const MotionP = (props: MotionPProps) => {
  return <motion.p {...props} />;
};

export default MotionP;
