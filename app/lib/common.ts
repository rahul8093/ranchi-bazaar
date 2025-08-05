type EditorJsData = {
    time: number;
    blocks: {
      id: string;
      type: string;
      data: {
        text: string;
      };
    }[];
    version: string;
  };

  const stripHtml = (html: string): string => {
    return html.replace(/<[^>]+>/g, '');
  };

  export const parseSaleorDescription = (raw: string): string => {
    try {
      const parsed: EditorJsData = JSON.parse(raw);
      const blocks = parsed?.blocks ?? [];
  
      const plainText = blocks
    .map((block) => stripHtml(block.data.text))
    .join(' ');

    return plainText
      // return blocks.map((block) => block.data.text).join(' ');
    } catch {
      return '';
    }
  };

  
  