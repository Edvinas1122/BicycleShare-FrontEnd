type MentionHandler = (richText: any) => any;

const mentionHandlers: { [key: string]: MentionHandler } = {
  'database': handleDatabaseMention,
  'date': handleDateMention,
  'link_preview': handleLinkPreviewMention,
  // other mention types go here
};

export default function handleMention(richText: any): any {
  const handler = mentionHandlers[richText.mention.type];
  if (!handler) {
    console.warn(`No handler for mention type ${richText.mention.type}`);
    return;
  }
  return handler(richText);
}

function handleDatabaseMention(richText: any): any {
  return (
    <div>
      Database Mention: {richText.plain_text}
    </div>
  );
}

function handleDateMention(richText: any): any {
  // Handle date mention
  return (
    <div>
      Date Mention: {richText.plain_text}
    </div>
  );
}

function handleLinkPreviewMention(richText: any): any {
  // Handle link preview mention
  return (
    <div>
      Link Preview Mention: {richText.plain_text}
    </div>
  );
}
