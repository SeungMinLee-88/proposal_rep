// $(".board_act").trigger("click");
// $(".board_act").click();

$(".board_act").on("click", function (){
			var _get = url_get_value();
			var _default_url = location.pathname;
			if(_get['GP']) _default_url += (_default_url == location.pathname ? "?" : "&")+"GP="+_get['GP'];
			if(_get['GB']) _default_url += (_default_url == location.pathname ? "?" : "&")+"GB="+_get['GB'];
			if(_get['bt_cate']) _default_url += (_default_url == location.pathname ? "?" : "&")+"bt_cate="+_get['bt_cate'];
			if(_get['page']) _default_url += (_default_url == location.pathname ? "?" : "&")+"page="+_get['page'];
			
			switch($(this).attr('act')){
				case "list" :	// 목록, 글쓰기, 상세보기
					location.href = _default_url+"&ACT=list";
					break;

				case "write" : // 목록, 상세보기
					location.href = _default_url+"&ACT=write";
					break;
					
				case "save" :	// 글쓰기 폼
					// 에디터 유형에 본문내용 가져오기
					switch(editor){
						case "SE" :
							Editors.getById["bb_body"].exec("UPDATE_CONTENTS_FIELD", []);
							break;
						
						case "CK" :
							$("#bb_body").val(CKEDITOR.instances.bb_body.getData());
							break;
					}
					
					if(check_required("form_board_write")){
						document.form_board_write.submit();
					}
					break;
					
				case "cancel" : // 글쓰기 폼
					location.href = _default_url;
					break;
				
				case "reply" :	// [현제글에 답변] : 상세보기
					location.href = location.href = _default_url+"&key="+_get['key']+"&ACT=reply";
					break;
					
				case "modify" :	// [현제글 수정] : 상세보기
					location.href = location.href = _default_url+"&key="+_get['key']+"&ACT=modify";
					break;
					
				case "modify_pw" :	// [현제글 수정] : 상세보기
					location.href = location.href = _default_url+"&key="+_get['key']+"&ACT=password&mode=modify";
					break;
					
				case "delete" :	// [현제글 삭제] : 상세보기
					if(confirm_delete()){
						location.href = location.href = _default_url+"&key="+_get['key']+"&ACT=proc&PROC=delete";
					}
					break;
					
				case "delete_pw" :	// [현제글 삭제] : 상세보기
					location.href = location.href = _default_url+"&key="+_get['key']+"&ACT=password&mode=delete";
					break;
					
				case "password_submit" :
					var _form = document.form_board_password;
					if($.trim(_form.bb_password.value) == ""){
						focus_return(_form.bb_password, '비밀번호를 입력하세요.');
					}else _form.submit();
					break;
					
			/** 덧글 관련기능 */		
				case "comment_save" :	// 덧글 쓰기
					var _form = document.form_board_comment;
					if(_form.bc_m_key.value == ""){
						if($.trim(_form.bc_name.value) == "") return focus_return(_form.bc_name, "이름을 입력하세요.");
						if($.trim(_form.bc_pass.value) == "") return focus_return(_form.bc_pass, "비밀번호를 입력하세요.");
					}
					
					if($.trim(_form.bc_content.value) == "") return focus_return(_form.bc_content, "덧글을 입력하세요.");
					_form.submit();
					break;
					
				case "comment_delete" :	// 덧글 삭제
					if(confirm_delete()) location.href = this.href;
					break;
					
				case "comment_add" :
					var last = $($("div.board_comment_list > ul > li").get(-1)).attr("key");
					get_comment(_get['GP'], _get['GB'], _get['key'], last, 10);
					break;
					
				case "comment_all" :
					var last = $($("div.board_comment_list > ul > li").get(-1)).attr("key");
					get_comment(_get['GP'], _get['GB'], _get['key'], last, false);
					break;
			}
		});
	});
	