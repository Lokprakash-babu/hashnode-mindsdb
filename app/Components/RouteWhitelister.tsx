"use client";

import { usePathname, useRouter } from "next/navigation";
import useAccountContext from "../hooks/useAccountContext";

const routeRegex = {
  learn: /\/learn/,
  recommendations: /\/recommendations/,
  lessonDetails: /\/learn\/[A-Za-z0-9!@#$%^&*()_+{}\[\]:;<>,.?\/\\|~-]+\//,
  practice: /\/practice/,
  practiceDetails: /\/practice\/[A-Za-z0-9!@#$%^&*()_+{}\[\]:;<>,.?\/\\|~-]+\//,
  contests: /\/contests/,
  contestDetails: /\/contests\/[A-Za-z0-9!@#$%^&*()_+{}\[\]:;<>,.?\/\\|~-]+\//,
  contestAttempt:
    /\/contests\/[A-Za-z0-9!@#$%^&*()_+{}\[\]:;<>,.?\/\\|~-]+\/attempt/,
  profile: /\/profile/,
  submissions: /\/submissions/,
  submissionDetails:
    /\/submissions\/[A-Za-z0-9!@#$%^&*()_+{}\[\]:;<>,.?\/\\|~-]+\//,
};
const candidateRoutes = [
  routeRegex.learn,
  routeRegex.lessonDetails,
  routeRegex.practice,
  routeRegex.practiceDetails,
  routeRegex.contests,
  routeRegex.contestDetails,
  routeRegex.contestAttempt,
  routeRegex.submissions,
  routeRegex.submissionDetails,
  routeRegex.profile,
];
const hiringManagerRoutes = [
  routeRegex.contests,
  routeRegex.contestDetails,
  routeRegex.profile,
  routeRegex.recommendations,
];
const RouteWhitelister = ({ children }) => {
  const { account_type } = useAccountContext();
  const pathName = usePathname();
  const router = useRouter();

  if (account_type === "candidate") {
    const isRouteMatching = candidateRoutes.some((route) => {
      return route.test(pathName);
    });

    if (isRouteMatching) {
      return <>{children}</>;
    } else {
      router.replace("/learn");
    }
  } else {
    const isRouteMatching = hiringManagerRoutes.some((route) =>
      route.test(pathName)
    );
    if (isRouteMatching) {
      return <>{children}</>;
    } else {
      router.replace("/contests");
    }
  }
};

export default RouteWhitelister;
