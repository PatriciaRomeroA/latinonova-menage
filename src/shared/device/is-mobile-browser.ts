export function isMobileBrowser(navigatorLike: Navigator = navigator) {
  const userAgent = navigatorLike.userAgent;
  const userAgentData = navigatorLike as Navigator & {
    readonly userAgentData?: {
      readonly mobile?: boolean;
    };
  };

  if (typeof userAgentData.userAgentData?.mobile === "boolean") {
    return userAgentData.userAgentData.mobile;
  }

  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    userAgent,
  );
}
