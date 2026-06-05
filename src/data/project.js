export const projects = [
  {
    id: 1,
    title: "Handmade Tea Management System",
    category: "Full-Stack",
    image: "/projects/h-t_dash.png", // Points to public/projects/postal.jpg
    shortDescription: "",
    longDescription: "A comprehensive logistics platform designed to modernize postal workflows. It features real-time package tracking via embedded IoT sensors, automated fleet routing, and a secure client portal for status updates.",
    features: ["Real-time GPS & environment tracking", "Automated route optimization", "Secure role-based dashboards", "RESTful API integration"],
    tags: ["React", "Node.js", "MongoDB", "IoT"],
    link: "#"
  },
  {
    id: 2,
    title: "SL Route Itinerary Planner",
    category: "Mobile & Web App",
    image: "/projects/h-t_2.png",  // Points to public/projects/route.jpg
    shortDescription: "An intelligent travel planner optimizing routes for travelers.",
    longDescription: "SL Route takes the stress out of travel planning by using intelligent algorithms to calculate the most efficient travel routes, suggesting points of interest, and generating complete day-by-day itineraries based on user preferences.",
    features: ["Interactive dynamic map", "Customizable daily schedules", "Offline mode for travelers", "Third-party booking integration"],
    tags: ["React", "Express", "Tailwind CSS", "Maps API"],
    link: "#"
  },
  {
    id: 3,
    title: "Enterprise Cloud Architecture",
    category: "Cloud Solutions",
    image: "/projects/h-t_3.png",  // Points to public/projects/cloud.jpg
    shortDescription: "Migrating legacy infrastructures to scalable cloud-native environments.",
    longDescription: "Engineered a complete digital transformation for a high-volume enterprise. Migrated monolith on-premise servers to a highly available, auto-scaling microservices architecture with zero downtime.",
    features: ["Zero-downtime migration", "Automated CI/CD pipelines", "DDoS protection & WAF setup", "99.99% uptime guarantee"],
    tags: ["AWS", "Docker", "Kubernetes", "CI/CD"],
    link: "#"
  }
];