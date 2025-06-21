import { PostsContainer } from "@/components/article/components/posts-container";
import { getPostsByCategory } from "@/lib/prisma";
import { Post } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function PensionAndInsurancePage() {
  try {
    const posts = await getPostsByCategory(10);

    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-3xl font-bold mb-6">מאמרים על פנסיה וביטוחים</h1>

        {posts && posts.length > 0 ? (
          <PostsContainer posts={posts as Post[]} />
        ) : (
          <div className="text-center py-10">
            <p className="text-xl text-gray-600">
              לא נמצאו מאמרים בקטגוריה זו.
            </p>
            <p className="mt-2 text-gray-500">
              אנא בדוק שוב מאוחר יותר או חפש בקטגוריות אחרות.
            </p>
          </div>
        )}
      </div>
    );
  } catch (error) {
    console.error("Error in PensionAndInsurancePage:", error);
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">מאמרים על פנסיה וביטוחים</h1>
        <div className="text-center py-10 bg-red-50 rounded-lg">
          <p className="text-xl text-red-600">אירעה שגיאה בטעינת המאמרים.</p>
          <p className="mt-2 text-gray-700">
            אנא נסה שוב מאוחר יותר או צור קשר עם התמיכה אם הבעיה נמשכת.
          </p>
        </div>
      </div>
    );
  }
}
