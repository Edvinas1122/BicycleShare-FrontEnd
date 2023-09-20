"use server";

export const serverFetch = async (url: string) => {
	"use server";
	const res = await fetch(url, {
		// cache: "no-cache",
		next: {revalidate: 3}
	});
	console.log(res);
	const json = await res.json();
	return json;
}

export default serverFetch;