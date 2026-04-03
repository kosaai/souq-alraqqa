<?php
  require_once 'functions.php';
  starter_backoffice_menu(__('إعدادات', 'starter'));
?>


<?php
// MANAGE IMAGES
if(Params::getParam('starter_images') == 'done') { 
  $upload_dir_small = osc_themes_path() . osc_current_web_theme() . '/images/small_cat/';
  $upload_dir_large = osc_themes_path() . osc_current_web_theme() . '/images/large_cat/';

  if (!file_exists($upload_dir_small)) { mkdir($upload_dir_small, 0777, true); }
  if (!file_exists($upload_dir_large)) { mkdir($upload_dir_large, 0777, true); }

  $count_real = 0;
  $conn = DBConnectionClass::newInstance();
  $data = $conn->getOsclassDb();
  $comm = new DBCommandClass($data);

  for ($i=1; $i<=2000; $i++) {
    if(isset($_POST['fa-icon' .$i])) {
      $fields = array('s_icon' => Params::getParam('fa-icon' .$i));
      $comm->update(DB_TABLE_PREFIX.'t_category_starter', $fields, array('fk_i_category_id' => $i));

      message_ok(__('Font Awesome icon successfully saved for category' . ' <strong>#' . $i . '</strong>' ,'starter'));
    }

    if(isset($_POST['color' .$i])) {
      $fields = array('s_color' => Params::getParam('color' .$i));
      $comm->update(DB_TABLE_PREFIX.'t_category_starter', $fields, array('fk_i_category_id' => $i));

      message_ok(__('Color successfully saved for category' . ' <strong>#' . $i . '</strong>' ,'starter'));
    }

    if(isset($_FILES['small' .$i]) and $_FILES['small' .$i]['name'] <> ''){

      $file_ext   = strtolower(end(explode('.', $_FILES['small' .$i]['name'])));
      $file_name  = $i . '.' . $file_ext;
      $file_tmp   = $_FILES['small' .$i]['tmp_name'];
      $file_type  = $_FILES['small' .$i]['type'];   
      $extensions = array("png");

      if(in_array($file_ext,$extensions )=== false) {
        $errors = __('الامتداد غير مسموح به، الامتداد المسموح به هو .png فقط!', 'starter');
      } 
				
      if(empty($errors)==true){
        move_uploaded_file($file_tmp, $upload_dir_small.$file_name);
        message_ok(__('صورة صغيرة #', 'starter') . $i . __('تم الرفع بنجاح.', 'starter'));
        $count_real++;
      } else {
        message_error(__('حدث خطأ عند تحميل الصورة الصغيرة #', 'starter') . $i . ': ' .$errors);
      }
    }
  }

  $count_real = 0;
  for ($i=1; $i<=2000; $i++) {
    if(isset($_FILES['large' .$i]) and $_FILES['large' .$i]['name'] <> ''){
      $file_ext   = strtolower(end(explode('.', $_FILES['large' .$i]['name'])));
      $file_name  = $i . '.' . $file_ext;
      $file_tmp   = $_FILES['large' .$i]['tmp_name'];
      $file_type  = $_FILES['large' .$i]['type'];   
      $extensions = array("jpg");

      if(in_array($file_ext,$extensions )=== false) {
        $errors = __('الامتداد غير مسموح به، الامتداد المسموح به فقط للصور الكبيرة هو .jpg!', 'starter');
      }
				
      if(empty($errors)==true){
        move_uploaded_file($file_tmp, $upload_dir_large.$file_name);
        message_ok(__('صورة كبيرة #', 'starter') . $i . __('تم الرفع بنجاح.', 'starter'));
        $count_real++;
      } else {
        message_error(__('حدث خطأ عند تحميل الصورة الكبيرة #', 'starter') . $i . ': ' .$errors);
      }
    }
  }
}
?>




