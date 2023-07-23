import { eclair, cream, macaron, gift, waffle } from "../assets";

const dummyPosts = [
	{
		id: "eclair-post",
		image: eclair,
		title: "Eclair Post",
		date: "2023.07.23.",
		author: "Jean-Michel",
		tags: ["#history", "#fun-facts"],
		blurb:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam a ipsum id mauris sagittis malesuada. Cras lacinia erat vel velit sagittis sagittis. Sed finibus rhoncus turpis id mollis. Nullam turpis odio, egestas nec orci eu, efficitur feugiat diam. Pellentesque facilisis mauris eget orci feugiat, eget pellentesque nisi venenatis. Ut erat tellus, pharetra sit amet sollicitudin dignissim, lacinia eget felis. Etiam vitae ligula et dolor varius sagittis eu non ligula. Sed neque nisi, hendrerit eu ante in, cursus hendrerit lorem.",
		post: `Praesent varius neque nisl, vel luctus augue venenatis in. Nunc ac nisl quis augue sollicitudin rutrum a ut nulla. Nunc lacinia lorem eget feugiat aliquam. Aliquam erat volutpat. Integer dapibus massa efficitur, consectetur odio at, eleifend arcu. Praesent ut volutpat massa. Sed ac luctus tellus. Morbi bibendum dolor faucibus erat tincidunt, id dignissim lectus placerat.

    Fusce odio metus, viverra non ante eu, vulputate viverra massa. Sed sollicitudin, enim sed pellentesque malesuada, quam augue facilisis magna, a pharetra sem elit vel ligula. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nulla feugiat neque id augue sagittis, non pretium magna efficitur. Aliquam erat volutpat. Nullam finibus faucibus libero, quis hendrerit felis auctor in. Donec tempus ligula ut justo elementum mattis. In fermentum aliquet vestibulum. Vestibulum eget enim faucibus, facilisis est et, egestas neque.
    
    Nullam posuere vitae lacus ac laoreet. Donec nunc ipsum, sollicitudin sed arcu ac, convallis porta risus. Vivamus elementum sem a dui dictum, ut mollis eros tincidunt. Nulla ligula enim, cursus id lorem vitae, consectetur cursus tortor. Fusce eu metus ac libero sodales convallis. Nunc convallis auctor odio, et vestibulum lorem consectetur vel. Curabitur hendrerit dolor non odio luctus, ultricies faucibus sem sodales. Morbi rhoncus aliquet eleifend. Aliquam ut sodales ex. Etiam eros dolor, auctor vel ultrices vel, ultricies eget nisl. Maecenas vitae risus sit amet ex feugiat congue. Fusce dictum, quam quis ultrices tristique, mauris libero rutrum odio, sed mattis massa nisi ut dolor. Donec tempus ultrices nulla, ac egestas enim varius ut. In hac habitasse platea dictumst.
    
    Sed fringilla iaculis enim, quis dictum dolor blandit sed. Vivamus blandit euismod sem ac porttitor. Duis venenatis metus vitae dui malesuada, ornare placerat justo volutpat. Nulla ullamcorper mauris eget elit dapibus finibus. In ut purus accumsan, commodo nisi at, aliquet velit. Nullam venenatis interdum magna ut condimentum. Proin efficitur eu odio eget sodales. Nunc maximus sodales dolor sit amet egestas. Suspendisse facilisis mollis elit in elementum.
    
    Aenean varius tincidunt ipsum, sit amet tempor nisi consectetur sit amet. Proin auctor lorem lacinia augue aliquam pellentesque. Donec suscipit maximus magna, id ullamcorper lorem facilisis vitae. Ut venenatis purus a porttitor porta. Duis nec posuere ligula, sit amet tincidunt massa. Pellentesque volutpat justo turpis, eget accumsan tellus pulvinar vitae. Nunc venenatis varius libero non ultrices. Duis condimentum tempor erat, in faucibus neque tempor nec. Interdum et malesuada fames ac ante ipsum primis in faucibus. Vestibulum rhoncus tincidunt magna aliquam mattis. Vivamus porttitor fringilla urna, nec pharetra enim faucibus nec. Pellentesque ac pharetra odio. Pellentesque et erat sit amet lectus aliquam molestie. Nam sed velit eget purus vulputate tempus.`,
	},
	{
		id: "cream-post",
		image: cream,
		title: "Cream Post",
		date: "2023.07.20.",
		author: "Marie",
		tags: ["#ideas", "#tips & tricks"],
		blurb:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam a ipsum id mauris sagittis malesuada. Cras lacinia erat vel velit sagittis sagittis. Sed finibus rhoncus turpis id mollis. Nullam turpis odio, egestas nec orci eu, efficitur feugiat diam. Pellentesque facilisis mauris eget orci feugiat, eget pellentesque nisi venenatis. Ut erat tellus, pharetra sit amet sollicitudin dignissim, lacinia eget felis. Etiam vitae ligula et dolor varius sagittis eu non ligula. Sed neque nisi, hendrerit eu ante in, cursus hendrerit lorem.",
		post: `Suspendisse est lacus, consequat hendrerit nisl sit amet, egestas interdum eros. Donec eu nisl ante. In semper orci interdum, gravida metus eget, vehicula velit. Aenean a tristique mauris, ut bibendum urna. Duis efficitur ex metus, vitae sagittis metus cursus vel. Quisque ultricies vestibulum orci, a lobortis ipsum luctus eget. Aliquam erat volutpat.

    Praesent cursus fermentum pulvinar. Sed quis lacus quis libero consectetur commodo. Morbi tempus vulputate auctor. Donec porta tortor dui, nec fermentum risus venenatis in. In elementum tincidunt dictum. Proin blandit iaculis nisi, hendrerit ornare metus tincidunt auctor. Fusce et vestibulum ex, eget tincidunt arcu. Quisque faucibus aliquet nunc, ac tincidunt libero sodales nec. Suspendisse eu sodales ipsum. Aenean id lacus leo. Quisque ut lectus at magna molestie congue. Ut vehicula nunc ut magna vulputate auctor. Interdum et malesuada fames ac ante ipsum primis in faucibus. Sed gravida gravida elit, quis rhoncus augue interdum at. Maecenas interdum neque massa, ac viverra lorem molestie placerat.
    
    Sed in vehicula dolor, vel fermentum elit. Cras maximus ut dolor id auctor. Morbi eu tincidunt lectus. Curabitur condimentum vel tortor vitae tempus. Duis sem magna, suscipit pulvinar ultricies vel, congue a augue. Maecenas in posuere dolor. Sed nec risus sagittis, lobortis tortor at, gravida quam. Praesent rutrum dolor non lectus lacinia, vel aliquam turpis posuere. Etiam dictum nisl lorem, ut vehicula odio porttitor in. Cras in est non massa aliquam luctus vel sed nibh. Vestibulum accumsan lacus et congue tempus. Aenean facilisis sagittis mi et sollicitudin. Ut dictum nisl ut sem consectetur, a efficitur mi rutrum.
    
    Nulla pulvinar, erat id pretium rutrum, tortor risus sollicitudin metus, eget efficitur ante elit a nibh. In at dignissim lectus. Donec vehicula ex sed arcu eleifend, ut maximus dolor ullamcorper. In dignissim, sem ut vestibulum molestie, sem nibh mollis arcu, in finibus nunc magna et lacus. Sed tempor lorem in consequat fermentum. Sed finibus ante eget risus maximus, in lobortis massa imperdiet. Nulla nec pretium ante. Sed rhoncus pulvinar pulvinar. In quis massa dui. Quisque sollicitudin urna nulla, at ultricies nulla dictum a. Ut molestie, ex at luctus scelerisque, quam nunc feugiat nunc, at varius lectus nunc vel risus. Etiam interdum est a odio consequat varius. Maecenas pellentesque convallis ultrices.
    
    Sed mollis ullamcorper justo, eu pretium dui dignissim id. Proin in ultricies risus. Proin lobortis cursus urna. Fusce quis vehicula ante, ac molestie nulla. Maecenas porta enim arcu, porta hendrerit dui placerat eu. Curabitur lacus arcu, bibendum sit amet nisl lobortis, euismod eleifend justo. Fusce nunc ipsum, tempus vitae massa id, gravida maximus neque. Aliquam ornare congue enim in fermentum. Phasellus pulvinar lorem leo, eget egestas ante pellentesque et.`,
	},
	{
		id: "macaron-post",
		image: macaron,
		title: "Macaron Post",
		date: "2023.07.10.",
		author: "Sophie",
		tags: ["#books"],
		blurb:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam a ipsum id mauris sagittis malesuada. Cras lacinia erat vel velit sagittis sagittis. Sed finibus rhoncus turpis id mollis. Nullam turpis odio, egestas nec orci eu, efficitur feugiat diam. Pellentesque facilisis mauris eget orci feugiat, eget pellentesque nisi venenatis. Ut erat tellus, pharetra sit amet sollicitudin dignissim, lacinia eget felis. Etiam vitae ligula et dolor varius sagittis eu non ligula. Sed neque nisi, hendrerit eu ante in, cursus hendrerit lorem.",
		post: `Mauris vel viverra ipsum, scelerisque suscipit ante. Nam bibendum dolor sed velit ullamcorper, id ultrices sapien porta. Cras auctor, ipsum vel mattis tincidunt, velit ante maximus metus, eget aliquet erat lorem a lorem. Praesent venenatis sem a commodo blandit. Maecenas elementum commodo eros, quis euismod ante rhoncus et. Nulla tellus ante, sodales sed purus a, dapibus ultricies nulla. Donec mi tortor, malesuada sit amet urna nec, fermentum tempus augue.

    Nunc leo augue, dictum at mi quis, aliquam laoreet mi. Vestibulum gravida laoreet venenatis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nullam et augue hendrerit, gravida augue non, venenatis tellus. Duis facilisis arcu quis posuere posuere. Quisque laoreet molestie eros. Vivamus vulputate, augue vitae semper tempor, leo metus cursus erat, dignissim pellentesque orci nisl at risus. Curabitur et mauris ut ante laoreet sagittis sit amet sit amet elit. Donec euismod ultrices sodales. Nulla aliquet lectus quis augue aliquet condimentum. In semper libero odio, id dapibus erat fringilla at. Morbi suscipit, massa vel pharetra dapibus, orci libero egestas tortor, eu ultricies ligula urna commodo erat. Aliquam in pretium nisi. Fusce consequat quam magna, a aliquet turpis dignissim sagittis. Praesent vehicula elit auctor ex semper pretium.
    
    Mauris sit amet massa mollis, blandit velit ultrices, hendrerit lacus. Praesent ac mauris vulputate, blandit purus vitae, ultricies quam. Nulla sed ex gravida, placerat metus ac, cursus arcu. Proin rutrum quam at rhoncus posuere. Duis mollis mi tellus, eu dictum tortor vestibulum vel. Donec tempus est consequat, gravida purus semper, tincidunt arcu. Donec facilisis hendrerit augue, eu tincidunt quam sodales vitae. Mauris venenatis pretium consectetur. Phasellus in sapien at justo ullamcorper blandit. Donec et egestas elit, nec sodales est. Fusce id euismod lacus. Pellentesque lacus ante, auctor sed augue lacinia, aliquet iaculis est. Pellentesque laoreet consequat lorem, in congue arcu pulvinar interdum. Nam imperdiet posuere lacus, ut sollicitudin elit venenatis vel.
    
    Sed enim arcu, sollicitudin id elementum quis, volutpat ac nisl. Curabitur ultrices, lorem eu rutrum consectetur, quam eros aliquam tortor, eu ultrices quam elit nec risus. Suspendisse vehicula vitae ex eu mollis. Suspendisse potenti. Vivamus commodo, mauris sed egestas semper, lorem libero ornare elit, id commodo elit purus eu purus. Nunc sed augue sed urna convallis sollicitudin ac at lectus. Integer fermentum magna nisi, vitae cursus est maximus quis. Nunc aliquet tellus et porta pretium. In vitae bibendum enim. Aenean id nisl sit amet augue maximus pellentesque eget id neque. Nam eget dui pellentesque, ornare nisl vitae, pharetra ante. Sed dictum ante felis, facilisis porttitor eros vestibulum vitae. Ut elit sem, hendrerit ut pretium ac, sagittis interdum neque. Vivamus dignissim elementum quam, quis placerat nibh egestas bibendum. Morbi vehicula laoreet dui sed congue. Curabitur tincidunt magna suscipit lorem luctus tempor.
    
    Sed magna augue, ullamcorper id quam sed, malesuada lobortis tellus. Pellentesque id felis sed sapien iaculis volutpat. Donec nec neque ac massa semper maximus. Suspendisse dictum odio eget sem accumsan, at pharetra metus finibus. Etiam eget orci ac sapien placerat gravida. Vivamus a nisl ut ante tristique interdum vel sed lorem. In ullamcorper porttitor nisl, sit amet commodo sem varius quis. Interdum et malesuada fames ac ante ipsum primis in faucibus. Suspendisse egestas magna et elit vehicula porttitor. In vel nulla ligula. Aenean tristique nunc libero, vel elementum est aliquam dictum. Sed mollis commodo metus, tincidunt venenatis justo pellentesque non. Fusce sollicitudin porttitor magna, at pulvinar justo posuere vitae.`,
	},
	{
		id: "gift-post",
		image: gift,
		title: "Gift Post",
		date: "2023.07.03.",
		author: "Jean-Michel",
		tags: ["#news", "#fun-facts"],
		blurb:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam a ipsum id mauris sagittis malesuada. Cras lacinia erat vel velit sagittis sagittis. Sed finibus rhoncus turpis id mollis. Nullam turpis odio, egestas nec orci eu, efficitur feugiat diam. Pellentesque facilisis mauris eget orci feugiat, eget pellentesque nisi venenatis. Ut erat tellus, pharetra sit amet sollicitudin dignissim, lacinia eget felis. Etiam vitae ligula et dolor varius sagittis eu non ligula. Sed neque nisi, hendrerit eu ante in, cursus hendrerit lorem.",
		post: `Nunc sit amet efficitur eros. Sed nisl lectus, accumsan id augue sed, imperdiet mollis magna. Nulla nec arcu fermentum nisl dictum vulputate in ut erat. Aenean aliquet massa eget neque porttitor, sed facilisis purus aliquet. Vivamus vitae vehicula lectus, nec convallis turpis. Fusce sed hendrerit neque, eu eleifend turpis. Curabitur id augue eget libero pellentesque iaculis. Ut ut ligula non sem efficitur faucibus. Donec porttitor, lectus sed tempor condimentum, augue enim faucibus odio, in euismod arcu quam hendrerit tellus. Aenean pellentesque lorem id aliquet viverra. In non auctor purus. Curabitur commodo nisi justo, sagittis molestie turpis fringilla at. Nam dapibus urna in felis mollis pharetra ut at nibh. Donec dignissim in ipsum sed venenatis.

    Morbi sagittis mattis purus, in semper risus fringilla quis. Quisque nec euismod dolor. Cras luctus turpis eget lobortis gravida. Morbi egestas nibh leo, quis lobortis enim fringilla pulvinar. Aliquam magna arcu, tristique vitae nibh ac, elementum mattis purus. Phasellus ornare egestas sapien, vulputate aliquet sem ornare vel. Suspendisse et justo id magna laoreet pulvinar at eu enim. Fusce ultrices augue diam, ac ornare nibh commodo id. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Vestibulum laoreet dui tortor, vitae luctus enim auctor eu. Nullam tincidunt nulla nulla, ac elementum quam eleifend nec. Pellentesque ultrices semper magna, vel mattis ante consectetur non. In diam ligula, egestas et dolor vitae, lobortis tincidunt turpis. In mollis, sem ac porttitor pulvinar, lacus dolor lobortis augue, at dictum dolor risus id massa. Phasellus volutpat finibus urna ut lobortis. Aliquam ornare mauris quis fermentum rutrum.
    
    Donec tempus dictum nisl, ac semper velit. Sed porttitor, dolor nec congue condimentum, felis felis interdum est, ac convallis metus tortor at quam. Sed ac ornare eros. Suspendisse pellentesque ac ex vel ultrices. Mauris at facilisis libero, non placerat purus. Praesent bibendum, dolor venenatis maximus congue, ligula dui bibendum dui, at tristique ipsum felis et ex. Donec luctus dapibus purus, ut mattis dolor tincidunt ornare. Quisque sed quam sem. Suspendisse accumsan cursus nibh nec venenatis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Cras elementum diam pellentesque, egestas ligula sed, fermentum dui. Ut consequat turpis a diam blandit, nec sollicitudin nulla vehicula. Vestibulum suscipit dolor eu lectus feugiat pharetra. Nullam semper ac diam sed varius.
    
    Vestibulum at arcu aliquam, vehicula felis quis, molestie metus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur egestas est neque, in rhoncus lectus molestie quis. Suspendisse sollicitudin pretium velit ut porta. Nullam congue lorem sit amet odio iaculis, sed lacinia sapien varius. Ut porta ac elit at interdum. Integer vel tempus lorem. Aliquam quis mi ipsum. Sed sit amet orci volutpat urna feugiat pharetra sed sed lectus. Integer id tempor ligula, eu tempus leo. Donec ut ligula arcu. Interdum et malesuada fames ac ante ipsum primis in faucibus. In bibendum fringilla lobortis. Morbi lectus odio, scelerisque et sapien vitae, convallis ultricies augue. Aliquam malesuada a lorem ut iaculis. Morbi consectetur dictum luctus.
    
    Praesent elementum non neque vel gravida. Aliquam eu ligula luctus leo semper cursus id vitae sem. Etiam hendrerit ante sed viverra rhoncus. Integer finibus eu tortor id tempus. Sed sit amet velit sed quam mattis condimentum. Donec eros tortor, lacinia vitae tellus ac, euismod ullamcorper magna. Etiam mollis arcu consequat, finibus metus ut, rhoncus lectus. Etiam lectus nunc, tincidunt in justo nec, porta semper lacus. Etiam id tempus odio, vitae elementum augue. Praesent fringilla nulla vitae tellus gravida, ut rhoncus dui dignissim.`,
	},
	{
		id: "waffle-post",
		image: waffle,
		title: "Waffle Post",
		date: "2023.06.22.",
		author: "Marie",
		tags: ["#news", "#events"],
		blurb:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam a ipsum id mauris sagittis malesuada. Cras lacinia erat vel velit sagittis sagittis. Sed finibus rhoncus turpis id mollis. Nullam turpis odio, egestas nec orci eu, efficitur feugiat diam. Pellentesque facilisis mauris eget orci feugiat, eget pellentesque nisi venenatis. Ut erat tellus, pharetra sit amet sollicitudin dignissim, lacinia eget felis. Etiam vitae ligula et dolor varius sagittis eu non ligula. Sed neque nisi, hendrerit eu ante in, cursus hendrerit lorem.",
		post: `Nullam ac risus auctor, vestibulum libero ut, fermentum mauris. Aenean vitae faucibus nulla. Aenean ornare volutpat arcu sed feugiat. Morbi lobortis cursus vulputate. Proin congue rutrum nibh, eu placerat felis lacinia vitae. Duis tincidunt tellus ut libero ultricies tincidunt. Vestibulum nec arcu convallis, luctus sapien ac, pulvinar lorem. Sed quis purus dictum, bibendum neque sit amet, faucibus dolor. Aenean suscipit auctor eros nec sollicitudin. Mauris sed nulla eu nunc ornare ultrices in nec magna. Quisque volutpat viverra ante vel imperdiet.

    Phasellus sed nisi vitae sem imperdiet volutpat at eget elit. Nulla facilisi. Mauris scelerisque, nunc venenatis feugiat auctor, justo mi hendrerit justo, vitae fermentum purus metus at velit. Quisque molestie eros leo, non imperdiet lacus tincidunt ut. Maecenas tincidunt, lectus nec cursus tempus, turpis urna mattis est, a venenatis tortor ante a risus. Aliquam vestibulum finibus ex, a tincidunt nibh rutrum sit amet. Integer a molestie tortor, vitae vulputate nibh. Proin viverra vitae tortor non euismod. Donec odio ipsum, iaculis consectetur placerat at, commodo ultricies nunc. Phasellus quis ex sollicitudin, pulvinar turpis pharetra, dictum dolor. Aliquam venenatis, lacus blandit congue auctor, dolor purus ullamcorper justo, ut iaculis metus nibh id tortor. Donec urna velit, tempor vel sapien ultrices, congue condimentum mauris. Curabitur sagittis dui at elit tincidunt fermentum.
    
    Cras lorem justo, dapibus ut nulla vitae, dapibus lobortis est. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Duis facilisis ipsum massa, et pharetra lectus tempor a. Cras cursus ex a lacus imperdiet dignissim. Donec ipsum ligula, tristique sed diam a, ornare rhoncus mi. Proin in egestas sem. Quisque ullamcorper tortor tortor, sed congue lorem ornare ac. Morbi elementum molestie ipsum, condimentum congue lacus scelerisque ut. Ut nisl ex, interdum non purus eget, dapibus rutrum nulla.
    
    Nam nibh leo, vulputate eget lorem ullamcorper, suscipit tempor libero. Mauris posuere lacinia sem vel consequat. Donec orci massa, sagittis a purus ac, faucibus rutrum purus. Praesent lacinia lorem ut elit pellentesque sollicitudin. In leo felis, accumsan sit amet magna sed, faucibus ultricies magna. Morbi tellus arcu, venenatis ultrices molestie ac, eleifend quis sapien. Mauris bibendum mattis arcu, faucibus semper lectus volutpat ut. Quisque vehicula, leo nec blandit faucibus, felis risus faucibus eros, ac tincidunt neque dolor eget felis. Proin eu eros ut ligula pretium sagittis. Aliquam scelerisque posuere pharetra. Pellentesque vitae libero eu massa consequat molestie.
    
    Donec consectetur purus at orci faucibus iaculis. Suspendisse hendrerit libero a libero semper, nec ornare lacus rhoncus. Etiam molestie lobortis augue, sit amet posuere neque. Praesent eget felis lectus. Mauris eu fermentum nibh, in suscipit est. Quisque ac neque ac odio congue sodales ut nec nisl. Phasellus pellentesque consequat ipsum maximus molestie. Praesent nec ligula eget sem bibendum fringilla.`,
	},
];

const categories = [
	"history",
	"fun-facts",
	"events",
	"ideas",
	"news",
	"books",
	"tips & tricks",
];

export { dummyPosts, categories };
