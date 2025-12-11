import BlogTwo from "@/components/blog/BlogTwo";
import Breadcrumb from "@/components/breadcrumb/Breadcrumb";
import Section from "@/components/elements/Section";
import FooterTwo from "@/components/footer/FooterTwo";
import HeaderFive from "@/components/header/HeaderFive";
import ServiceTwo from "@/components/services/ServiceTwo";
import { slugify, unSlugify } from "@/utils";
import { getAllPosts } from "@/utils/api";

const BlogCategory = ({ params }) => {
  if (!params?.slug) {
    return <div>Category not found</div>;
  }

  const allPosts = getAllPosts([
    'id',
    'slug',
    'title',
    'cate',
    'featureImg',
  ]).filter(post => post?.cate); // إزالة أي post بدون cate

  // تصفية المقالات حسب التصنيف
  const postsByCate = allPosts.filter(
    post => slugify(post.cate) === params.slug
  );

  if (!postsByCate.length) {
    return <div>No posts found in this category</div>;
  }

  return (
    <>
      <HeaderFive headerSlider />
      <main className="main-wrapper">
        <Breadcrumb activeItem="Blogs" title={unSlugify(params.slug)} />
        <Section>
          <div className="row g-5">
            {postsByCate.map((data) =>
              data ? (
                <div className="col-md-4" key={data.id}>
                  <BlogTwo posts={data} />
                </div>
              ) : null
            )}
          </div>
        </Section>
        <ServiceTwo />
      </main>
      <FooterTwo />
    </>
  );
};

export default BlogCategory;

// توليد static params لكل التصنيفات الفعلية
export async function generateStaticParams() {
  const posts = getAllPosts(['cate']).filter(p => p?.cate);

  // استخدام Set لتجنب التكرار
  const categories = Array.from(new Set(posts.map(p => slugify(p.cate))));

  return categories.map(slug => ({ slug }));
}
