"use client";

import { motion } from "framer-motion";

type MotionH1Props = React.ComponentProps<typeof motion.h1>;

const MotionH1 = (props: MotionH1Props) => {
  return <motion.h1 {...props} />;
};

export default MotionH1;
