const FooterBottom = () => {
  return (
    <div className="py-6 border-t border-border/50">
      <p className="text-sm text-muted-foreground">
        © {new Date().getFullYear()} Landmark Explorer. All rights reserved.
      </p>
    </div>
  );
};

export default FooterBottom;
