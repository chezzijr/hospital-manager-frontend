import axios from "axios";

export async function generateStaticParams(url: string, type: any) {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}${url}`
    );
    const datas = response.data;

    return datas.map((data: any) => ({
      id: data.id.toString(),
    }));
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
}
