import axios from "axios";

export async function getData({ queryKey }: any) {
  // from documentation
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, query] = queryKey;

  const res = await axios(`${process.env.NEXT_PUBLIC_API_URL}`, {
    params: { query },
  });

  if (res.status !== 200) {
    throw new Error("Failed to fetch data");
  }

  return await res.data;
}

// get Page by id
// export async function getById(pageId: string) {
//   const res = await axios(`${process.env.NEXT_PUBLIC_API_URL}/pages/${pageId}`);

//   if (res.status !== 200) {
//     throw new Error("Failed to fetch data");
//   }

//   return await res.data;
// }
