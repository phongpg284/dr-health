import { REACT_APP_DOWNLOAD_URL } from "app/config";

export const downloadRecord = async (
  fileName: string,
  accountId: string | undefined
) => {
  if (!accountId) {
    console.log("No account id to fetch");
    return;
  }
  const response = await fetch(
    `${REACT_APP_DOWNLOAD_URL}/download/${accountId}/${fileName}`,
    { method: "GET" }
  );
  const blob = await response.blob();
  const recording = new File([blob], fileName, {
    type: "audio/wav",
  });
  return blob;
};
