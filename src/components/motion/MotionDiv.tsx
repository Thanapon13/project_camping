"use client";

import { motion } from "framer-motion";

type MotionDivProps = React.ComponentProps<typeof motion.div>;

const MotionDiv = (props: MotionDivProps) => {
  return <motion.div {...props} />;
};

export default MotionDiv;