<div class="mb-body">
  <div class="mb-info-box" style="margin:5px 0 30px 0;">
    <div class="mb-line"><strong><?php _e('الإضافات لهذا الموضوع', 'starter'); ?></strong></div>
    <div class="mb-line"><?php _e('لقد قمنا بتعديل العديد من المكونات الإضافية لك لتناسب تصميم القالب الذي سيعمل دون الحاجة إلى أي تعديلات', 'starter'); ?>.</div>
    <div class="mb-line"><?php _e('لا يتم تسليم المكونات الإضافية في حزمة السمات، ويجب تنزيلها بشكل منفصل', 'starter'); ?>.</div>
    <div class="mb-line" style="margin:10px 0;"><a href="https://osclasspoint.com/theme-plugins/starter_plugins_20180406_aa82fd.zip" target="_blank" class="mb-button-white"><i class="fa fa-download"></i> <?php _e('تحميل الإضافات', 'starter'); ?></a></div>
    <div class="mb-line" style="margin-top:15px;">- <?php _e('قم بتحميل واستخراج الملف الذي تم تنزيله <strong>starter-plugins.zip</strong> إلى المجلد <strong>oc-content/plugins/</strong> على استضافتك', 'starter'); ?>.</div>
    <div class="mb-line">- <?php _e('انتقل إلى <strong>oc-admin > Plugins</strong> وقم بتثبيت المكونات الإضافية التي تريدها', 'starter'); ?>.</div>
  </div>


  <!-- GENERAL -->
  <div class="mb-box">
    <div class="mb-head"><i class="fa fa-cog"></i> <?php _e('الإعدادات العامة', 'starter'); ?></div>

    <form action="<?php echo osc_admin_render_theme_url('oc-content/themes/' . osc_current_web_theme() . '/admin/settings.php'); ?>" method="post">
      <input type="hidden" name="starter_general" value="done" />

      <div class="mb-inside">

        <div class="mb-info-box" style="margin:0 0 20px 0;">
          <div class="mb-line"><?php _e('يقوم البرنامج المساعد بإنشاء رابط خلفي يضاف إلى التذييل.', 'starter'); ?></div>
          <div class="mb-line"><?php echo sprintf(__('يمكنك استخدام البرنامج الإضافي مجانًا مع الرابط الموجود في التذييل، أو شراء "%s" لهذا المنتج وتعطيل الرابط.', 'starter'), '<a target="_blank" href="https://osclasspoint.com/services/customer-services/remove-free-product-footer-link-i221">Link remover service</a>'); ?></div>
          <div class="mb-line" style="font-weight:bold;"><?php _e('إن إزالة الرابط دون شراء خدمة إزالة الروابط ينتهك ترخيص المنتج!', 'starter'); ?></div>
        </div>
        
        <?php
          $link_remover_order_id = osc_esc_html(osc_get_preference('link_remover_order_id', 'starter_theme'));
          $remove_footer_link = osc_get_preference('remove_footer_link', 'starter_theme');
        ?>

        <div class="mb-row">
          <label for="link_remover_order_id" class=""><span><?php _e('معرّف طلب OsclassPoint', 'starter'); ?></span></label> 
          <input name="link_remover_order_id" size="20" type="text" value="<?php echo $link_remover_order_id; ?>" />

          <div class="mb-explain"><?php _e('أدخل معرف طلب OsclassPoint صالحًا والذي يحتوي على منتج "خدمة إزالة الارتباط".', 'starter'); ?></div>
        </div>
        
        
        <div class="mb-row <?php if($link_remover_order_id < 8000 || $link_remover_order_id > 500000) { ?>mb-disabled<?php } ?>">
          <label for="remove_footer_link" class=""><span><?php _e('إزالة الرابط الخلفي من التذييل', 'starter'); ?></span></label> 
          <input name="remove_footer_link" type="checkbox" class="element-slide" <?php if($link_remover_order_id < 8000 || $link_remover_order_id > 100000) { ?>disabled<?php } ?> <?php echo ($remove_footer_link == 1 ? 'checked' : ''); ?> />

          <div class="mb-explain">
            <div class="mb-link"><?php _e('عند تحديده، ستتم إزالة الرابط الخلفي للتذييل من التذييل. يتطلب معرف طلب OsclassPoint صالحًا.', 'starter'); ?></div>
            <div class="mb-link"><?php _e('يسمح ترخيص البرنامج الإضافي هذا بإزالة الارتباط فقط في حالة شراء "خدمة إزالة الارتباط" له.', 'starter'); ?></div>
            <div class="mb-link"><?php _e('من خلال تحديد هذا الخيار لإزالة الارتباط، فإنك تؤكد أنك قمت بشراء خدمة إزالة الترخيص وأن طلبك المحفوظ يتضمن هذه الخدمة.', 'starter'); ?></div>
          </div>
        </div>
        
        
        <hr/>
        
        
        <div class="mb-row">
          <label for="publish_category" class="h21"><span><?php _e('اختيار الفئة عند النشر', 'starter'); ?></span></label> 
          <select name="publish_category" id="publish_category">
            <option value="1" <?php echo (osc_get_preference('publish_category', 'starter_theme') == "1" ? 'selected="selected"' : ''); ?>><?php _e('اختيار مسطح (أيقونات)', 'starter'); ?></option>
            <option value="2" <?php echo (osc_get_preference('publish_category', 'starter_theme') == "2" ? 'selected="selected"' : ''); ?>><?php _e('القوائم المنسدلة المتتالية', 'starter'); ?></option>
            <option value="3" <?php echo (osc_get_preference('publish_category', 'starter_theme') == "3" ? 'selected="selected"' : ''); ?>><?php _e('مربع اختيار واحد', 'starter'); ?></option>
          </select>

          <div class="mb-explain"><?php _e('حدد نوع اختيار الفئة الذي سيكون على صفحة النشر.', 'starter'); ?></div>
        </div>
       
        <div class="mb-row">
          <label for="search_cookies" class="h4"><span><?php _e('حفظ معلمات البحث', 'starter'); ?></span></label> 
          <input name="search_cookies" id="search_cookies" class="element-slide" type="checkbox" <?php echo (osc_get_preference('search_cookies', 'starter_theme') == 1 ? 'checked' : ''); ?> />

          <div class="mb-explain"><?php _e('تمكين تخزين معلمات البحث في ملفات تعريف الارتباط.', 'starter'); ?></div>
        </div>
        
        <div class="mb-row">
          <label for="def_view" class="h5"><span><?php _e('العرض الافتراضي في صفحة البحث', 'starter'); ?></span></label> 
          <select name="def_view" id="def_view">
            <option value="0" <?php echo (osc_get_preference('def_view', 'starter_theme') == 0 ? 'selected="selected"' : ''); ?>><?php _e('عرض المعرض', 'starter'); ?></option>
            <option value="1" <?php echo (osc_get_preference('def_view', 'starter_theme') == 1 ? 'selected="selected"' : ''); ?>><?php _e('عرض القائمة', 'starter'); ?></option>
          </select>
        </div>


        <div class="mb-row">
          <label for="premium_home" class="h22"><span><?php _e('إظهار كتلة الأقساط في المنزل', 'starter'); ?></span></label> 
          <input name="premium_home" id="premium_home" class="element-slide" type="checkbox" <?php echo (osc_get_preference('premium_home', 'starter_theme') == 1 ? 'checked' : ''); ?> />

          <div class="mb-explain"><?php _e('إظهار كتلة القوائم المميزة على الصفحة الرئيسية.', 'starter'); ?></div>
        </div>

        <div class="mb-row">
          <label for="premium_home_count" class="h23"><span><?php _e('عدد الأقساط على المنزل', 'starter'); ?></span></label> 
          <input size="8" name="premium_home_count" id="premium_home_count" type="number" value="<?php echo osc_esc_html( osc_get_preference('premium_home_count', 'starter_theme') ); ?>" />

          <div class="mb-explain"><?php _e('كم عدد القوائم المميزة التي سيتم عرضها على الصفحة الرئيسية.', 'starter'); ?></div>
        </div>

        <div class="mb-row">
          <label for="premium_search_list" class="h22"><span><?php _e('عرض حظر الأقساط على قائمة البحث', 'starter'); ?></span></label> 
          <input name="premium_search_list" id="premium_search_list" class="element-slide" type="checkbox" <?php echo (osc_get_preference('premium_search_list', 'starter_theme') == 1 ? 'checked' : ''); ?> />

          <div class="mb-explain"><?php _e('إظهار كتلة القوائم المميزة في صفحة البحث - عرض القائمة.', 'starter'); ?></div>
        </div>

        <div class="mb-row">
          <label for="premium_search_list_count" class="h23"><span><?php _e('عدد الأقساط في البحث - القائمة', 'starter'); ?></span></label> 
          <input size="8" name="premium_search_list_count" id="premium_search_list_count" type="number" value="<?php echo osc_esc_html( osc_get_preference('premium_search_list_count', 'starter_theme') ); ?>" />

          <div class="mb-explain"><?php _e('كم عدد القوائم المميزة التي سيتم عرضها في صفحة البحث - نوع القائمة.', 'starter'); ?></div>
        </div>

        <div class="mb-row">
          <label for="premium_search_gallery" class="h22"><span><?php _e('عرض حظر الأقساط على البحث - المعرض', 'starter'); ?></span></label> 
          <input name="premium_search_gallery" id="premium_search_gallery" class="element-slide" type="checkbox" <?php echo (osc_get_preference('premium_search_gallery', 'starter_theme') == 1 ? 'checked' : ''); ?> />

          <div class="mb-explain"><?php _e('إظهار كتلة القوائم المميزة في صفحة البحث - عرض المعرض.', 'starter'); ?></div>
        </div>

        <div class="mb-row">
          <label for="premium_search_gallery_count" class="h23"><span><?php _e('عدد الأقساط في البحث - المعرض', 'starter'); ?></span></label> 
          <input size="8" name="premium_search_gallery_count" id="premium_search_gallery_count" type="number" value="<?php echo osc_esc_html( osc_get_preference('premium_search_gallery_count', 'starter_theme') ); ?>" />

          <div class="mb-explain"><?php _e('كم عدد القوائم المميزة التي سيتم عرضها على صفحة البحث - عرض المعرض.', 'starter'); ?></div>
        </div>

        
        <div class="mb-row">
          <label for="default_logo" class="h7"><span><?php _e('استخدم الشعار الافتراضي', 'starter'); ?></span></label> 
          <input name="default_logo" id="default_logo" class="element-slide" type="checkbox" <?php echo (osc_get_preference('default_logo', 'starter_theme') == 1 ? 'checked' : ''); ?> />

          <div class="mb-explain"><?php _e('إذا لم تقم برفع شعار بعد، سيتم استخدام الشعار الافتراضي.', 'starter'); ?></div>
        </div>
        
       
        <div class="mb-row">
          <label for="cat_icons" class="h9"><span><?php _e('نوع أيقونات الفئة', 'starter'); ?></span></label> 
          <input name="cat_icons" id="cat_icons" class="element-slide" type="checkbox" <?php echo (osc_get_preference('cat_icons', 'starter_theme') == 1 ? 'checked' : ''); ?> />

          <div class="mb-explain"><?php _e('فعّل هذا الخيار إذا أردت استخدام أيقونات الفئات بدل الصور الصغيرة.', 'starter'); ?></div>
        </div>
        
        <div class="mb-row">
          <label for="item_images" class="h25"><span><?php _e('عدد الصور المعروضة مرة واحدة', 'starter'); ?></span></label> 
          <input size="40" name="item_images" id="item_images" type="number" value="<?php echo osc_esc_html( osc_get_preference('item_images', 'starter_theme') ); ?>" />

          <div class="mb-explain"><?php _e('كم عدد الصور التي سيتم عرضها في نفس الوقت بجوار بعضها البعض في صفحة العنصر.', 'starter'); ?></div>
        </div>


        <div class="mb-row">
          <label for="format_cur" class="h13"><span><?php _e('منزلق السعر - موقف العملة', 'starter'); ?></span></label> 
          <select name="format_cur" id="format_cur">
            <option value="0" <?php echo (osc_get_preference('format_cur', 'starter_theme') == 0 ? 'selected="selected"' : ''); ?>><?php _e('قبل السعر', 'starter'); ?></option>
            <option value="1" <?php echo (osc_get_preference('format_cur', 'starter_theme') == 1 ? 'selected="selected"' : ''); ?>><?php _e('بعد السعر', 'starter'); ?></option>
            <option value="2" <?php echo (osc_get_preference('format_cur', 'starter_theme') == 2 ? 'selected="selected"' : ''); ?>><?php _e('لا تظهر', 'starter'); ?></option>
          </select>
        </div>

        <div class="mb-row">
          <label for="format_sep" class="h14"><span><?php _e('شريط تمرير السعر - فاصل الآلاف', 'starter'); ?></span></label> 
          <select name="format_sep" id="format_sep">
            <option value="" <?php echo (osc_get_preference('format_sep', 'starter_theme') == '' ? 'selected="selected"' : ''); ?>><?php _e('لا أحد', 'starter'); ?></option>
            <option value="." <?php echo (osc_get_preference('format_sep', 'starter_theme') == '.' ? 'selected="selected"' : ''); ?>>.</option>
            <option value="," <?php echo (osc_get_preference('format_sep', 'starter_theme') == ',' ? 'selected="selected"' : ''); ?>>,</option>
            <option value=" " <?php echo (osc_get_preference('format_sep', 'starter_theme') == ' ' ? 'selected="selected"' : ''); ?>><?php _e('(فارغ)', 'starter'); ?></option>
          </select>
        </div>


        <div class="mb-row">
          <label for="latest_random" class="h16"><span><?php _e('عرض أحدث العناصر بترتيب عشوائي', 'starter'); ?></span></label> 
          <input name="latest_random" id="latest_random" class="element-slide" type="checkbox" <?php echo (osc_get_preference('latest_random', 'starter_theme') == 1 ? 'checked' : ''); ?> />
        </div>

        <div class="mb-row">
          <label for="latest_picture" class="h17"><span><?php _e('أحدث العناصر الصورة فقط', 'starter'); ?></span></label> 
          <input name="latest_picture" id="latest_picture" class="element-slide" type="checkbox" <?php echo (osc_get_preference('latest_picture', 'starter_theme') == 1 ? 'checked' : ''); ?> />
        </div>

        <div class="mb-row">
          <label for="latest_premium" class="h18"><span><?php _e('أحدث العناصر المميزة', 'starter'); ?></span></label> 
          <input name="latest_premium" id="latest_premium" class="element-slide" type="checkbox" <?php echo (osc_get_preference('latest_premium', 'starter_theme') == 1 ? 'checked' : ''); ?> />
        </div>

        <div class="mb-row">
          <label for="latest_category" class="h19"><span><?php _e('فئة لأحدث العناصر', 'starter'); ?></span></label> 
          <select name="latest_category" id="latest_category">
            <option value="" <?php echo (osc_get_preference('latest_category', 'starter_theme') == '' ? 'selected="selected"' : ''); ?>><?php _e('جميع الفئات', 'starter'); ?></option>

            <?php while(osc_has_categories()) { ?>
              <option value="<?php echo osc_category_id(); ?>" <?php echo (osc_get_preference('latest_category', 'starter_theme') == osc_category_id() ? 'selected="selected"' : ''); ?>><?php echo osc_category_name(); ?></option>
            <?php } ?>
          </select>
        </div>


        <div class="mb-row">
          <label for="search_ajax" class="h30"><span><?php _e('البحث المباشر باستخدام اياكس', 'starter'); ?></span></label> 
          <input name="search_ajax" id="search_ajax" class="element-slide" type="checkbox" <?php echo (osc_get_preference('search_ajax', 'starter_theme') == 1 ? 'checked' : ''); ?> />

          <div class="mb-explain"><?php _e('تمكين البحث المباشر في الوقت الفعلي دون إعادة تحميل صفحة البحث.', 'starter'); ?></div>
        </div>

        <div class="mb-row">
          <label for="forms_ajax" class="h31"><span><?php _e('إرسال النموذج دون إعادة تحميل الصفحة (أجاكس)', 'starter'); ?></span></label> 
          <input name="forms_ajax" id="forms_ajax" class="element-slide" type="checkbox" <?php echo (osc_get_preference('forms_ajax', 'starter_theme') == 1 ? 'checked' : ''); ?> />

          <div class="mb-explain"><?php _e('اتصل بالبائع، أضف تعليقًا جديدًا وسيتم إرسال النماذج إلى الأصدقاء دون إعادة تحميل الصفحة.', 'starter'); ?></div>
        </div>

        <div class="mb-row">
          <label for="post_required" class="h32"><span><?php _e('الحقول المطلوبة عند النشر', 'starter'); ?></span></label> 
          <input size="40" name="post_required" id="post_required" type="text" value="<?php echo osc_esc_html( osc_get_preference('post_required', 'starter_theme') ); ?>" placeholder="<?php echo osc_esc_html(__('أدخل الحقول المطلوبة مفصولة بفاصلة', 'starter')); ?>" />

          <div class="mb-explain"><?php _e('الحقول المسموح بها: الموقع، البلد، المنطقة، المدينة، الاسم، الهاتف. مثال: أدخل في الإدخال: الموقع، الاسم - للحصول على الموقع واسم المستخدم المطلوب', 'starter'); ?></div>
        </div>

        <div class="mb-row">
          <label for="post_extra_exclude" class="h33"><span><?php _e('الحقول الإضافية تستبعد الفئات', 'starter'); ?></span></label> 
          <input size="40" name="post_extra_exclude" id="post_extra_exclude" type="text" value="<?php echo osc_esc_html( osc_get_preference('post_extra_exclude', 'starter_theme') ); ?>" placeholder="<?php echo osc_esc_html(__('أدخل معرفات الفئة مفصولة بفاصلة', 'starter')); ?>" />
  
          <div class="mb-explain"><?php _e('أدخل معرف الفئات التي لا تريد إظهار المعاملة والحالة والحالة عليها في صفحة نشر/تحرير العنصر', 'starter'); ?></div>
        </div>

      </div>

      <div class="mb-foot">
        <button type="submit" class="mb-button"><?php _e('يحفظ', 'starter');?></button>
      </div>
    </form>
  </div>



  <!-- BANNERS -->
  <div class="mb-box">
    <div class="mb-head"><i class="fa fa-clone"></i> <?php _e('إعدادات الشعار', 'starter'); ?></div>

    <form action="<?php echo osc_admin_render_theme_url('oc-content/themes/' . osc_current_web_theme() . '/admin/settings.php'); ?>" method="post">
      <input type="hidden" name="starter_banner" value="done" />

      <div class="mb-inside">
        <div class="mb-row">
          <label for="theme_adsense" class="h28"><span><?php _e('تفعيل لافتات جوجل أدسنس', 'starter'); ?></span></label> 
          <input name="theme_adsense" id="theme_adsense" class="element-slide" type="checkbox" <?php echo (osc_get_preference('theme_adsense', 'starter_theme') == 1 ? 'checked' : ''); ?> />

          <div class="mb-explain"><?php _e('عند التمكين، سيتم عرض الشعارات أدناه في الصفحة الأولى.', 'starter'); ?></div>
        </div>
        
        <?php foreach(starter_banner_list() as $b) { ?>
          <div class="mb-row">
            <label for="<?php echo $b['id']; ?>" class="h29"><span><?php echo ucwords(str_replace('_', ' ', $b['id'])); ?></span></label> 
            <textarea class="mb-textarea mb-textarea-large" name="<?php echo $b['id']; ?>" placeholder="<?php echo osc_esc_html(__('سوف تظهر', 'starter')); ?>: <?php echo $b['position']; ?>"><?php echo stripslashes( osc_get_preference($b['id'], 'starter_theme') ); ?></textarea>
          </div>
        <?php } ?>
      </div>

      <div class="mb-foot">
        <button type="submit" class="mb-button"><?php _e('يحفظ', 'starter');?></button>
      </div>
    </form>
  </div>



  <!-- CATEGORY ICONS -->
  <div class="mb-box">
    <div class="mb-head"><i class="fa fa-photo"></i> <?php _e('إعدادات أيقونات الفئة', 'starter'); ?></div>

    <form name="promo_form" id="load_image" action="<?php echo osc_admin_render_theme_url('oc-content/themes/' . osc_current_web_theme() . '/admin/settings.php'); ?>" method="POST" enctype="multipart/form-data" >
      <input type="hidden" name="starter_images" value="done" />

      <div class="mb-inside">
        <div class="mb-table">
          <div class="mb-table-head">
            <div class="mb-col-1_2 id"><?php _e('بطاقة تعريف', 'starter'); ?></div>
            <div class="mb-col-2_1_2 mb-align-left name"><?php _e('اسم', 'starter'); ?></div>
            <div class="mb-col-1_1_2 icon"><?php _e('لديه صورة صغيرة', 'starter'); ?></div>
            <div class="mb-col-1_1_2"><?php _e('صورة صغيرة (50 × 30 بكسل - png)', 'starter'); ?></div>
            <div class="mb-col-1_1_2 icon"><?php _e('لديه صورة كبيرة', 'starter'); ?></div>
            <div class="mb-col-1_1_2"><?php _e('صورة كبيرة (150 × 250 بكسل - jpg)', 'starter'); ?></div>
            <div class="mb-col-1_1_2 mb-align-left fa-icon"><a href="//fortawesome.github.io/Font-Awesome/icons/" target="_blank"><?php _e('أيقونة الخط رائع', 'starter'); ?></a></div>
            <div class="mb-col-1_1_2 mb-align-left color"><?php _e('لون', 'starter'); ?></div>
          </div>

          <?php starter_has_subcategories_special(Category::newInstance()->toTree(),  0); ?> 
        </div>
      </div>

      <div class="mb-foot">
        <button type="submit" class="mb-button"><?php _e('يحفظ', 'starter');?></button>
      </div>
    </form>
  </div>



  <!-- HELP TOPICS -->
  <div class="mb-box" id="mb-help">
    <div class="mb-head"><i class="fa fa-question-circle"></i> <?php _e('يساعد', 'starter'); ?></div>

    <div class="mb-inside">
      <div class="mb-row mb-help"><span class="sup">(1)</span> <div class="h1"><?php _e('اتركه فارغًا لتعطيل رقم الاتصال. سيتم عرض هذا الرقم في رأس الموضوع.', 'starter'); ?></div></div>
      <div class="mb-row mb-help"><span class="sup">(2)</span> <div class="h2"><?php _e('يمكن استخدام اسم موقع الويب في قائمة المستخدم وتذييل موقع الويب.', 'starter'); ?></div></div>
      <div class="mb-row mb-help"><span class="sup">(3)</span> <div class="h3"><?php _e('اختر العملة التي تريد إظهارها في قائمة البحث في الفئة/صفحة البحث.', 'starter'); ?></div></div>
      <div class="mb-row mb-help"><span class="sup">(4)</span> <div class="h4"><?php _e('عند التمكين، يتم تخزين معلمات البحث في ملفات تعريف الارتباط للمتصفح، لذلك عندما يعود المستخدم إلى صفحة البحث، تتم استعادة المعلمات المستخدمة مؤخرًا. يتم تخزين المعلمات التالية: عرض الفئة، البلد، المنطقة، المدينة، المعرض/القائمة.', 'starter'); ?></div></div>
      <div class="mb-row mb-help"><span class="sup">(5)</span> <div class="h5"><?php _e('حدد نوع العرض الافتراضي للمستخدمين. يمكن أن تظهر القوائم في الشبكة أو كقائمة. يمكن للمستخدم تغيير العرض إلى العرض المفضل. لاحظ أن هذا الإعداد صالح لصفحة البحث فقط.', 'starter'); ?></div></div>
      <div class="mb-row mb-help"><span class="sup">(6)</span> <div class="h6"><?php _e('أرغب بدعم مطوري القالب عبر وضع رابط <a href="https://osclasspoint.com" target="_blank">OsclassPoint.com</a> في موقعي', 'starter'); ?></div></div>
      <div class="mb-row mb-help"><span class="sup">(7)</span> <div class="h7"><?php _e('إظهار الشعار الافتراضي في حالة عدم تحميله مسبقًا.', 'starter'); ?></div></div>
      <div class="mb-row mb-help"><span class="sup">(9)</span> <div class="h9"><?php _e('استخدم أيقونات الفئات بدل الصور الصغيرة في الصفحة الرئيسية', 'starter'); ?></div></div>
      <div class="mb-row mb-help"><span class="sup">(10)</span> <div class="h10"><?php _e('البريد الإلكتروني الذي سيظهر في التذييل', 'starter'); ?></div></div>
      <div class="mb-row mb-help"><span class="sup">(12)</span> <div class="h12"><?php _e('إظهار الصور المصغرة للصور في صفحة القائمة ضمن عرض شرائح الصور (جهاز النداء).', 'starter'); ?></div></div>
      <div class="mb-row mb-help"><span class="sup">(13)</span> <div class="h13"><?php _e('اختر موضع رمز العملة في شريط تمرير الأسعار في صفحة البحث.', 'starter'); ?></div></div>
      <div class="mb-row mb-help"><span class="sup">(14)</span> <div class="h14"><?php _e('اختر ما إذا كنت تريد استخدام ألف فاصل في شريط تمرير الأسعار على صفحة البحث.', 'starter'); ?></div></div>
      <div class="mb-row mb-help"><span class="sup">(16)</span> <div class="h16"><?php _e('تحقق مما إذا كنت تريد عرض أحدث العناصر على الصفحة الرئيسية بترتيب عشوائي. في كل مرة تقوم فيها بتحديث صفحتك الرئيسية، سيتم تبديل القوائم بترتيب عشوائي.', 'starter'); ?></div></div>
      <div class="mb-row mb-help"><span class="sup">(17)</span> <div class="h17"><?php _e('تحقق مما إذا كنت تريد أن تظهر في قسم أحدث العناصر في قوائم الصفحة الرئيسية فقط مع الصورة.', 'starter'); ?></div></div>
      <div class="mb-row mb-help"><span class="sup">(18)</span> <div class="h18"><?php _e('تحقق مما إذا كنت تريد أن تظهر في قسم أحدث العناصر في الصفحة الرئيسية للقوائم المميزة فقط. عند التمكين، يساعد ذلك في الترويج للقوائم المميزة على موقعك والحصول على قيمة أكبر لها.', 'starter'); ?></div></div>
      <div class="mb-row mb-help"><span class="sup">(19)</span> <div class="h19"><?php _e('اختر الفئة التي سيتم من خلالها اختيار أحدث العناصر الموجودة على الصفحة الرئيسية. يمكنك اختيار جميع الفئات إذا كنت تريد إظهار جميع القوائم بغض النظر عن الفئة التي تنتمي إليها.', 'starter'); ?></div></div>
      <div class="mb-row mb-help"><span class="sup">(19)</span> <div class="h19"><?php _e('اكتب وصفًا لإعلاناتك المبوبة التي سيتم عرضها في التذييل.', 'starter'); ?></div></div>
      <div class="mb-row mb-help"><span class="sup">(20)</span> <div class="h20"><?php _e('على الأجهزة المحمولة، لا يظهر الشعار. بدلا من ذلك يتم عرض نص الشعار، يمكنك تعيينه كاسم لموقعك أو أي شيء آخر. الحد الأقصى للطول هو 12 حرفًا.', 'starter'); ?></div></div>
      <div class="mb-row mb-help"><span class="sup">(21)</span> <div class="h21"><?php _e('يوصى باستخدام نوع تحديد الفئة المسطحة الافتراضي للحصول على أفضل تجربة للمستخدم.', 'starter'); ?></div></div>
      <div class="mb-row mb-help"><span class="sup">(22)</span> <div class="h22"><?php _e('تمكين حظر القوائم المميزة في الصفحة الرئيسية/صفحة البحث (عرض القائمة/المعرض). بالنسبة لصفحة البحث، يوصى بإظهار هذه المجموعة فقط في حالة وجود أكثر من 1000 قائمة. وإلا فقد يبدو أن القوائم المميزة مكررة. إذا لم تكن هناك أقساط، فسيتم إخفاء هذه الكتلة.', 'starter'); ?></div></div>
      <div class="mb-row mb-help"><span class="sup">(23)</span> <div class="h23"><?php _e('أدخل عدد الإعلانات المميزة التي ستظهر في قسم الإعلانات المميزة.', 'starter'); ?></div></div>
      <div class="mb-row mb-help"><span class="sup">(24)</span> <div class="h24"><?php _e('إظهار أو إخفاء قالب البحث الكبير "الترحيبي" على الصفحة الرئيسية..', 'starter'); ?></div></div>
      <div class="mb-row mb-help"><span class="sup">(25)</span> <div class="h25"><?php _e('قم بتعيين عدد الصور التي سيتم عرضها بجوار بعضها البعض في صفحة العنصر. لاحظ أنه على الأجهزة المحمولة والأجهزة اللوحية سيتم عرض صورة واحدة فقط بغض النظر عن هذا الإعداد. لاحظ أنه إذا كانت القائمة تحتوي على كمية أقل من الصور المدخلة، فسيتم استخدام هذا الرقم.', 'starter'); ?></div></div>
      <div class="mb-row mb-help"><span class="sup">(26)</span> <div class="h26"><?php _e('عند التمرير لأعلى ولأسفل، سيكون الشريط الجانبي في موضع ثابت - ويكون مرئيًا في كل موقف.', 'starter'); ?></div></div>
      <div class="mb-row mb-help"><span class="sup">(27)</span> <div class="h27"><?php _e('تفعيل البحث الفوري (أجاكس) للعناصر المطابقة للكلمة المفتاحية. متاح في الصفحة الرئيسية فقط ويبحث في العنوان والوصف باللغة الحالية.', 'starter'); ?></div></div>
      <div class="mb-row mb-help"><span class="sup">(28)</span> <div class="h28"><?php _e('فعّل هذا الخيار إذا أردت عرض إعلانات Google AdSense في موقعك. يمكنك إدخال كود الإعلان في الحقول أدناه.', 'starter'); ?></div></div>
      <div class="mb-row mb-help"><span class="sup">(29)</span> <div class="h29"><?php _e('سيتم عرضها في الموضع المحدد. استخدم لافتات سريعة الاستجابة.', 'starter'); ?></div></div>
      <div class="mb-row mb-help"><span class="sup">(30)</span> <div class="h30"><?php _e('تفعيل البحث الفوري (أجاكس) للعناصر المطابقة للكلمة المفتاحية. متاح في الصفحة الرئيسية فقط ويبحث في العنوان والوصف باللغة الحالية.', 'starter'); ?></div></div>
      <div class="mb-row mb-help"><span class="sup">(31)</span> <div class="h31"><?php _e('عند التفعيل، سيتم إرسال نموذج التواصل مع البائع ونموذج التعليق الجديد ونموذج الإرسال إلى صديق دون إعادة تحميل الصفحة باستخدام أجاكس.', 'starter'); ?></div></div>
      <div class="mb-row mb-help"><span class="sup">(32)</span> <div class="h32"><?php _e('أدخل الحقول التي يجب أن تكون مطلوبة عند نشر/تحرير العنصر. لاحظ أن هذه حقول إضافية، ولا يمكن تغيير الأصل (العنوان، الفئة، البريد الإلكتروني، ...). أدخلها مفصولة بفاصلة. القيم المحتملة: الموقع - مطلوب إدخال موقع العنصر؛ الاسم - اسم البائع مطلوب؛ الهاتف - مطلوب من البائع إدخال رقم الهاتف؛', 'starter'); ?></div></div>
      <div class="mb-row mb-help"><span class="sup">(33)</span> <div class="h33"><?php _e('أدخل معرف الفئات التي تريد تعطيلها باستخدام حقول المعاملة والحالة والحالة. لاحظ أنك بحاجة إلى إدخال معرفات كل فئة. إذا قمت بإدخال معرف للفئة الرئيسية فقط، فستظل هذه الحقول مرئية في الفئات الفرعية. قم بإدراج كافة الفئات والفئات الفرعية حيث يجب أن تكون مخفية. افصل بفاصلة، على سبيل المثال: 1،2،5،7', 'starter'); ?></div></div>

      <div class="mb-row mb-help"><div><?php _e('لتغيير الرمز المفضل، قم بإزالة الرمز الخاص بك وتحميله إلى المجلد oc-content/themes/starter/images/favicons/. إذا لم يكن لديك حجم محدد للرمز المفضل، فما عليك سوى إزالة الصورة. استمر في تسمية الملفات!', 'starter'); ?></div></div>

    </div>
  </div>
</div>

<?php echo starter_footer(); ?>	