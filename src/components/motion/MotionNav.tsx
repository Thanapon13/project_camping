"use client";

import { motion } from "framer-motion";

type MotionNavProps = React.ComponentProps<typeof motion.nav>;

const MotionNav = (props: MotionNavProps) => {
  return <motion.nav {...props} />;
};

export default MotionNav;
