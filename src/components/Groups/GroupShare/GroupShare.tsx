import React, { useState } from "react";

const GroupShareModal = ({
  groupId,
  groupName,
}: {
  groupId: string;
  groupName: string;
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [copySuccess, setCopySuccess] = useState<string | null>(null);

  const groupUrl = `${window.location.origin}/group/${groupId}`;

  // Function to copy the link
  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(groupUrl);
      setCopySuccess("Group link copied to clipboard!");
      setTimeout(() => setCopySuccess(null), 3000);
    } catch (error) {
      console.error("Failed to copy link:", error);
      setCopySuccess("Failed to copy the link.");
    }
  };

  // Function to share on social media
  const handleShare = (platform: string) => {
    const encodedUrl = encodeURIComponent(groupUrl);
    const encodedText = encodeURIComponent(`Join our group: ${groupName}`);

    let shareUrl = "";
    switch (platform) {
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
        break;
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedText}`;
        break;
      case "whatsapp":
        shareUrl = `https://wa.me/?text=${encodedText} - ${groupUrl}`;
        break;
      default:
        break;
    }
    if (shareUrl) {
      window.open(shareUrl, "_blank");
    }
  };

  return (
    <div>
      {/* Share Button */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Share
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 w-96">
            <h2 className="text-lg font-bold mb-4">Share Group</h2>

            {/* Share Options */}
            <div className="flex flex-col gap-4">
              <button
                onClick={handleCopyLink}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Copy Link
              </button>
              <button
                onClick={() => handleShare("facebook")}
                className="px-4 py-2 bg-blue-700 text-white rounded hover:bg-blue-800"
              >
                Share on Facebook
              </button>
              <button
                onClick={() => handleShare("twitter")}
                className="px-4 py-2 bg-blue-400 text-white rounded hover:bg-blue-500"
              >
                Share on Twitter
              </button>
              <button
                onClick={() => handleShare("whatsapp")}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Share on WhatsApp
              </button>
            </div>

            {/* Copy Success Message */}
            {copySuccess && (
              <p className="mt-4 text-green-600 text-sm">{copySuccess}</p>
            )}

            {/* Close Button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="mt-6 px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 w-full"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GroupShareModal;
