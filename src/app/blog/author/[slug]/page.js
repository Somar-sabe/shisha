import BlogTwo from "@/components/blog/BlogTwo";
import Breadcrumb from "@/components/breadcrumb/Breadcrumb";
import Section from "@/components/elements/Section";
import FooterTwo from "@/components/footer/FooterTwo";
import HeaderFive from "@/components/header/HeaderFive";
import NewsLetter from "@/components/newsletter/NewsLetter";
import ServiceTwo from "@/components/services/ServiceTwo";
import { slugify, unSlugify } from "@/utils";
import { getAllPosts } from "@/utils/api";

const BlogAuthor = ({ params }) => {
  // حماية params.slug
  if (!params?.slug) {
    return <div>Author not found</div>;
  }

  const allPosts = getAllPosts([
    'id',
    'slug',
    'title',
    'cate',
    'featureImg',
    'author_name'
  ]).filter(post => post?.author_name); // حذف أي post بدون author_name

  // تصفية المقالات الخاصة بالمؤلف
  const postsByAuthor = allPosts.filter(
    post => slugify(post.author_name) === params.slug
  );

  if (!postsByAuthor.length) {
    return <div>No posts found for this author</div>;
  }

  return (
    <>
      <HeaderFive headerSlider />
      <main className="main-wrapper">
        <Breadcrumb activeItem="Author" title={unSlugify(params.slug)} />
        <Section>
          <div className="row g-5">
            {postsByAuthor.map((data) =>
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

export default BlogAuthor;

// توليد static params لكل المؤلفين الفعليين
export async function generateStaticParams() {
  const posts = getAllPosts(['author_name']).filter(p => p?.author_name);
  
  // استخدم Set لتجنب تكرار المؤلفين
  const authors = Array.from(new Set(posts.map(p => slugify(p.author_name))));

  return authors.map(slug => ({ slug }));
}
