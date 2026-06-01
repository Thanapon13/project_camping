import { LucideIcon, Map, Heart, MessageCircle, Settings } from "lucide-react";

type Faq = {
  icon: LucideIcon;
  question: string;
  answer: string;
};

const faqs: Faq[] = [
  {
    icon: Map,
    question: "How do I add a new Landmark?",
    answer:
      'Click the "Create Landmark" button on the homepage, fill in the name, category, description, price, and province, select a location on the map, upload an image, then click Create Landmark to save.',
  },
  {
    icon: Heart,
    question: "How do I save a Landmark to my Favorites?",
    answer:
      'Click the heart ❤️ button on any Landmark card to add it to your Favorites. You can view all your saved Landmarks from the "Favorites" menu in the Navbar.',
  },
  {
    icon: MessageCircle,
    question: "How do I leave a review and rating?",
    answer:
      "Open the detail page of the Landmark you want to review. Scroll down to find the Comments section, select a star rating from 1 to 5, type your comment, and click Submit.",
  },
  {
    icon: Settings,
    question: "How do I edit or delete my own Landmark?",
    answer:
      "Hover over your Landmark card to reveal the Edit (✏️) and Delete (🗑️) buttons. Click the appropriate button to edit or remove the Landmark.",
  },
];

export default faqs;
