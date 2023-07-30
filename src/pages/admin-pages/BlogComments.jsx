import profImage from "../../assets/rewprof-1.webp";
import { otherText, commentsHeaders } from "../../constants";
import { Icon } from "@iconify/react";
import { comments } from "../../content";
import { Tooltip } from "react-tooltip";
import { adminPageStyle, tableStyle, tooltipStyle } from "../../styles";
import { Fragment } from "react";
import { Link } from "react-router-dom";

const BlogComments = () => {
	return (
		<div className={adminPageStyle.wrapper}>
			<h1 className={adminPageStyle.title}>{otherText.blogCommentsTitle}</h1>

			<ul className="grid grid-cols-8 w-full px-8 items-center">
				{commentsHeaders.map((header) => (
					<li
						key={header.id}
						className={`${header.style} text-text text-[1.2rem] font-[600] pl-2`}
					>
						{header.title}
					</li>
				))}

				{comments.map((comment) => (
					<Fragment>
						<li className={`${tableStyle} col-span-1`}>
							<img
								src={profImage}
								alt="profile"
								className="w-8 h-8 mx-auto rounded-full"
							/>
						</li>
						<li className={`${tableStyle} col-span-2`}>{comment.author}</li>
						<li className={`${tableStyle} col-span-2`}>{comment.title}</li>
						<li className={`${tableStyle} col-span-2`}>
							{new Date(comment.date).toUTCString().slice(0, -7)}
						</li>

						<li className="flex gap-4 justify-center items-center py-2 col-span-1">
							<Icon
								icon="bi:trash3-fill"
								className="delete text-text text-[2rem] hover:text-logopink cursor-pointer"
							/>
							<Link
								to={`/admin/blog/comments/${comment.id}`}
								className="edit text-text text-[2rem] hover:text-logopink cursor-pointer"
							>
								<Icon icon="raphael:edit" />
							</Link>
							{comment.isPublished ? (
								<Icon
									icon="mdi:publish"
									className="published outline-none text-green text-[2rem] cursor-pointer"
								/>
							) : (
								<Icon
									icon="mdi:publish-off"
									className="hided outline-none text-red text-[2rem] cursor-pointer"
								/>
							)}
						</li>
					</Fragment>
				))}
			</ul>
			<Tooltip
				anchorSelect=".published"
				content="Comment is published now."
				style={tooltipStyle}
				place="top"
			/>
			<Tooltip
				anchorSelect=".hided"
				content="Comment is hided now."
				style={tooltipStyle}
				place="top"
			/>
			<Tooltip
				anchorSelect=".delete"
				content="Delete comment."
				style={tooltipStyle}
				place="top"
			/>
			<Tooltip
				anchorSelect=".edit"
				content="Edit comment."
				style={tooltipStyle}
				place="top"
			/>
		</div>
	);
};

export default BlogComments;
