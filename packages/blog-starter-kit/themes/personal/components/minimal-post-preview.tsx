import Image from 'next/image';
import Link from 'next/link';
import { User } from '../generated/graphql';
import { DateFormatter } from './date-formatter';

type Author = Pick<User, 'name'>;

type Props = {
	title: string;
	date: string;
	author: Author;
	slug: string;
	commentCount: number;
	coverImage?: string | null;
};

export const MinimalPostPreview = ({ title, date, slug, commentCount, coverImage }: Props) => {
	const postURL = `/${slug}`;

	return (
		<section className="flex flex-col items-start gap-2">
			{coverImage && (
				<Link href={postURL} className="w-full overflow-hidden rounded-lg">
					<Image
						src={coverImage}
						alt={title}
						width={800}
						height={420}
						className="w-full object-cover transition-transform duration-300 hover:scale-105"
						style={{ maxHeight: '240px' }}
					/>
				</Link>
			)}
			<h2 className="text-lg leading-tight tracking-tight text-black dark:text-white">
				<Link href={postURL}>{title}</Link>
			</h2>
			<p className="flex flex-row items-center gap-2">
				<Link href={postURL} className="text-sm text-neutral-600 dark:text-neutral-400">
					<DateFormatter dateString={date} />
				</Link>
				{commentCount > 2 && (
					<>
						<span>&middot;</span>
						<Link href={postURL} className="text-sm text-neutral-600 dark:text-neutral-400">
							{commentCount} comments
						</Link>
					</>
				)}
			</p>
		</section>
	);
};
