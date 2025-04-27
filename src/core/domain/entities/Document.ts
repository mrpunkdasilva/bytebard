export interface DocumentProps {
  id?: string;
  title: string;
  content: string;
  tags: string[];
  userId: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Document {
  readonly id: string;
  readonly title: string;
  readonly content: string;
  readonly tags: string[];
  readonly userId: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;

  constructor(props: DocumentProps) {
    this.id = props.id || crypto.randomUUID();
    this.title = props.title;
    this.content = props.content;
    this.tags = props.tags;
    this.userId = props.userId;
    this.createdAt = props.createdAt || new Date();
    this.updatedAt = props.updatedAt || new Date();
  }

  updateContent(content: string): Document {
    return new Document({
      ...this,
      content,
      updatedAt: new Date()
    });
  }

  updateTitle(title: string): Document {
    return new Document({
      ...this,
      title,
      updatedAt: new Date()
    });
  }

  updateTags(tags: string[]): Document {
    return new Document({
      ...this,
      tags,
      updatedAt: new Date()
    });
  }
}